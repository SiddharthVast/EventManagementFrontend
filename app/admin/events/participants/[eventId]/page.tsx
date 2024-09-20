"use client";
import React, { useEffect, useState } from "react";
import useUserEventRegistartionStore from "@/store/user_event_registrationStore";
interface Props {
  params: {
    eventId: string;
  };
}

const Participants = ({ params: { eventId } }: Props) => {
  const { registrations, getRegByEidRole } = useUserEventRegistartionStore(
    (state) => ({
      getRegByEidRole: state.getRegByEidRole,
      registrations: state.registrations,
    })
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); // Reset error state before fetching
      try {
        await getRegByEidRole(+eventId, "student");
      } catch (err) {
        setError("Failed to fetch participants. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [eventId, getRegByEidRole]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>; // Display error message
  }

  return (
    <div className="main-div">
      <div className="show-form-div">
        <h2>Participants for: {registrations[0]?.event?.eventName || "N/A"}</h2>
        {registrations.length === 0 ? (
          <p>No participants registered for this event.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>Sr. No</th>
                <th>Full Name</th>
                <th>Course Name</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((reg, index) => (
                <tr key={reg.id} style={{ borderBottom: "1px solid #ddd" }}>
                  <td>{index + 1}</td>
                  <td>
                    {reg.user.firstName} {reg.user.lastName}
                  </td>
                  <td>{reg.user.courseName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Participants;
