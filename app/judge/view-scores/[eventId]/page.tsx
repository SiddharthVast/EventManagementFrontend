"use client";
import React, { useEffect, useState } from "react";
import useUserEventRegistrationStore from "../../../../store/user_event_registrationStore";
import useEventStore from "@/store/eventStore";

interface UserEventRegistration {
  id: number;
  totalScores: number;
  user?: {
    firstName: string;
    lastName: string;
  } | null;
}

interface Props {
  params: {
    eventId: number;
  };
}

const RegistrationTable = ({ params: { eventId } }: Props) => {
  const { registrations, getRegByEidRole } = useUserEventRegistrationStore();
  const { getEventById, event } = useEventStore();
  const [sortedRegistrations, setSortedRegistrations] = useState<UserEventRegistration[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAndSortRegistrations = async () => {
      setLoading(true);
      setError(null);
      getEventById(eventId);
      try {
        await getRegByEidRole(eventId, "student");
        const fetchedRegistrations = [...registrations];
        const sortedData = fetchedRegistrations.sort((a, b) => b.totalScores - a.totalScores);
        setSortedRegistrations(sortedData);
      } catch (error) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchAndSortRegistrations();
  }, [eventId, getRegByEidRole, registrations]);

  const handlePrint = () => {
    const printWindow = window.open("", "", "width=800,height=600");

    if (printWindow) {
      const htmlContent = `
        <html>
        <head>
          <style>
            @media print {
              @page {
                margin: 0; /* Remove default margins */
              }
              body { 
                font-family: "Baloo 2", sans-serif; 
                margin: 20px; 
                padding: 0; 
              }
              h1 { 
                text-align: center; 
                background-color: #ff0000; 
                color: white; 
                padding: 10px; 
                border-radius: 5px; 
              }
              table { 
                width: 100%; 
                border-collapse: collapse; 
                margin-top: 20px; 
              }
              th, td { 
                border: 1px solid #ddd; 
                padding: 8px; 
                text-align: center; 
              }
              th { 
                background-color: #f2f2f2; 
              }
              .highlight { 
                background-color: #c6f6d5; 
                font-weight: bold; 
              }
              /* Hide header/footer */
              body:before {
                content: "";
                display: none;
              }
              body:after {
                content: "";
                display: none;
              }
            }
          </style>
        </head>
        <body>
          <h1>Result of Event: ${event.eventName}</h1>
          <table>
            <thead>
              <tr>
                <th>Participants</th>
                <th>Scores</th>
              </tr>
            </thead>
            <tbody>
              ${sortedRegistrations.length > 0
          ? sortedRegistrations
            .map((registration, index) => `
                      <tr${index < 3 ? ' class="highlight"' : ''}>
                        <td>${registration.user ? `${registration.user.firstName} ${registration.user.lastName}` : "Unknown Participant"}</td>
                        <td>${registration.totalScores}</td>
                      </tr>
                    `)
            .join("")
          : `<tr><td colspan="2">No Data found.</td></tr>`
        }
            </tbody>
          </table>
        </body>
        </html>
      `;

      printWindow.document.open();
      printWindow.document.write(htmlContent);
      printWindow.document.close();

      printWindow.onload = () => {
        printWindow.print();
        printWindow.close();
      };
    } else {
      console.error("Failed to open print window");
    }
  };


  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="main-div p-5 flex justify-center">
      <div className="bg-white shadow-lg rounded-lg p-5 w-full max-w-6xl">
        <div id="printable-area">
          <h1 className="text-2xl font-bold text-white bg-red-800 p-3 rounded-md mb-5 text-center">
            Result of Event: {event.eventName}
          </h1>
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="w-1/2 px-4 py-2 text-center">Participants</th>
                  <th className="w-1/2 px-4 py-2 text-center">Scores</th>
                </tr>
              </thead>
              <tbody>
                {sortedRegistrations.length > 0 ? (
                  sortedRegistrations.map((registration, index) => (
                    <tr
                      key={registration.id}
                      className={index < 3 ? "bg-green-100 font-bold" : ""}
                    >
                      <td className="w-1/2 px-4 py-2 text-center">
                        {registration.user
                          ? `${registration.user.firstName} ${registration.user.lastName}`
                          : "Unknown Participant"}
                      </td>
                      <td className="w-1/2 px-4 py-2 text-center">{registration.totalScores}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2} className="px-4 py-2 text-center">No Data found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-center mt-5">
          <button
            onClick={handlePrint}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Print to PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationTable;
