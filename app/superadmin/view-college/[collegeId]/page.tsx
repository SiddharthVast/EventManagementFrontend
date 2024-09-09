"use client";
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import useUserStore from '../../../../store/userStore';
import { XMarkIcon } from '@heroicons/react/24/solid';

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
    const { addUser } = useUserStore();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: FormData) => {
        try {
            const userData = {
                ...data,
                courseName: "",
                collegeId: parseInt(collegeId),
                role: data.role || "admin",
            };

            await addUser(userData);
            router.push('/superadmin/view-college');
        } catch (error) {
            console.error('Failed to add admin:', error);
        }
    };

    return (
      <div className="bg-gray-100 min-h-screen p-8">
        <div className="relative max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
            onClick={() => router.back()} // You can change this action if needed
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
          <h1 className="text-2xl font-semibold text-red-500 mb-6">
            Add Admin
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                First Name
              </label>
              <input
                type="text"
                {...register("firstName")}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter First Name"
              />
              {errors.firstName && (
                <p className="text-red-500 mt-1">{errors.firstName.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Last Name
              </label>
              <input
                type="text"
                {...register("lastName")}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter Last Name"
              />
              {errors.lastName && (
                <p className="text-red-500 mt-1">{errors.lastName.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                {...register("email")}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter Email"
              />
              {errors.email && (
                <p className="text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                {...register("password")}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter Password"
              />
              {errors.password && (
                <p className="text-red-500 mt-1">{errors.password.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Mobile Number
              </label>
              <input
                type="text"
                {...register("mobileNumber")}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter Mobile Number"
              />
              {errors.mobileNumber && (
                <p className="text-red-500 mt-1">
                  {errors.mobileNumber.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Details
              </label>
              <textarea
                {...register("details")}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter Details"
              />
              {errors.details && (
                <p className="text-red-500 mt-1">{errors.details.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Role
              </label>
              <select
                {...register("role")}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
              </select>
              {errors.role && (
                <p className="text-red-500 mt-1">{errors.role.message}</p>
              )}
            </div>
            <div className="flex justify-end space-x-4">
              <button className="reset" type="button" onClick={() => reset()}>
                Reset
              </button>

              <button className="submit" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
};

export default AddAdminForm;
