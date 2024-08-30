"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import useEventStore, { EventData } from "../../../../../store/eventStore";
import Image from "next/image";
import AdminSummerImage from "../../../../../public/JpgAdminSummerImage.jpg";
import SecondImage from "../../../../../public/AdminMusicNightImage.jpg";
import useLoginStore from "@/store/loginStore";
import useFestivalStore from "@/store/festivalStore";

const eventTypes = [
  "Cultural",
  "Sports",
  "Talent Show",
  "Art",
  "Food Festival",
  "Talent Hunt",
];

const membersTypes = ["single", "group", "single/group"];

const schema = yup.object().shape({
  eventType: yup.string().required("Event Type is required"),
  eventName: yup.string().required("Event Name is required"),
  members: yup.string().required("Members Type is required"),
  venue: yup.string().required("Venue is required"),
  startDateTime: yup.string().required("Start Date and Time are required"),
  endDateTime: yup.string().required("End Date and Time are required"),
  festivalId: yup.number().required("Festival Id is required"),
  status: yup.string().required("Select"),
});
interface Props {
  params: {
    eventId: string;
  };
}
const AddEvent = ({ params: { eventId } }: Props) => {
  const router = useRouter();
  const addEvent = useEventStore((state) => state.addEvent);
  const getEventById = useEventStore((state) => state.getEventById);
  const updateEvent = useEventStore((state) => state.updateEvent);
  const event = useEventStore((state) => state.event);
  const user = useLoginStore((state) => state.user);
  const fetchUser = useLoginStore((state) => state.fetchUser);
  const festival = useFestivalStore((state) => state.festival);
  const getByCollege = useFestivalStore((state) => state.getByCollege);

  const [change, setChange] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues, // To get form values manually
  } = useForm<EventData>({ resolver: yupResolver(schema) });

  useEffect(() => {
    reset();
  }, [change]);
  useEffect(() => {
    if (eventId && eventId !== "new") {
      getEventById(eventId);
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
      setValue("status", event.status ? "true" : "false");
    }
  }, [eventId, getEventById, reset, setValue, event]);

  useEffect(() => {
    fetchUser();
  }, []);
  useEffect(() => {
    if (user) {
      const collegeId = user?.college?.id ?? 0;
      getByCollege(collegeId);
    } else {
    }
  }, [user]);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = getValues();
    const festivalId = festival?.id;
    if (festivalId) {
      formData.festivalId = festivalId;
    }
    try {
      if (eventId && eventId !== "new") {
        updateEvent({ id: +eventId, ...formData });
      } else {
        console.log("in else", eventId);
        addEvent(formData);
      }
      setSuccess("Event added successfully!");
      setError("");
      reset();
      router.push("/admin/events/view-event");
    } catch (err) {
      setError("Failed to add event");
      setSuccess("");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex justify-center items-start p-8 pt-20">
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8 flex">
          <div className="w-2/3">
            <h2 className="text-2xl font-semibold text-red-500 mb-6">
              Event Form
            </h2>
            <form onSubmit={onSubmitHandler}>
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
                <span className="block text-gray-700 text-sm font-bold mb-2">
                  Status
                </span>
                <div className="mt-1">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      {...register("status")}
                      value="true"
                      className="form-radio text-indigo-600"
                      id="liked"
                    />
                    <span className="ml-2">Open</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input
                      type="radio"
                      {...register("status")}
                      value="false"
                      className="form-radio text-indigo-600"
                      id="notLiked"
                    />
                    <span className="ml-2">Close</span>
                  </label>
                  <p>{errors.status?.message}</p>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                >
                  Submit
                </button>
                <button
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="reset"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
          <div className="w-1/3 ml-4">
            <Image
              src={AdminSummerImage}
              className="w-full h-auto object-cover"
              alt="Event Image"
            />
            <Image
              src={SecondImage}
              className="w-full h-auto object-cover mt-4"
              alt="Second Event Image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;
