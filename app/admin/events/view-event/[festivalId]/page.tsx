"use client";
import useEventStore, { Event } from "@/store/eventStore";
import useUserStore from "@/store/userStore";
import { useEffect, useState } from "react";
import "../../../../styles/common.css";
import Link from "next/link";
import {
  PencilSquareIcon,
  UserPlusIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
} from "@heroicons/react/16/solid";
import useUserEventRegistrationStore from "@/store/user_event_registrationStore";
import Image from "next/image";
import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/solid";
import Loading from "@/app/loading";
import { toast } from "react-toastify";

interface Props {
  params: {
    festivalId: string;
  };
}

const ShowEvents = ({ params: { festivalId } }: Props) => {
  const [loading, setLoading] = useState(true); // Loading state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const { events, getAllEvents, deleteEvent, updateEventStatus } =
    useEventStore((state) => ({
      events: state.events,
      getAllEvents: state.getAllEvents,
      deleteEvent: state.deleteEvent,
      updateEventStatus: state.updateEventStatus,
    }));

  const { users, getAllUsers } = useUserStore((state) => ({
    users: state.users,
    getAllUsers: state.getAllUsers,
  }));

  const { registrations, getAllRegistarations } = useUserEventRegistrationStore(
    (state) => ({
      registrations: state.registrations,
      getAllRegistarations: state.getAllRegistarations,
    })
  );

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

  const handleDeleteClick = (event: Event) => {
    setSelectedEvent(event); // Set the selected event
    setIsModalOpen(true); // Open the modal
  };

  const confirmDelete = async () => {
    if (selectedEvent) {
      await deleteEvent(selectedEvent.id);
      setIsModalOpen(false);
      toast.success("Event deleted successfully!"); // Show success toast
    }
  };

  return (
    <div className="main-div">
      {loading ? (
        <Loading />
      ) : (
        <div className="show-form-div">
          <h1 className="header-content">Events</h1>
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
                  {/* <th>Status</th> */}
                  <th>Coordinator List</th>
                  <th>Coordinator</th>
                  <th>Judge</th>
                  <th>Skill Set</th>
                  <th>Actions</th>
                  <th>Result</th>
                  <th>Complete</th>
                  <th>Participants</th>
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
                    {/* <td className="py-2 px-2 border-b text-center border-gray-200 text-sm">
                      {event.status ? "Open" : "Closed"}
                    </td> */}
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
                    <td>
                      <div className="flex space-x-2 justify-center">
                        <Link
                          href={`/admin/coordinator/assign-coordinator/coordinator/${event.id}`}
                          className="link-button"
                        >
                          <UserPlusIcon className="icon assign-icon" />
                        </Link>
                      </div>
                    </td>
                    <td>
                      <div className="flex space-x-2 justify-center">
                        <Link
                          href={`/admin/coordinator/assign-coordinator/judge/${event.id}`}
                          className="link-button"
                        >
                          <UserPlusIcon className="icon assign-icon" />
                        </Link>
                      </div>
                    </td>
                    <td>
                      <div className="flex space-x-2 justify-center">
                        <Link
                          href={`/admin/pointsToJudge/${event.id
                            }?name=${encodeURIComponent(event.eventName)}`}
                          className="link-button"
                        >
                          <div className="h-8 w-8 text-yellow-500">
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-full">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
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
                        <button onClick={() => handleDeleteClick(event)}>
                          <TrashIcon className="delete-icon" />
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
                    {/* <td className="py-2 px-2 border-b text-center border-gray-200 text-sm">
                      {event.status ? "Open" : "Closed"}
                    </td> */}

                    <td className="py-2 px-4 border-b border-gray-200 text-sm text-center">
                      {event.status ? (
                        <button
                          onClick={() => updateEventStatus(event.id)}
                          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                        >
                          Complete
                        </button>
                      ) : (
                        <span className="text-gray-500">closed</span> // Placeholder for closed status
                      )}
                    </td>
                    <td>
                      <Link href={`/admin/events/participants/${event.id}`}>
                        <button>
                          <UserGroupIcon className="update-icon" />
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )
      }

      {
        isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
              <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
              <p>
                Are you sure you want to delete the event "
                {selectedEvent?.eventName}"?
              </p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={confirmDelete}
                  className="bg-red-500 text-white py-2 px-4 rounded mr-2"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )
      }
    </div >
  );
};

export default ShowEvents;
