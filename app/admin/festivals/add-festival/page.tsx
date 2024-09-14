"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useFestivalStore, {
  FestivalData,
} from "../../../../store/festivalStore";
import { XMarkIcon } from "@heroicons/react/24/solid"; // Import the cross icon
import useLoginStore from "@/store/loginStore";

const schema = yup.object().shape({
  festivalTitle: yup.string().required("Festival Title is required"),
  startDate: yup.string().required("Start Date is required"),
  endDate: yup.string().required("End Date is required"),
  description: yup.string().required("Description is required"),
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

      if (formData.imageUrl && formData.imageUrl.length > 0) {
        data.append("file", formData.imageUrl[0]);
      }
      data.append("collegeId", user.college.id.toString());

      await addFestival(data as unknown as FestivalData);

      setSuccess("Festival added successfully!");
      setError("");
      reset();
      router.push("/admin");
    } catch (err: unknown) {
      // Type-check the error to ensure it has the properties we expect
      if (err instanceof Error) {
        if (err.message === "Thhis college already has an active festival.") {
          setError(
            "Failed to add festival: Thhis college already has an active festival."
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
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="relative max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <button
          onClick={() => router.push("/admin")}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-semibold text-red-500 mb-6 text-center">
          College Fest Registration
        </h2>
        {/* Error and Success Messages */}
        {error && (
          <div className="mb-4 p-4 bg-red-200 text-red-700 border border-red-400 rounded">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-4 bg-green-200 text-green-700 border border-green-400 rounded">
            {success}
          </div>
        )}
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
