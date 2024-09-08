"use client";
import React, { useEffect, useState } from "react";
import useUserEventRegistrationStore from "../../../../store/user_event_registrationStore";

interface Props {
  params: {
    eventId: number;
  };
}
const RegistrationTable = ({ params: { eventId } }: Props) => {
  const { registrations, getRegByEidRole } = useUserEventRegistrationStore();
  const [sortedRegistrations, setSortedRegistrations] = useState(registrations);

  // Fetch the registrations when the component mounts
  useEffect(() => {
    getRegByEidRole(eventId, "student");
  }, []);
  useEffect(() => {
    const sortedData = [...registrations].sort(
      (a, b) => b.totalScores - a.totalScores
    );
    setSortedRegistrations(sortedData);

    // setSortedRegistrations(registrations);
  }, [registrations]);

  const handleSort = () => {
    const sortedData = [...registrations].sort(
      (a, b) => b.totalScores - a.totalScores
    );
    setSortedRegistrations(sortedData);
  };
  return (
    <div className="overflow-x-auto p-5">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Participant</th>
            <th className="py-2 px-4 border-b">Topic</th>
            <th className="py-2 px-4 border-b">Scores</th>
          </tr>
        </thead>
        <tbody>
          {sortedRegistrations.length > 0 ? (
            sortedRegistrations.map((registration, index) => (
              <tr
                key={registration.id}
                className={index < 3 ? "bg-yellow-100 font-bold" : ""}
              >
                <td className="py-2 px-4 border-b">
                  {registration.groupName !== "NA"
                    ? registration.groupName + " " + "Group"
                    : `${registration.user.firstName} ${registration.user.lastName}`}
                </td>

                <td className="py-2 px-4 border-b">{registration.topic}</td>
                <td className="py-2 px-4 border-b">
                  {registration.totalScores}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="py-4 text-center">
                No registrations found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RegistrationTable;
