"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import useEventStore from "../../../../../../store/eventStore";
import useUserEventRegistartionStore from "../../../../../../store/user_event_registrationStore";
import useLoginStore from "@/store/loginStore";

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [topic, setTopic] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    if (eventId) {
      getEventById(parseInt(eventId));
    }

    if (user && user.id && eventId) {
      checkRegistrationStatus(user.id, parseInt(eventId)).then((registered) => {
        setIsRegistered(registered);
      });
    }
  }, [eventId, user, getEventById, checkRegistrationStatus]);

  const handleSubmit = async () => {
    if (user && user.id) {
      await addRegistration({
        eventId: parseInt(eventId),
        userId: user.id,
        topic,
      });
      setIsModalOpen(false);
      setTopic("");
      setIsRegistered(true);
    } else {
      alert("Please login to register for the event.");
    }
  };

  return (
    <div className="main-div">
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
            className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
          >
            Register
          </button>
        ) : (
          <button
            className="bg-gray-400 text-white py-2 px-4 rounded mt-4"
            disabled
          >
            Already registered
          </button>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-lg font-bold mb-4">Enter Your Topic</h2>
            <input
              type="text"
              className="border p-2 w-full mb-4"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
              >
                Submit
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-red-500 text-white py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventInfo;
