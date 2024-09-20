"use client";
import React, { useEffect, useState } from "react";
import useLoginStore from "@/store/loginStore";
import useUserEventRegistartionStore from "../../../store/user_event_registrationStore";
import useEventStore from "@/store/eventStore";
import Link from "next/link";

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
  const handleDelete = (registrationId: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this registration?"
    );
    if (confirmed) {
      cancelRegistration(registrationId);
    }
  };
  return (
    <div className="main-div">
      <div className="show-form-div">
        <h1 className="form-heading">Registered Events</h1>
        {registrations.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {registrations.map((registration) => {
              if (!registration.event) {
                return (
                  <div
                    key={registration.id}
                    style={{
                      padding: "1rem",
                      backgroundColor: "#f8d7da",
                      borderRadius: "8px",
                      border: "1px solid #f5c6cb",
                    }}
                  >
                    <p className="text-center text-sm text-gray-500">
                      Event data is not available.
                    </p>
                  </div>
                );
              }

              const event = events.find((e) => e.id === registration.event.id);

              if (!event) {
                return (
                  <div
                    key={registration.id}
                    style={{
                      padding: "1rem",
                      backgroundColor: "#f8d7da",
                      borderRadius: "8px",
                      border: "1px solid #f5c6cb",
                    }}
                  >
                    <p className="text-center text-sm text-gray-500">
                      Event not found.
                    </p>
                  </div>
                );
              }

              return (
                <div
                  key={registration.id}
                  style={{
                    padding: "1rem",
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    border: "1px solid #e0e0e0",
                    boxShadow: "0 1px 5px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: "bold",
                      marginBottom: "0.5rem",
                      color: "#333",
                    }}
                  >
                    {event.eventName}
                  </h3>
                  <p style={{ marginBottom: "0.5rem", color: "#555" }}>
                    Type: {event.eventType}
                  </p>
                  <p style={{ marginBottom: "0.5rem", color: "#555" }}>
                    Venue: {event.venue}
                  </p>
                  <p style={{ marginBottom: "0.5rem", color: "#555" }}>
                    Start: {new Date(event.startDateTime).toLocaleString()}
                  </p>
                  <p style={{ marginBottom: "0.5rem", color: "#555" }}>
                    End: {new Date(event.endDateTime).toLocaleString()}
                  </p>
                  <p style={{ marginBottom: "1rem", color: "#555" }}>
                    Topic: {registration.topic}
                  </p>
                  {event.status ? (
                    <button
                      className="btn_delete"
                      // onClick={() => cancelRegistration(registration.id)}
                      onClick={() => handleDelete(registration.id)}
                    >
                      Cancel Registration
                    </button>
                  ) : (
                    <Link href={`/judge/view-scores/${event.id}`}>
                      <button className="bg-slate-400">View Result</button>
                    </Link>
                  )}
                  <span
                    style={{
                      padding: "0.25rem 0.5rem",
                      borderRadius: "4px",
                      color: "#fff",
                      backgroundColor: event.status ? "#28a745" : "#dc3545", // Green for open, red for closed
                      fontWeight: "bold",
                      marginLeft: "1rem",
                    }}
                  >
                    {event.status ? "Open" : "Closed"}
                  </span>{" "}
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
  );
};

export default RegisteredEvents;
