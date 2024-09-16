"use client";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import useEventStore from "@/store/eventStore";
import useUserStore from "@/store/userStore";
import useUserEventRegistrationStore from "@/store/user_event_registrationStore";

interface Props {
    params: {
        festivalId: string;
    };
}

const ShowEvents = ({ params: { festivalId } }: Props) => {
    const { events, getAllEvents } = useEventStore((state) => ({
        events: state.events,
        getAllEvents: state.getAllEvents,
    }));

    const { users } = useUserStore((state) => ({
        users: state.users,
        getAllUsers: state.getAllUsers,
    }));

    const { getAllRegistarations } = useUserEventRegistrationStore(
        (state) => ({
            getAllRegistarations: state.getAllRegistarations,
        })
    );

    useEffect(() => {
        getAllEvents();
        getAllRegistarations();
    }, [getAllEvents, users.length, getAllRegistarations]);

    const filteredEvents = events.filter(
        (event) => event.festival && event.festival.id === +festivalId
    );

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-black">Events</h1>
            <div className="border-b-2 border-gray-300 mb-4 relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 -top-2 bg-white px-2"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredEvents.map((event) => (
                    <div key={event.id} className="border rounded-lg overflow-hidden shadow-lg">
                        <div className="w-full h-80 relative">
                            <Image
                                src={
                                    typeof event.imageUrl === "string"
                                        ? event.imageUrl
                                        : event.eventName
                                }
                                alt={event.eventName}
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                        <div className="p-4">
                            <h2 className="text-xl font-bold">{event.eventName}</h2>
                            <Link href={`/student/collegefest/view-events/${festivalId}/${event.id}`} legacyBehavior>
                                <a className="text-blue-500">Read More</a>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShowEvents;
