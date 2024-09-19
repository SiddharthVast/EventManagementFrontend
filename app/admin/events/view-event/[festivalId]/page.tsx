"use client";
import useEventStore from "@/store/eventStore";
import useUserStore from "@/store/userStore";
import { useEffect, useState } from "react";
import "../../../../styles/common.css";
import Link from "next/link";
import {
  PencilSquareIcon,
  UserPlusIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/16/solid";
import useUserEventRegistrationStore from "@/store/user_event_registrationStore";
import Image from "next/image";
import { TrashIcon } from "@heroicons/react/24/solid";
import Loading from "@/app/loading";

interface Props {
  params: {
    festivalId: string;
  };
}

const ShowEvents = ({ params: { festivalId } }: Props) => {
  const [loading, setLoading] = useState(true); // Loading state

  const { events, getAllEvents, deleteEvent } = useEventStore((state) => ({
    events: state.events,
    getAllEvents: state.getAllEvents,
    deleteEvent: state.deleteEvent,
  }));

  const { users, getAllUsers } = useUserStore((state) => ({
    users: state.users,
    getAllUsers: state.getAllUsers,
  }));

  const { registrations, getAllRegistarations } =
    useUserEventRegistrationStore((state) => ({
      registrations: state.registrations,
      getAllRegistarations: state.getAllRegistarations,
    }));

  useEffect(() => {
    const fetchData = async () => {
      await getAllEvents();
      if (users.length === 0) {
        await getAllUsers();
      }
      await getAllRegistarations();
      setLoading(false);
    };
    fetchData();
  }, [getAllEvents, getAllUsers, users.length, getAllRegistarations]);

  const filteredEvents = events.filter(
    (event) => event.festival && event.festival.id === +festivalId
  );

  return (
    <div className="main-div">
      {loading ? (
        <Loading />
      ) : (
        <div className="show-form-div">
          <h1 className="form-heading">Events</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Type</th>
                  <th>Name</th>
                  <th>Members Type</th>
                  <th>Venue</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Status</th>
                  <th>Coordinator List</th>
                  <th>Assign Coordinator</th>
                  <th>Assign Judge</th>
                  <th>Skill Set</th>
                  <th>Actions</th>
                  <th>Result</th>
                  <th>Complete</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.map((event) => (
                  <tr key={event.id}>
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
                    <td className="py-2 px-2 text-center border-b border-gray-200 text-sm">
                      {event.eventType}
                    </td>
                    <td className="py-2 px-2 text-center border-b border-gray-200 text-sm">
                      {event.eventName}
                    </td>
                    <td className="py-2 px-2 text-center border-b border-gray-200 text-sm">
                      {event.members}
                    </td>
                    <td className="py-2 px-2 text-center border-b border-gray-200 text-sm">
                      {event.venue}
                    </td>
                    <td className="py-2 px-2 text-center border-b border-gray-200 text-sm">
                      {new Date(event.startDateTime).toLocaleString("en-US", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </td>
                    <td className="py-2 px-2 text-center border-b border-gray-200 text-sm">
                      {new Date(event.endDateTime).toLocaleString("en-US", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </td>
                    <td className="py-2 px-2 border-b text-center border-gray-200 text-sm">
                      {event.status ? "Open" : "Closed"}
                    </td>
                    <td className="py-2 px-2 border-b border-gray-200 text-sm text-center">
                      {registrations
                        .filter(
                          (registration) =>
                            registration.event &&
                            registration.event.id === event.id &&
                            users.find(
                              (user) => user.id === registration.user.id
                            )?.role === "coordinator"
                        )
                        .map((registration) => {
                          const user = users.find(
                            (user) => user.id === registration.user.id
                          );
                          return user
                            ? `${user.firstName} ${user.lastName}`
                            : "";
                        })
                        .join(", ") || "NA"}
                    </td>

                    <td className="py-2 px-2 border-b border-gray-200 text-sm text-center">
                      <Link
                        href={`/admin/coordinator/assign-coordinator/coordinator/${event.id}`}
                      >
                        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline">
                          Assign
                        </button>
                      </Link>
                    </td>
                    <td className="py-2 px-2 border-b border-gray-200 text-sm text-center">
                      <Link
                        href={`/admin/coordinator/assign-coordinator/judge/${event.id}`}
                      >
                        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline">
                          Assign
                        </button>
                      </Link>
                    </td>
                    <td>
                      <div className="flex space-x-2 justify-center">
                        <Link
                          href={`/admin/pointsToJudge/${
                            event.id
                          }?name=${encodeURIComponent(event.eventName)}`}
                          className="link-button"
                        >
                          <UserPlusIcon className="icon assign-icon" />
                        </Link>
                      </div>
                    </td>
                    <td className="py-2 px-2 border-b border-gray-200 text-sm text-center">
                      <div className="flex space-x-2 justify-center">
                        <Link
                          href={`/admin/events/view-event/${festivalId}/${event.id}`}
                        >
                          <button>
                            <PencilSquareIcon className=" update-icon" />
                          </button>
                        </Link>
                        <Link
                          href={`/admin/events/view-event/${festivalId}/${event.id}`}
                        ></Link>
                        <button onClick={() => deleteEvent(event.id)}>
                          <TrashIcon className=" delete-icon" />
                        </button>
                      </div>
                    </td>
                    <td>
                      <Link href={`/judge/view-scores/${event.id}`}>
                        <button>
                          <ClipboardDocumentListIcon className="update-icon" />
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowEvents;
