"use client";

import React, { useEffect } from "react";
import useLoginStore from "@/store/loginStore";
import useUserEventRegistartionStore from "../../../store/user_event_registrationStore";
import useEventStore from "@/store/eventStore";

const RegisteredEvents = () => {
    const { user } = useLoginStore((state) => ({
        user: state.user,
    }));

    const { registrations, getRegistartionByUserId } = useUserEventRegistartionStore(
        (state) => ({
            registrations: state.registrations,
            getRegistartionByUserId: state.getRegistartionByUserId,
        })
    );

    const { events, getAllEvents } = useEventStore((state) => ({
        events: state.events,
        getAllEvents: state.getAllEvents,
    }));

    useEffect(() => {
        if (user) {
            getRegistartionByUserId(user.id);
        }
        getAllEvents();
    }, [user, getRegistartionByUserId, getAllEvents]);

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="flex justify-center items-start p-8 pt-20">
                <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-8">
                    <h2 className="text-2xl font-semibold text-red-500 mb-6 text-left">Registered Events</h2>
                    {registrations.length > 0 ? (
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr>
                                    <th>Event Type</th>
                                    <th>Event Name</th>
                                    <th>Venue</th>
                                    <th>Start Date & Time</th>
                                    <th>End Date & Time</th>
                                    <th>Topic</th>
                                </tr>
                            </thead>
                            <tbody>
                                {registrations.map((registration) => {
                                    if (!registration.event) {
                                        return (
                                            <tr key={registration.id}>
                                                <td className="py-2 px-4 text-center text-sm text-gray-500 w-full">
                                                    Event data is not available.
                                                </td>
                                            </tr>
                                        );
                                    }

                                    const event = events.find((e) => e.id === registration.event.id);

                                    if (!event) {
                                        return (
                                            <tr key={registration.id}>
                                                <td className="py-2 px-4 text-center text-sm text-gray-500 w-full">
                                                    Event not found.
                                                </td>
                                            </tr>
                                        );
                                    }

                                    return (
                                        <tr key={registration.id}>
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
                                            <td className="py-2 px-4 border-b border-gray-200 text-sm text-center">
                                                {registration.topic}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-center text-gray-500">No registered events found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RegisteredEvents;
