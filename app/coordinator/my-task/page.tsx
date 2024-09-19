"use client";
import React, { useEffect } from "react";
import useLoginStore from "@/store/loginStore";
import useUserEventRegistartionStore from "../../../store/user_event_registrationStore";
import useEventStore from "@/store/eventStore";
import Image from "next/image";
import Link from "next/link";
import { PencilSquareIcon } from "@heroicons/react/16/solid";
import { TrashIcon } from "@heroicons/react/24/solid";

const ViewMyTask = () => {
  const { user } = useLoginStore((state) => ({
    user: state.user,
  }));

  const { registrations, getRegistartionByUserId } =
    useUserEventRegistartionStore((state) => ({
      registrations: state.registrations,
      getRegistartionByUserId: state.getRegistartionByUserId,
    }));

  const { events, getAllEvents, deleteEvent } = useEventStore((state) => ({
    events: state.events,
    getAllEvents: state.getAllEvents,
    deleteEvent: state.deleteEvent,
  }));

  useEffect(() => {
    if (user) {
      getRegistartionByUserId(user.id);
    }
    getAllEvents();
  }, [user, getRegistartionByUserId, getAllEvents]);

  const validRegistrations = registrations.filter(
    (registration) =>
      registration.event && events.find((e) => e.id === registration.event.id)
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex justify-center items-start p-8 pt-20">
        <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-red-500 mb-6 text-left">
            Assigned Events
          </h2>
          {validRegistrations.length > 0 ? (
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase">
                    Image
                  </th>
                  <th>Event Type</th>
                  <th>Event Name</th>
                  <th>Venue</th>
                  <th>Start Date & Time</th>
                  <th>End Date & Time</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {validRegistrations.map((registration) => {
                  const event = events.find(
                    (e) => e.id === registration.event?.id
                  );

                  if (!event) {
                    return null;
                  }

                  return (
                    <tr key={registration.id}>
                      <td className="py-2 px-4 border-b border-gray-200 text-sm text-left">
                        <Image
                          src={
                            typeof event.imageUrl === "string"
                              ? event.imageUrl
                              : event.eventName
                          }
                          alt={event.eventName}
                          width={50}
                          height={50}
                          className="object-cover"
                        />
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 text-sm text-center">
                        {event.eventType}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 text-sm text-center">
                        {event.eventName}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 text-sm text-center">
                        {event.venue}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 text-sm text-center">
                        {new Date(event.startDateTime).toLocaleString()}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 text-sm text-center">
                        {new Date(event.endDateTime).toLocaleString()}
                      </td>
                      <td className="py-2 px-2 border-b border-gray-200 text-sm text-center">
                        <div className="flex space-x-2 justify-center">
                          <Link
                            href={`/admin/events/view-event/${event.festival.id}/${event.id}`}
                          >
                            <button>
                              <PencilSquareIcon className=" update-icon" />
                            </button>
                          </Link>
                          <button onClick={() => deleteEvent(event.id)}>
                            <TrashIcon className=" delete-icon" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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

export default ViewMyTask;
