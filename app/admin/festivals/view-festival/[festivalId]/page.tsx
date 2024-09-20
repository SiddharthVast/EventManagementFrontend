"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import useFestivalStore, { FestivalData } from "../../../../../store/festivalStore";
import { useRouter } from "next/navigation";
import useLoginStore from "@/store/loginStore";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Loading from "@/app/loading";
import { useUser } from "@/app/context/UserContext";
// import Loading from "@/app/loading";

const schema = yup.object().shape({
  festivalTitle: yup.string().min(3).max(50).required("Festival title is required"),
  startDate: yup.string().required("Start date is required"),
  endDate: yup.string().required("End date is required"),
  description: yup.string().required("Description can't be longer than 500 characters"),
});

interface Props {
  params: {
    festivalId: string;
  };
}

const UpdateFestivalForm = ({ params: { festivalId } }: Props) => {
  const { user } = useLoginStore((state) => ({
    user: state.user,
  }));
  const router = useRouter();
  const getFestival = useFestivalStore((state) => state.getFestivalById);
  const festival = useFestivalStore((state) => state.festival);
  const updateFestival = useFestivalStore((state) => state.updateFestival);
  // const { user } = useUser();

  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<FestivalData>({
    resolver: yupResolver(schema),
  });

  const [change, setChange] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    reset();
  }, [change]);

  useEffect(() => {
    if (festivalId) {
      const fetchData = async () => {
        await getFestival(+festivalId);
        setLoading(false);
      };
      fetchData();
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
      data.append("id", festivalId);

      await updateFestival(data);
      reset();
      router.push("/admin/festivals/view-festival");
    } catch (err) {
      console.error("Error updating festival:", err);
    }
  };

  return (
    <div className="main-div">
      {loading && <Loading />}
      {!loading && (
        <>
          <div className="input-form-div">
            <button
              onClick={() => router.push("/admin/festivals/view-festival")}
              className="xmark-icon"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
            <h2 className="text-2xl font-semibold text-red-500 mb-6 text-center ">
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
                  <p className="text-red-500 mt-1">
                    {errors.startDate.message}
                  </p>
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
                  <p className="text-red-500 mt-1">
                    {errors.endDate.message}
                  </p>
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
                  <p className="text-red-500 mt-1">
                    {errors.imageUrl.message}
                  </p>
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

              <div className="flex justify-center">
                <button className="update" type="submit">
                  Update
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default UpdateFestivalForm;
