"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import useUserStore from "@/store/userStore";
import useUserEventRegistartionStore from "@/store/user_event_registrationStore";

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

    const onSubmitHandler = (data: { userId: number }) => {
        addRegistration({ ...data, eventId: parseInt(eventId) });
        reset();
        router.push("/admin/events/view-event");
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className="bg-gray-100 min-h-screen flex justify-center items-center"
        >
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
                <h2 className="text-2xl font-semibold mb-6">Assign Coordinators for Event</h2>
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
                        <p className="text-red-500 text-xs italic">{errors.userId.message}</p>
                    )}
                </div>
                <button
                    type="submit"
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                >
                    Assign Coordinator
                </button>
            </div>
        </form>
    );
};

export default AssignCoordinatorForm;
