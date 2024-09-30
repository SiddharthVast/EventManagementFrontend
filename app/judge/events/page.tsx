"use client";
import React, { useEffect, useState } from "react";
import useUserEventRegistrationStore, {
  UserEventRegistration,
} from "@/store/user_event_registrationStore";
import useLoginStore from "@/store/loginStore";
import { ForwardIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const UserEvents = () => {
  const { user } = useLoginStore((state) => ({
    user: state.user,
  }));
  const [regData, setRegData] = useState<UserEventRegistration[] | null>(null);

  const { registrations, getRegistartionByUserId } =
    useUserEventRegistrationStore((state) => ({
      registrations: state.registrations,
      getRegistartionByUserId: state.getRegistartionByUserId,
    }));

  useEffect(() => {
    if (user && user.id) {
      getRegistartionByUserId(user.id);
    }
  }, [user, getRegistartionByUserId]);

  useEffect(() => {
    setRegData(registrations);
  }, [registrations]);

  return (
    <div className="main-div">
      <div className="show-form-div">
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
                  regData
                    .filter(data => data.event?.status)
                    .map((data) => (
                      <tr key={data.id}>
                        <td>{data.event?.eventName}</td>
                        <td>{data.event?.venue}</td>
                        <td>{data.event?.startDateTime}</td>
                        <td>{data.event?.status ? "Open" : "Close"}</td>
                        <td>
                          <Link
                            href={{
                              pathname: `/judge/events/${data.event?.id}`,
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
                  <tr>
                    <td colSpan={5}>No registrations available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default UserEvents;
