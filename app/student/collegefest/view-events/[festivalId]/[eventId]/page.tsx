"use client";
import { useEffect, useState } from "react";
import React from 'react';
import Image from "next/image";
import useEventStore from "../../../../../../store/eventStore";
import useUserEventRegistartionStore from "../../../../../../store/user_event_registrationStore";
import useLoginStore from "@/store/loginStore";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import Loading from "@/app/loading";

interface Props {
  params: {
    festivalId: string;
    eventId: string;
  };
}

const EventInfo = ({ params: { festivalId, eventId } }: Props) => {
  const { event, getEventById } = useEventStore();
  const { addRegistration, checkRegistrationStatus } =
    useUserEventRegistartionStore();
  const { user } = useLoginStore();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for submission
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [topic, setTopic] = useState("NA");
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    if (eventId) {
      getEventById(parseInt(eventId));
      setLoading(false);
    }

    if (user && user.id && eventId) {
      checkRegistrationStatus(user.id, parseInt(eventId)).then((registered) => {
        setIsRegistered(registered);
      });
    }
  }, [eventId, user, getEventById, checkRegistrationStatus]);

  const handleSubmit = async () => {
    if (user && user.id) {
      setIsSubmitting(true); // Start submission loading
      const registrationData = {
        eventId: parseInt(eventId),
        userId: user.id,
        topic,
      };
      try {
        await addRegistration(registrationData);
        setIsModalOpen(false);
        setTopic("NA");
        setIsRegistered(true);
        toast.success(`Registration successful!!`);
      } catch (error) {
        toast.error(`Registration failed. Please try again.`);
      } finally {
        setIsSubmitting(false); // End submission loading
      }
    } else {
      toast.error(`Registration failed. Please try again.`);
    }
  };

  return (
    <div className="main-div">
      {loading && <Loading />}
      {!loading && (
        <>
          <h6 className="form-heading">Event Details</h6>
          <div className="border-b-2 border-gray-300 mb-4 relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 -top-2 bg-white px-2"></div>
          </div>

          <div className="flex flex-wrap md:flex-nowrap gap-4">
            <div className="w-full md:w-1/3">
              <Image
                src={
                  typeof event.imageUrl === "string"
                    ? event.imageUrl
                    : event.eventName
                }
                alt={event.eventName || "Event"}
                width={400}
                height={500}
                layout="responsive"
                objectFit="cover"
              />
            </div>
            <div className="w-full md:w-2/3 flex flex-col justify-between">
              <table className="w-full border-collapse text-lg">
                <tbody>
                  <tr className="border-b">
                    <td className="p-2 pl-4 pr-4 font-bold">Event Name</td>
                    <td className="p-2 pl-4 pr-4">{event.eventName}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 pl-4 pr-4 font-bold">Event Type</td>
                    <td className="p-2 pl-4 pr-4">{event.eventType}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 pl-4 pr-4 font-bold">Members</td>
                    <td className="p-2 pl-4 pr-4">{event.members}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 pl-4 pr-4 font-bold">Venue</td>
                    <td className="p-2 pl-4 pr-4">{event.venue}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 pl-4 pr-4 font-bold">Start Date</td>
                    <td className="p-2 pl-4 pr-4">
                      {new Date(event.startDateTime).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 pl-4 pr-4 font-bold">End Date</td>
                    <td className="p-2 pl-4 pr-4">
                      {new Date(event.endDateTime).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 pl-4 pr-4 font-bold">Status</td>
                    <td className="p-2 pl-4 pr-4">
                      {event.status ? "Open" : "Closed"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>

          <div className="flex justify-end mt-4">
            {!isRegistered ? (
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-green-600 text-white py-2 px-4 rounded mt-4"
              >
                Register
              </button>
            ) : (
              <button
                className="bg-gray-400 text-white py-2 px-4 rounded mt-4"
                disabled
              >
                Registered
              </button>
            )}
          </div>

          {isModalOpen && (
            <div className="fixed inset-0 w-full flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg min-w-96 relative">
                {isSubmitting && <Loading />} {/* Show loader during submission */}
                <button
                  className="absolute top-4 right-4 text-gray-500"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isSubmitting} // Disable closing while submitting
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
                <h2 className="text-lg font-bold mb-4">Confirm Registration</h2>
                <p>Are you sure you want to register for this event?</p>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={handleSubmit}
                    className="bg-green-600 text-white py-2 px-4 rounded-lg mr-2"
                    disabled={isSubmitting} // Disable button during submission
                  >
                    Yes, Register
                  </button>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="bg-red-600 text-white py-2 px-4 rounded-lg"
                    disabled={isSubmitting} // Disable button during submission
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default EventInfo;
