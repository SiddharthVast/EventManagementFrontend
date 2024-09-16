"use client";
import React, { useEffect, useState } from "react";
import useUserEventRegistrationStore, {
  UserEventRegistration,
} from "@/store/user_event_registrationStore";
import { useUser } from "../../context/UserContext";
import { ForwardIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const UserEvents = () => {
  const { user, logout } = useUser();
  const [regData, setRegData] = useState<UserEventRegistration[] | null>(null); // Array or null

  const { registrations, getRegistartionByUserId } =
    useUserEventRegistrationStore((state) => ({
      registrations: state.registrations,
      getRegistartionByUserId: state.getRegistartionByUserId,
    }));

  useEffect(() => {
    if (user && user.id) {
      getRegistartionByUserId(user.id);
    }
  }, [user, regData, getRegistartionByUserId]);

  useEffect(() => {
    setRegData(registrations); // Set registration data after fetching
  }, [registrations]);
  console.log("redistration", registrations);
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex justify-center items-start p-8 pt-20">
        <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-2xl font-semibold text-red-500 mb-6 mt-5">
            Events
          </h1>
          {user ? (
            <>
              <table>
                <thead>
                  <tr>
                    <th>Event Name</th>
                    <th>Venue</th>
                    <th>Start Time</th>
                    <th>Status</th>
                    <th>Judge</th>
                  </tr>
                </thead>
                <tbody>
                  {regData && regData.length > 0 ? (
                    regData.map((data, index) => (
                      <tr>
                        <td>{data.event?.eventName}</td>
                        <td>{data.event?.venue}</td>
                        <td>{data.event?.startDateTime}</td>
                        <td>{data.event?.status ? "Open" : "Close"}</td>
                        <td>
                          <Link
                            href={{
                              pathname: `/judge/events/${data?.event?.id}`,
                            }}
                          >
                            <button>
                              <ForwardIcon className="h-8 w-8 text-red-500 mt-4 animate-bounce" />
                            </button>
                          </Link>
                        </td>
                    
                      </tr>
                    ))
                  ) : (
                    <p>No registrations available</p>
                  )}
                </tbody>
              </table>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserEvents;
