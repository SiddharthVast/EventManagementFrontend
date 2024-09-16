"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter, useSearchParams } from "next/navigation";
import useUserStore from "@/store/userStore";
import { useUser } from "../context/UserContext";

const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
  mobileNumber: yup.string().required("Mobile Number is required"),
  details: yup.string(),
  role: yup.string(),
});

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  mobileNumber: string;
  details?: string;
  role?: string;
}

interface Props {
  params: {
    eventId: string;
  };
}

const AddUserByAdmin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role");
  const { user, logout } = useUser();
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
        role: role || "student",
        collegeId: user.college.id,
      };
      await addUser(userData);
      alert(`${role} Added successfully...`);
      if (role === "admin") router.push("/superadmin");
      else router.push("/admin");
    } catch (error) {}
  };

  return (
    <div className="main_div">
      <div className="input_form_div">
        <h1 className="text-2xl font-semibold text-red-500 mb-6">Add {role}</h1>
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
              <p className="text-red-500 mt-1">{errors.mobileNumber.message}</p>
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

export default AddUserByAdmin;
