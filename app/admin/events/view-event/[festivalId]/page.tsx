"use client";
import useEventStore from "@/store/eventStore";
import useUserStore from "@/store/userStore";
import { useEffect } from "react";
import "../../../../styles/common.css";
import Link from "next/link";
import { ArrowRightIcon, PencilSquareIcon, UserPlusIcon } from "@heroicons/react/16/solid";
import useUserEventRegistrationStore from "@/store/user_event_registrationStore";
import Image from "next/image";
import { TrashIcon } from "@heroicons/react/24/solid";

interface Props {
    params: {
        festivalId: string;
    };
}
const ShowEvents = ({ params: { festivalId } }: Props) => {
    const { events, getAllEvents, deleteEvent } = useEventStore((state) => ({
        events: state.events,
        getAllEvents: state.getAllEvents,
        deleteEvent: state.deleteEvent,
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
        getAllEvents();
        if (users.length === 0) {
            getAllUsers(); // Fetch coordinators
        }
        getAllRegistarations();
    }, [getAllEvents, getAllUsers, users.length, getAllRegistarations]);

    const filteredEvents = events.filter(
        (event) => event.festival && event.festival.id === +festivalId
    );

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="flex justify-center items-start p-8 pt-20">
                <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-8">
                    <h1 className="text-2xl font-semibold text-red-500 mb-6 mt-5">
                        Events
                    </h1>
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-center text-sm font-semibold text-gray-600 uppercase">
                                    Image
                                </th>
                                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-center text-sm font-semibold text-gray-600 uppercase">
                                    Type
                                </th>
                                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-center text-sm font-semibold text-gray-600 uppercase">
                                    Name
                                </th>
                                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-center text-sm font-semibold text-gray-600 uppercase">
                                    Members Type
                                </th>
                                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-center text-sm font-semibold text-gray-600 uppercase">
                                    Venue
                                </th>
                                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-center text-sm font-semibold text-gray-600 uppercase">
                                    Start Date
                                </th>
                                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-center text-sm font-semibold text-gray-600 uppercase">
                                    End Date
                                </th>
                                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-center text-sm font-semibold text-gray-600 uppercase">
                                    Status
                                </th>
                                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-center text-sm font-semibold text-gray-600 uppercase">
                                    Coordinator List
                                </th>

                                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-center text-sm font-semibold text-gray-600 uppercase">
                                    Assign Coordinator
                                </th>
                                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-center text-sm font-semibold text-gray-600 uppercase">
                                    Skill Set
                                </th>
                                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-center text-sm font-semibold text-gray-600 uppercase">
                                    Actions
                                </th>
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
                                                    users.find((user) => user.id === registration.user.id)
                                                        ?.role === "coordinator"
                                            )
                                            .map((registration) => {
                                                const user = users.find(
                                                    (user) => user.id === registration.user.id
                                                );
                                                return user ? `${user.firstName} ${user.lastName}` : "";
                                            })
                                            .join(", ") || "NA"}
                                    </td>

                                    <td className="py-2 px-2 border-b border-gray-200 text-sm text-center">
                                        <Link
                                            href={`/admin/coordinator/assign-coordinator/${event.id}`}
                                        >
                                            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline">
                                                Assign
                                            </button>
                                        </Link>
                                    </td>
                                    <td>
                                        <div className="flex space-x-2 justify-center">
                                            <Link
                                                href={`/admin/pointsToJudge/${event.id
                                                    }?name=${encodeURIComponent(event.eventName)}`}
                                                className="link-button"
                                            >
                                                <UserPlusIcon className="icon assign-icon" />
                                            </Link>
                                        </div>
                                    </td>
                                    <td className="py-2 px-2 border-b border-gray-200 text-sm text-center">
                                        <div className="flex space-x-2 justify-center">
                                            <Link href={`/admin/events/view-event/${festivalId}/${event.id}`}>
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
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ShowEvents;
