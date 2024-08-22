"use client";
import useEventStore from "@/store/eventStore";
import { useEffect } from "react";
import "../styles/common.css"; 

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
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full border-collapse bg-white">
          <thead className="table-header">
            <tr>
              <th className="table-cell">Event ID</th>
              <th className="table-cell">Event Type</th>
              <th className="table-cell">Event Name</th>
              <th className="table-cell">Members Type</th>
              <th className="table-cell">Venue</th>
              <th className="table-cell">Start DateTime</th>
              <th className="table-cell">End DateTime</th>
              <th className="table-cell">Status</th>
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
                {/* <td className="table-cell">{event.status}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowEvents;
