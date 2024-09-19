"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useEventStore, { EventData } from "../../../../../store/eventStore";
import { XMarkIcon } from "@heroicons/react/16/solid";

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
  endDateTime: yup
    .string()
    .required("End Date and Time are required")
    .test(
      "endDateAfterStartDate",
      "End date and time must be later than start date and time.",
      function (value) {
        const { startDateTime } = this.parent;
        if (!startDateTime || !value) return true; // Skip validation if either date is missing
        return new Date(startDateTime) < new Date(value);
      }
    ),
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
  };
}
const AddEvent = ({ params: { festivalId } }: Props) => {
  // const { user } = useUser();
  const router = useRouter();
  const addEvent = useEventStore((state) => state.addEvent);
  // const fetchUser = useLoginStore((state) => state.fetchUser);
  const uploadImageToCloudinary = useEventStore(
    (state) => state.uploadImageToCloudinary
  );
  const [change, setChange] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    reset();
  }, [change]);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const onSubmitHandler: SubmitHandler<EventData> = async (formData) => {
    try {
      if (
        formData.startDateTime &&
        formData.endDateTime &&
        new Date(formData.startDateTime) > new Date(formData.endDateTime)
      ) {
        setError("End date and time must be later than start date and time.");
      }

      const imageFiles = formData.imageUrl as unknown as FileList;
      if (imageFiles && imageFiles[0] instanceof File) {
        const file = imageFiles[0];
        const imageUrl = await uploadImageToCloudinary(file);
        formData.imageUrl = imageUrl;
      }
      formData.festivalId = +festivalId;
      addEvent({ ...formData });
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
    <div className="main-div">
      <div className="input-form-div">
        <button
          onClick={() => router.push("/admin/festivals/view-festival")}
          className="xmark-icon"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
        <h2 className="form-heading">Event Form</h2>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="mb-4">
            <label>
              Event Type
            </label>
            <select
              {...register("eventType")}
            >
              <option value="">Select Event Type</option>
              {eventTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.eventType && (
              <p className="text-red-500 mt-1">{errors.eventType.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label>
              Event Name
            </label>
            <input
              type="text"
              {...register("eventName")}
              placeholder="Enter Event Name"
            />
            {errors.eventName && (
              <p className="text-red-500 mt-1">{errors.eventName.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label>
              Members Type
            </label>
            <select
              {...register("members")}
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
            <label>
              Venue
            </label>
            <input
              type="text"
              {...register("venue")}
              placeholder="Enter Venue"
            />
            {errors.venue && (
              <p className="text-red-500 mt-1">{errors.venue.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label>
              Start Date
            </label>
            <input
              type="datetime-local"
              {...register("startDateTime")}
            />
            {errors.startDateTime && (
              <p className="text-red-500 mt-1">
                {errors.startDateTime.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label>
              End Date
            </label>
            <input
              type="datetime-local"
              {...register("endDateTime")}
            />
            {errors.endDateTime && (
              <p className="text-red-500 mt-1">{errors.endDateTime.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label>
              Image
            </label>
            <input
              type="file"
              {...register("imageUrl")}
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
  );
};

export default AddEvent;
