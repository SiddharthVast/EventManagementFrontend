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
import useLoginStore from "@/store/loginStore";

const schema = yup.object().shape({
  festivalTitle: yup.string().required("Festival Title is required"),
  startDate: yup.string().required("Start Date is required"),
  endDate: yup.string().required("End Date is required"),
  description: yup.string().required("Description is required"),
  status: yup.boolean().required("Status is required"),
});

const AddFestival = () => {
  const router = useRouter();
  const addFestival = useFestivalStore((state) => state.addFestival);
  const fetchUser = useLoginStore((state) => state.fetchUser);

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
      await fetchUser();
      const user = useLoginStore.getState().user;
      if (!user || !user.college || user.college.id === 0) {
        throw new Error("User is not logged in or college data is invalid");
      }

      const data = new FormData();
      data.append("festivalTitle", formData.festivalTitle);
      data.append("startDate", formData.startDate);
      data.append("endDate", formData.endDate);
      data.append("description", formData.description);
      data.append("status", formData.status ? "true" : "false");

      if (formData.imageUrl && formData.imageUrl.length > 0) {
        data.append("file", formData.imageUrl[0]);
      }
      data.append("collegeId", user.college.id.toString());

      await addFestival(data as unknown as FestivalData);

      setSuccess("Festival added successfully!");
      setError("");
      reset();
      router.push("/admin");
    } catch (err) {
      console.error("Error adding festival:", err);
      setError("Failed to add festival");
      setSuccess("");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="relative max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <button
          onClick={() => router.push("/admin")}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-semibold text-red-500 mb-6 text-center">
          Festival Registration
        </h2>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Title
            </label>
            <input
              type="text"
              {...register("festivalTitle")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter Festival Title"
            />
            {errors.festivalTitle && (
              <p className="text-red-500 mt-1">
                {errors.festivalTitle.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Start Date
            </label>
            <input
              type="datetime-local"
              {...register("startDate")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.startDate && (
              <p className="text-red-500 mt-1">{errors.startDate.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              End Date
            </label>
            <input
              type="datetime-local"
              {...register("endDate")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.endDate && (
              <p className="text-red-500 mt-1">{errors.endDate.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Image
            </label>
            <input
              type="file"
              {...register("imageUrl")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.imageUrl && (
              <p className="text-red-500 mt-1">{errors.imageUrl.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Status
            </label>
            <div className="flex items-center">
              <label className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  value="true"
                  {...register("status")}
                  className="form-radio"
                />
                <span className="ml-2">Open</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="false"
                  {...register("status")}
                  className="form-radio"
                />
                <span className="ml-2">Closed</span>
              </label>
            </div>
            {errors.status && (
              <p className="text-red-500 mt-1">{errors.status.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Description
            </label>
            <textarea
              {...register("description")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter Description"
              rows={4}
            ></textarea>
            {errors.description && (
              <p className="text-red-500 mt-1">{errors.description.message}</p>
            )}
          </div>
          <div className="flex justify-end space-x-4">
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="reset"
            >
              Reset
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFestival;
