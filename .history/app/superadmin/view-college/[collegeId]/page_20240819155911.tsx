"use client";
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import useUserStore from '../../../../store/userStore';

const schema = yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
    mobileNumber: yup.string().required("Mobile Number is required"),
    details: yup.string().required("Details are required"),
    role: yup.string(),
});

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    mobileNumber: string;
    details: string;
    role?: string;
}

interface Props {
    params: {
        collegeId: string;
    };
}

const AddAdminForm = ({ params: { collegeId } }: Props) => {
    const router = useRouter();
    const { addUser } = useUserStore(); // Destructure addUser from the store

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: FormData) => {
        try {
            // Prepare the data to be added
            const userData = {
                ...data,
                courseName: "", // Assuming courseName is not needed for admins
                collegeId: parseInt(collegeId),
                role: data.role || "admin", // Default to "admin" if role is not provided
            };

            // Call the addUser function from the store
            await addUser(userData);

            // Redirect to the view-college page or show success message
            router.push('/superadmin/view-college'); // Adjust this as needed
        } catch (error) {
            console.error('Failed to add admin:', error);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen p-8">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-2xl font-semibold text-red-500 mb-6">Add Admin</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
                        <Controller
                            name="firstName"
                            control={control}
                            render={({ field }) => (
                                <input
                                    type="text"
                                    {...field}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Enter First Name"
                                />
                            )}
                        />
                        {errors.firstName && <p className="text-red-500 mt-1">{errors.firstName.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
                        <Controller
                            name="lastName"
                            control={control}
                            render={({ field }) => (
                                <input
                                    type="text"
                                    {...field}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Enter Last Name"
                                />
                            )}
                        />
                        {errors.lastName && <p className="text-red-500 mt-1">{errors.lastName.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <input
                                    type="email"
                                    {...field}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Enter Email"
                                />
                            )}
                        />
                        {errors.email && <p className="text-red-500 mt-1">{errors.email.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <input
                                    type="password"
                                    {...field}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Enter Password"
                                />
                            )}
                        />
                        {errors.password && <p className="text-red-500 mt-1">{errors.password.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Mobile Number</label>
                        <Controller
                            name="mobileNumber"
                            control={control}
                            render={({ field }) => (
                                <input
                                    type="text"
                                    {...field}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Enter Mobile Number"
                                />
                            )}
                        />
                        {errors.mobileNumber && <p className="text-red-500 mt-1">{errors.mobileNumber.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Details</label>
                        <Controller
                            name="details"
                            control={control}
                            render={({ field }) => (
                                <textarea
                                    {...field}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Enter Details"
                                />
                            )}
                        />
                        {errors.details && <p className="text-red-500 mt-1">{errors.details.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Role</label>
                        <Controller
                            name="role"
                            control={control}
                            render={({ field }) => (
                                <select
                                    {...field}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                >
                                    <option value="">Select Role</option>
                                    <option value="admin">Admin</option>
                                    {/* Add other roles if necessary */}
                                </select>
                            )}
                        />
                        {errors.role && <p className="text-red-500 mt-1">{errors.role.message}</p>}
                    </div>
                    <div className="flex justify-end">
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                            type="submit"
                        >
                            Submit
                        </button>
                        <button
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={() => reset()}
                        >
                            Reset
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddAdminForm;
