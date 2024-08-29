"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import useFestivalStore, {
  FestivalData,
} from "../../../../../store/festivalStore";
import { useRouter } from "next/navigation";
import useLoginStore from "@/store/loginStore";

const schema = yup.object().shape({
  festivalTitle: yup
    .string()
    .min(3)
    .max(50)
    .required("Festival title is required"),
  startDate: yup.string().required("Start date is required"),
  endDate: yup.string().required("End date is required"),
  description: yup
    .string()
    .required("Description can't be longer than 500 characters"),
  status: yup.boolean().required("Status is required"),
});

interface Props {
  params: {
    festivalId: string;
  };
}

const UpdateFestivalForm = ({ params: { festivalId } }: Props) => {
  const router = useRouter();
  const getFestival = useFestivalStore((state) => state.getFestivalById);
  const festival = useFestivalStore((state) => state.festival);
  const updateFestival = useFestivalStore((state) => state.updateFestival);
  const fetchUser = useLoginStore((state) => state.fetchUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FestivalData>({
    resolver: yupResolver(schema),
  });

  const [change, setChange] = useState("");

  useEffect(() => {
    reset();
  }, [change]);

  useEffect(() => {
    {
      getFestival(+festivalId);
    }
  }, [festivalId]);

  useEffect(() => {
    if (festival) {
      setChange("update");
      setValue("festivalTitle", festival.festivalTitle);
      setValue("startDate", festival.startDate);
      setValue("endDate", festival.endDate);
      setValue("description", festival.description);
      setValue("status", festival.status);
    }
  }, [festival]);

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
      data.append("id", festivalId);

      await updateFestival(data);
      reset();
      router.push("/admin/view-festival");
    } catch (err) {
      console.error("Error updating festival:", err);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex justify-center items-start p-8 pt-20">
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-red-500 mb-6 text-center">
            Update Festival Details
          </h2>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Festival Title
              </label>
              <input
                type="text"
                {...register("festivalTitle")}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                rows={4}
              ></textarea>
              {errors.description && (
                <p className="text-red-500 mt-1">
                  {errors.description.message}
                </p>
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
            <div className="flex justify-center">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                type="submit"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateFestivalForm;
