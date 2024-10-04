"use client";
import React, { useEffect, useState } from "react";
import useLoginStore from "@/store/loginStore";
import useUserEventRegistartionStore from "../../../store/user_event_registrationStore";
import useEventStore, { Event } from "@/store/eventStore";
import Link from "next/link";
import { toast } from "react-toastify";
import Loading from "@/app/loading";

const RegisteredEvents = () => {
  const { user } = useLoginStore((state) => ({ user: state.user }));
  const { registrations, getRegistartionByUserId, cancelRegistration } =
    useUserEventRegistartionStore((state) => ({
      registrations: state.registrations,
      getRegistartionByUserId: state.getRegistartionByUserId,
      cancelRegistration: state.deleteUserEvntReg,
    }));
  const { events, getAllEvents } = useEventStore((state) => ({
    events: state.events,
    getAllEvents: state.getAllEvents,
  }));

  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (user) {
          await getRegistartionByUserId(user.id);
        }
        await getAllEvents();
      } catch (error) {
        toast.error("Failed to load events or registrations.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user, getRegistartionByUserId, getAllEvents]);

  const handleCancelClick = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const confirmCancel = async () => {
    const registrationToCancel = registrations.find(
      (registration) => registration.event?.id === selectedEvent?.id
    );

    if (registrationToCancel) {
      try {
        await cancelRegistration(registrationToCancel.id);
        setIsModalOpen(false);
        toast.success("Event registration cancelled successfully!");
      } catch (error) {
        setIsModalOpen(false);
        toast.error("Failed to cancel the event registration.");
      }
    }
  };

  return (
    <div className="main-div p-4">
      {loading ? (
        <Loading />
      ) : (
        <div className="show-form-div mt-6">
          <h1 className="form-heading text-xl font-bold mb-4">Registered Events</h1>
          {registrations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {registrations.map((registration) => {
                if (!registration.event) {
                  return null;
                }

                const event = events.find((e) => e.id === registration.event.id);

                if (!event) {
                  return null;
                }

                return (
                  <div
                    key={registration.id}
                    className="p-4 bg-white border border-gray-300 rounded-lg shadow-lg"
                  >
                    <h3 className="text-lg font-bold mb-2 text-gray-800">
                      {event.eventName}
                    </h3>
                    <p className="mb-1 text-gray-600">Type: {event.eventType}</p>
                    <p className="mb-1 text-gray-600">Venue: {event.venue}</p>
                    <p className="mb-1 text-gray-600">
                      Start Date: {new Date(event.startDateTime).toLocaleString()}
                    </p>
                    <p className="mb-1 text-gray-600">
                      End Date: {new Date(event.endDateTime).toLocaleString()}
                    </p>
                    {event.status ? (
                      <button
                        className="bg-red-500 text-white py-1 px-3 rounded"
                        onClick={() => handleCancelClick(event)}
                      >
                        Cancel Registration
                      </button>
                    ) : (
                      <Link href={`/judge/view-scores/${event.id}`}>
                        <button className="bg-slate-400 text-white py-1 px-3 rounded">View Result</button>
                      </Link>
                    )}
                    <span
                      className={`inline-block px-2 py-1 rounded text-white font-bold ml-2 ${event.status ? 'bg-green-500' : 'bg-red-500'}`}
                    >
                      {event.status ? "Open" : "Closed"}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-gray-500">No registered events found.</p>
          )}
        </div>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-lg font-bold mb-4">Confirm Cancellation</h2>
            <p>
              Are you sure you want to cancel the registration for "
              {selectedEvent?.eventName}"?
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={confirmCancel}
                className="bg-red-500 text-white py-2 px-4 rounded mr-2"
              >
                Yes, Cancel
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded"
              >
                No, Keep Registration
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisteredEvents;
