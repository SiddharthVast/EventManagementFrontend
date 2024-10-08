"use client";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import useEventStore from "@/store/eventStore";
import useFestivalStore from "@/store/festivalStore";
import useLoginStore from "@/store/loginStore";

const ShowEvents = () => {
  const { user } = useLoginStore((state) => ({ user: state.user }));
  const collegeId = user?.college?.id;
  const { events, getEventByFestId } = useEventStore((state) => ({
    events: state.events,
    getEventByFestId: state.getEventByFestId,
  }));
  const { festival, getActiveFest } = useFestivalStore((state) => ({
    festival: state.festival,
    getActiveFest: state.getActiveFest,
  }));

  useEffect(() => {
    if (collegeId) {
      getActiveFest(collegeId);
    }
  }, [collegeId, getActiveFest]);

  useEffect(() => {
    if (festival.id) {
      getEventByFestId(festival.id);
    }
  }, [festival, getEventByFestId]);

  const formatDateTime = (dateString: any) => {
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();
    let hours = date.getUTCHours();
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;

    return `${day}-${month}-${year}, ${String(hours).padStart(
      2,
      "0"
    )}:${minutes} ${ampm}`;
  };

  return (
    <div className="main-div">
      <h1 className="form-heading">Upcoming Events</h1>
      <div className="border-b-2 border-gray-200 mb-6 relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 -top-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-1 w-24 rounded-full"></div>
      </div>
      <div className="flex justify-end mb-4">
        <Link href="/student/reg-events" legacyBehavior>
          <a className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300">
            View Registered Events
          </a>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.length > 0 ? (
          events.map((event) => (
            <div
              key={event.id}
              className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="relative w-full h-48">
                <Image
                  src={
                    typeof event.imageUrl === "string"
                      ? event.imageUrl
                      : "/placeholder.jpg"
                  }
                  alt={event.eventName}
                  fill
                  style={{ objectFit: "cover" }}
                  className="absolute inset-0"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {event.eventName}
                </h2>
                <p className="text-gray-600 mb-4">
                  <span className="block text-sm font-medium text-gray-500">
                    {formatDateTime(event.startDateTime)}
                  </span>
                  <span className="block text-sm font-medium text-gray-500">
                    TO {formatDateTime(event.endDateTime)}
                  </span>
                </p>
                <Link
                  href={`/student/collegefest/view-events/${festival?.id}/${event.id}`}
                  legacyBehavior
                >
                  <a className="inline-block text-blue-500 hover:text-blue-700 font-semibold transition-colors duration-300">
                    Read More
                  </a>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No events found.</p>
        )}
      </div>
    </div>
  );
};

export default ShowEvents;
