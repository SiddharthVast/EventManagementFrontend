"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useEventStore, { EventData } from "../../../../../../store/eventStore";
// import useLoginStore from "@/store/loginStore";
import useFestivalStore from "@/store/festivalStore";
import { XMarkIcon } from "@heroicons/react/24/solid";

const eventTypes = [
  "Cultural",
  "Sports",
  "Talent Show",
  "Art",
  "Food Festival",
  "Talent Hunt",
];

const membersTypes = ["single", "group", "single/group"];

const MAX_FILE_SIZE = 1024 * 1024 * 5; // 5MB
const ACCEPTED_IMAGE_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const schema = yup.object().shape({
  eventType: yup.string().required("Event Type is required"),
  eventName: yup.string().required("Event Name is required"),
  members: yup.string().required("Members Type is required"),
  venue: yup.string().required("Venue is required"),
  startDateTime: yup.string().required("Start Date and Time are required"),
  endDateTime: yup.string().required("End Date and Time are required"),
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
interface Props {
  params: {
    festivalId: string;
    eventId: string;
  };
}
const UpdateEvent = ({ params: { festivalId, eventId } }: Props) => {
  // const { user } = useLoginStore((state) => ({
  //   user: state.user,
  // }));
  const router = useRouter();
  const getEventById = useEventStore((state) => state.getEventById);
  const updateEvent = useEventStore((state) => state.updateEvent);
  const event = useEventStore((state) => state.event);
  // const fetchUser = useLoginStore((state) => state.fetchUser);
  const { getFestivalById } = useFestivalStore();
  const uploadImageToCloudinary = useEventStore(
    (state) => state.uploadImageToCloudinary
  );
  const [change, setChange] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    if (eventId) {
      getEventById(+eventId);
    }
    if (festivalId) {
      getFestivalById(+festivalId);
    }
  }, [eventId, festivalId]);

  useEffect(() => {
    reset();
  }, [change]);

  useEffect(() => {
    if (eventId) {
      getEventById(+eventId);
    } else {
      setChange("reset");
    }
  }, [eventId]);

  useEffect(() => {
    if (eventId && event) {
      setValue("eventType", event.eventType);
      setValue("eventName", event.eventName);
      setValue("members", event.members);
      setValue("venue", event.venue);
      setValue("startDateTime", event.startDateTime);
      setValue("endDateTime", event.endDateTime);
      if (event.imageUrl) {
        setValue("imageUrl", event.imageUrl);
      }
    }
  }, [eventId, getEventById, reset, setValue, event]);

  // useEffect(() => {
  //   fetchUser();
  // }, []);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const onSubmitHandler: SubmitHandler<EventData> = async (formData) => {
    try {
      const imageFiles = formData.imageUrl as unknown as FileList;
      if (imageFiles && imageFiles[0] instanceof File) {
        const file = imageFiles[0];
        const imageUrl = await uploadImageToCloudinary(file);
        formData.imageUrl = imageUrl;
      }
      if (festivalId) {
        formData.festivalId = +festivalId;
      }
      updateEvent({ id: +eventId, ...formData });
      setSuccess("Event added successfully!");
      setError("");
      reset();
      router.push(`/admin/events/view-event/${festivalId}`);
    } catch (err) {
      setError("Failed to add event");
      setSuccess("");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex justify-center items-start p-8 pt-20">
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8 relative">
          <button
            onClick={() =>
              router.push(`/admin/events/view-event/${event.festival.id}`)
            }
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
          <div className="w-full">
            <h2 className="text-2xl font-semibold text-red-500 mb-6">
              Event Form
            </h2>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Event Type
                </label>
                <select
                  {...register("eventType")}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select Event Type</option>
                  {eventTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.eventType && (
                  <p className="text-red-500 mt-1">
                    {errors.eventType.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Event Name
                </label>
                <input
                  type="text"
                  {...register("eventName")}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter Event Name"
                />
                {errors.eventName && (
                  <p className="text-red-500 mt-1">
                    {errors.eventName.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Members Type
                </label>
                <select
                  {...register("members")}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select Members Type</option>
                  {membersTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.members && (
                  <p className="text-red-500 mt-1">{errors.members.message}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Venue
                </label>
                <input
                  type="text"
                  {...register("venue")}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter Venue"
                />
                {errors.venue && (
                  <p className="text-red-500 mt-1">{errors.venue.message}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Start Date
                </label>
                <input
                  type="datetime-local"
                  {...register("startDateTime")}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.startDateTime && (
                  <p className="text-red-500 mt-1">
                    {errors.startDateTime.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  End Date
                </label>
                <input
                  type="datetime-local"
                  {...register("endDateTime")}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.endDateTime && (
                  <p className="text-red-500 mt-1">
                    {errors.endDateTime.message}
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
                  <p className="text-red-500 mt-1">{errors.imageUrl.message}</p>
                )}
              </div>

              <div className="flex justify-end space-x-4">
                <button className="reset" type="button" onClick={() => reset()}>
                  Reset
                </button>
                <button className="submit" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateEvent;
