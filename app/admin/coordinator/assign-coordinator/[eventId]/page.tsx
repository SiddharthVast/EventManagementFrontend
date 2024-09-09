"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import useUserStore from "@/store/userStore";
import useUserEventRegistartionStore from "@/store/user_event_registrationStore";
import useEventStore from "@/store/eventStore";
import { XMarkIcon } from "@heroicons/react/24/solid";

const schema = yup.object().shape({
    userId: yup.number().required("Coordinator is required"),
});

interface Props {
    params: {
        eventId: string;
    };
}

const AssignCoordinatorForm = ({ params: { eventId } }: Props) => {
    const router = useRouter();
    const { users, getAllUsers } = useUserStore((state) => ({
        users: state.users,
        getAllUsers: state.getAllUsers,
    }));
    const addRegistration = useUserEventRegistartionStore((state) => state.addRegistration);
    const { event, getEventById } = useEventStore((state) => ({
        event: state.event,
        getEventById: state.getEventById,
    }));

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const [change, setChange] = useState("");

    useEffect(() => {
        reset();
    }, [change]);

    useEffect(() => {
        if (users.length === 0) {
            getAllUsers();
        }
    }, [getAllUsers, users.length]);

    useEffect(() => {
        if (eventId) {
            getEventById(parseInt(eventId));
        }
    }, [eventId, getEventById]);
    const onSubmitHandler = (data: { userId: number }) => {
        addRegistration({ ...data, eventId: parseInt(eventId) });
        reset();
        if (event?.festival?.id) {
            router.push(`/admin/events/view-event/${event.festival.id}`); // Redirect using the festival id
        }
    };

    return (
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="bg-gray-100 min-h-screen flex justify-center items-center"
      >
        <div className=" relative bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
          {/* Cross Icon at Top Right */}
          <button
            type="button"
            onClick={() => router.push("/admin/events/view-event")}
            className="absolute top-4 right-4"
          >
            <XMarkIcon className="h-6 w-6 text-gray-500 hover:text-gray-700" />
          </button>
          <h2 className="text-2xl font-semibold mb-6">
            Assign Coordinators for Event
          </h2>
          <div className="mb-4">
            <label htmlFor="userId" className="font-medium mb-2 block">
              Select Coordinator:
            </label>
            <select
              {...register("userId")}
              className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded px-3 py-2 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            >
              <option value="">Select a coordinator</option>
              {users
                .filter((user) => user.role === "coordinator")
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
          <div className=" flex justify-center">
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded flex space-x-2 justify-center"
            >
              Assign Coordinator
            </button>
          </div>
        </div>
      </form>
    );
};

export default AssignCoordinatorForm;
