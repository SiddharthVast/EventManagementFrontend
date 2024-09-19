"use client";
import React, { useEffect, useState } from "react";
import useLoginStore from "@/store/loginStore";
import useUserEventRegistartionStore from "../../../store/user_event_registrationStore";
import useEventStore from "@/store/eventStore";

const RegisteredEvents = () => {
  const { user } = useLoginStore((state) => ({ user: state.user }));
  const { registrations, getRegistartionByUserId } =
    useUserEventRegistartionStore((state) => ({
      registrations: state.registrations,
      getRegistartionByUserId: state.getRegistartionByUserId,
    }));
  const { events, getAllEvents } = useEventStore((state) => ({
    events: state.events,
    getAllEvents: state.getAllEvents,
  }));

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        await getRegistartionByUserId(user.id);
      }
      await getAllEvents();
      setLoading(false);
    };

    fetchData();
  }, [user, getRegistartionByUserId, getAllEvents]);

  return (
    <div className="main-div">
      <div className="show-form-div">
        <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">
            Registered Events
          </h2>
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : registrations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {registrations.map((registration) => {
                const event = events.find(
                  (e) => e.id === registration.event.id
                );
                return (
                  <div
                    key={registration.id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
                  >
                    <div className="p-6">
                      <h3 className="text- font-bold  text-gray-800 mb-2 hover:text-blue-600 transition-colors duration-300">
                        {event ? event.eventName : "Event not found"}
                      </h3>
                      <p className="text-gray-700 mb-1">
                        <strong className="font-medium">Event Type:</strong>{" "}
                        {event ? event.eventType : "N/A"}
                      </p>
                      <p className="text-gray-700 mb-1">
                        <strong className="font-medium">Venue:</strong>{" "}
                        {event ? event.venue : "N/A"}
                      </p>
                      <p className="text-gray-700 mb-1">
                        <strong className="font-medium">Start:</strong>{" "}
                        {event
                          ? new Date(event.startDateTime).toLocaleString()
                          : "N/A"}
                      </p>
                      <p className="text-gray-700 mb-1">
                        <strong className="font-medium">End:</strong>{" "}
                        {event
                          ? new Date(event.endDateTime).toLocaleString()
                          : "N/A"}
                      </p>
                      <p className="text-gray-700">
                        <strong className="font-medium">Topic:</strong>{" "}
                        {registration.topic}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              No registered events found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisteredEvents;
