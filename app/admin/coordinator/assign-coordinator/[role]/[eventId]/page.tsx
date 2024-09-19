"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/userStore";
import useEventStore from "@/store/eventStore";
import useUserEventRegistartionStore from "@/store/user_event_registrationStore";
// import { useUser } from "../../../../../context/UserContext";
import useLoginStore from "@/store/loginStore";

import { XMarkIcon } from "@heroicons/react/24/solid";

// Define the schema for form validation
const schema = yup.object().shape({
  userId: yup.number().required("Coordinator is required"),
});

interface Props {
  params: {
    eventId: string;
    role: string;
  };
}

const AssignCoordinatorForm = ({ params: { eventId, role } }: Props) => {
  const router = useRouter();
  // const { user } = useUser();
  const { user } = useLoginStore((state) => ({
    user: state.user,
  }));
  const { getEventById, event } = useEventStore((state) => ({
    getEventById: state.getEventById,
    event: state.event,
  }));

  const { users, getUserByCidRole } = useUserStore((state) => ({
    users: state.users,
    getUserByCidRole: state.getUserByCidRole,
  }));

  const { addRegistration } = useUserEventRegistartionStore((state) => ({
    addRegistration: state.addRegistration,
  }));

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    getEventById(+eventId);
    if (user && user.collegeId) {
      getUserByCidRole(user.collegeId, role);
    }
  }, [user, getEventById, getUserByCidRole]);

  const onSubmitHandler = (data: { userId: number }) => {
    if (!user) {
      console.error("User is not available");
      return;
    }
    addRegistration({ ...data, eventId: parseInt(eventId) });
    reset();
    router.push(`/admin/events/view-event/${event.festival.id}`);
  };

  return (
    <div className=".main-div">
      <div className="input-form-div">
        <button
          type="button"
          onClick={() =>
            router.push(`/admin/events/view-event/${event.festival.id}`)
          }
          className="absolute top-4 right-4"
        >
          <XMarkIcon className="h-6 w-6 text-gray-500 hover:text-gray-700" />
        </button>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <h2 className="text-2xl font-semibold mb-6">
            Assign {role} for Event
          </h2>
          <div className="mb-4">
            <label htmlFor="userId" className="font-medium mb-2 block">
              Select {role}:
            </label>
            <select
              {...register("userId")}
              className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded px-3 py-2 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            >
              <option value="">Select a {role}</option>
              {users
                .filter((user) => user.role === role)
                .map((user) => (
                  <option key={user.id} value={user.id}>
                    {`${user.firstName} ${user.lastName}`}
                  </option>
                ))}
            </select>
            {errors.userId && (
              <p className="text-red-500 text-xs italic">
                {errors.userId.message}
              </p>
            )}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded flex space-x-2 justify-center"
            >
              Assign {role}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignCoordinatorForm;
