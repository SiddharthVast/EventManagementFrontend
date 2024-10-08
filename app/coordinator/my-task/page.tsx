"use client";
import React, { useEffect, useState } from "react";
import useLoginStore from "@/store/loginStore";
import useUserEventRegistartionStore from "../../../store/user_event_registrationStore";
import useEventStore from "@/store/eventStore";
import Image from "next/image";
import Link from "next/link";
import { PencilSquareIcon } from "@heroicons/react/16/solid";
import { TrashIcon, UserGroupIcon } from "@heroicons/react/24/solid";
import Loading from "@/app/loading";

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

  if (loading) {
    return <Loading />;
  }

  const validRegistrations = registrations.filter(
    (registration) =>
      registration.event && events.find((e) => e.id === registration.event.id)
  );

  return (
    <div className="main-div">
      <div className="show-form-div">
        <h2 className="form-heading">
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
                <th>Participants</th>
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
                    <td>
                      <Link href={`/admin/events/participants/${event.id}`}>
                        <button>
                          <UserGroupIcon className="update-icon" />
                        </button>
                      </Link>
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
  );
};

export default ViewMyTask;
