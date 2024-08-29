"use client";
import useEventStore from "@/store/eventStore";
import { useEffect } from "react";
import "../../../styles/common.css";
import Link from "next/link";

const ShowEvents = () => {
  const { events, getAllEvents, deleteEvent } = useEventStore((state) => ({
    events: state.events,
    getAllEvents: state.getAllEvents,
    deleteEvent: state.deleteEvent,
  }));

  useEffect(() => {
    getAllEvents();
  }, [getAllEvents]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex justify-center items-start p-8 pt-20">
        <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-8">
          <Link href="/events/view-event/new" className="btn_add">
            Add Event
          </Link>
          <h1 className="text-2xl font-semibold text-red-500 mb-6 mt-5">
            Registered Events
          </h1>
          <table className="w-full border-collapse bg-white">
            <thead className="table-header">
              <tr>
                <th className="table-cell">ID</th>
                <th className="table-cell">Type</th>
                <th className="table-cell">Name</th>
                <th className="table-cell">Members Type</th>
                <th className="table-cell">Venue</th>
                <th className="table-cell">Start</th>
                <th className="table-cell">End</th>
                <th className="table-cell">Status</th>
                <th className="table-cell">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id} className="table-row-hover">
                  <td className="table-cell">{event.id}</td>
                  <td className="table-cell">{event.eventType}</td>
                  <td className="table-cell">{event.eventName}</td>
                  <td className="table-cell">{event.members}</td>
                  <td className="table-cell">{event.venue}</td>
                  <td className="table-cell">
                    {new Date(event.startDateTime).toLocaleString()}
                  </td>
                  <td className="table-cell">
                    {new Date(event.endDateTime).toLocaleString()}
                  </td>
                  <td className="table-cell">{event.id}</td>
                  <td>
                    <button
                      className="btn_delete"
                      type="submit"
                      onClick={() => deleteEvent(event.id)}
                    >
                      Delete
                    </button>
                    <Link href={`/events/view-event/${event.id}`}>
                      <button
                        className="btn_update"
                        type="button"
                        // onClick={() => reset()}
                      >
                        Update
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShowEvents;
