"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useFestivalStore, {
  FestivalData,
} from "../../../../store/festivalStore";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useUser } from "../../../context/UserContext";
import { toast } from "react-toastify";
import useLoginStore from "@/store/loginStore";

const MAX_FILE_SIZE = 1024 * 1024 * 5; // 5MB
const ACCEPTED_IMAGE_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const schema = yup.object().shape({
  festivalTitle: yup.string().required("Festival Title is required"),
  startDate: yup.string().required("Start Date is required"),
  endDate: yup
    .string()
    .required("End Date is required")
    .test(
      "endDateAfterStartDate",
      "End date and time must be later than start date and time.",
      function (value) {
        const { startDate } = this.parent;
        if (!startDate || !value) return true; // Skip validation if either date is missing
        return new Date(startDate) < new Date(value);
      }
    ),
  description: yup.string().required("Description is required"),
  imageUrl: yup
    .mixed<FileList | string>()
    .required()
    .test("fileRequired", "Image file is required", (value) => {
      if (!value || (value instanceof FileList && value.length === 0))
        return false;
      return true;
    })
    .test(
      "fileType",
      "Only .jpg, .jpeg, and .png formats are supported.",
      (value) => {
        if (!value || !(value instanceof FileList)) return false;
        const files = Array.from(value);
        return files.every((file) =>
          ACCEPTED_IMAGE_MIME_TYPES.includes(file.type)
        );
      }
    )
    .test("fileSize", "Max image size is 5MB.", (value) => {
      if (!value || !(value instanceof FileList)) return false;
      const files = Array.from(value);
      return files.every((file) => file.size <= MAX_FILE_SIZE);
    }),
});

const AddFestival = () => {
  const { user } = useLoginStore((state) => ({
    user: state.user,
  }));
  const router = useRouter();
  const addFestival = useFestivalStore((state) => state.addFestival);
  // const { user } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FestivalData>({
    resolver: yupResolver(schema),
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const onSubmitHandler: SubmitHandler<FestivalData> = async (formData) => {
    try {
      if (
        formData.startDate &&
        formData.endDate &&
        new Date(formData.startDate) > new Date(formData.endDate)
      ) {
        setError("End date must be later than start date");
      }

      if (!user || !user.college || user.college.id === 0) {
        throw new Error("User is not logged in or college data is invalid");
      }

      const data = new FormData();
      data.append("festivalTitle", formData.festivalTitle);
      data.append("startDate", formData.startDate);
      data.append("endDate", formData.endDate);
      data.append("description", formData.description);

      if (formData.imageUrl && formData.imageUrl.length > 0) {
        data.append("file", formData.imageUrl[0]);
      }
      data.append("collegeId", user.college.id.toString());

      await addFestival(data as unknown as FestivalData);

      toast.success("Festival added successfully!");
      setError("");
      reset();
      router.push("/admin");
    } catch (err: unknown) {
      // Type-check the error to ensure it has the properties we expect
      if (err instanceof Error) {
        if (err.message === "This college already has an active festival.") {
          setError(
            "Failed to add festival: This college already has an active festival."

          );
        } else {
          setError("Failed to add festival: " + err.message);
        }
      } else {
        setError("Failed to add festival: An unknown error occurred.");
      }
      setSuccess("");
    }
  };

  return (
    <div className="main-div">
      <div className="input-form-div">
        <button onClick={() => router.push("/admin")} className="xmark-icon">
          <XMarkIcon className="w-6 h-6" />
        </button>

        <h2 className="form-heading">College Fest Registration</h2>
        {error && (
          <div className="mb-4 p-4 bg-red-200 text-red-700 border border-red-400 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="mb-4">
            <label>Title</label>
            <input
              type="text"
              {...register("festivalTitle")}
              placeholder="Enter Festival Title"
            />
            {errors.festivalTitle && (
              <p className="text-red-500 mt-1">
                {errors.festivalTitle.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label>Start Date</label>
            <input type="datetime-local" {...register("startDate")} />
            {errors.startDate && (
              <p className="text-red-500 mt-1">{errors.startDate.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label>End Date</label>
            <input type="datetime-local" {...register("endDate")} />
            {errors.endDate && (
              <p className="text-red-500 mt-1">{errors.endDate.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label>Image</label>
            <input type="file" {...register("imageUrl")} />
            {errors.imageUrl && (
              <p className="text-red-500 mt-1">{errors.imageUrl.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label>Description</label>
            <textarea
              {...register("description")}
              placeholder="Enter Description"
              className="w-full p-2 border shadow-lg  border-gray-300 rounded"
              rows={4}
            ></textarea>
            {errors.description && (
              <p className="text-red-500 mt-1">{errors.description.message}</p>
            )}
          </div>
          <div className="flex justify-end space-x-4">
            <button className=" reset" type="reset">
              Reset
            </button>
            <button className=" submit" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFestival;
