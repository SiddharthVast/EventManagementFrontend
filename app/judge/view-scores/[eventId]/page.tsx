"use client";
import React, { useEffect, useState } from "react";
import useUserEventRegistrationStore from "../../../../store/user_event_registrationStore";
import useEventStore from "@/store/eventStore";
interface UserEventRegistration {
  id: number;
  groupName: string;
  topic: string;
  totalScores: number;
  user?: {
    firstName: string;
    lastName: string;
  } | null; // user can be null or undefined
}

interface Props {
  params: {
    eventId: number;
  };
}

const RegistrationTable = ({ params: { eventId } }: Props) => {
  const { registrations, getRegByEidRole } = useUserEventRegistrationStore();
  const { getEventById, event } = useEventStore();
  const [sortedRegistrations, setSortedRegistrations] = useState<
    UserEventRegistration[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAndSortRegistrations = async () => {
      setLoading(true); // Set loading state to true
      setError(null); // Clear any previous errors
      getEventById(eventId);
      try {
        await getRegByEidRole(eventId, "student");
        // Assuming registrations is updated in the store and will reflect the latest data
        const fetchedRegistrations = [...registrations];
        const sortedData = fetchedRegistrations.sort(
          (a, b) => b.totalScores - a.totalScores
        );
        setSortedRegistrations(sortedData);
      } catch (error) {
        setError("Failed to load data");
      } finally {
        setLoading(false); // Set loading state to false after fetching
      }
    };

    fetchAndSortRegistrations();
  }, [eventId, getRegByEidRole, registrations]); // Ensure dependencies are correct

  if (loading) return <div>Loading...</div>; // Show loading state
  if (error) return <div>{error}</div>; // Show error state

  return (
    <div className="main-div overflow-x-auto p-5">
      <h1 className="text-xl font-bold text-white bg-red-800 p-2 mx-10 rounded-md">
        Result of Event: {event.eventName}
      </h1>{" "}
      <table className="m-10">
        <thead>
          <tr>
            <th>Participant</th>
            <th>Topic</th>
            <th>Scores</th>
          </tr>
        </thead>
        <tbody>
          {sortedRegistrations.length > 0 ? (
            sortedRegistrations.map((registration, index) => (
              <tr
                key={registration.id}
                className={index < 3 ? "bg-green-100 font-bold" : ""}
              >
                <td>
                  {registration.groupName !== "NA"
                    ? `${registration.groupName} Group`
                    : registration.user
                    ? `${registration.user.firstName} ${registration.user.lastName}`
                    : "Unknown Participant"}
                </td>

                <td>{registration.topic}</td>
                <td>{registration.totalScores}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>No Data found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RegistrationTable;
