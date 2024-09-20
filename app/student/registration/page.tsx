"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/userStore";
import useCollegeStore from "@/store/collegeStore";
import { toast } from "react-toastify";
// Define validation schema
const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
  mobileNumber: yup.string().required("Mobile Number is required"),
  details: yup.string(),
  collegeId: yup
    .number()
    .required("College is required")
    .typeError("College must be a number"), // Update to number
});

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  mobileNumber: string;
  details?: string;
  collegeId: number; // Update to number
}

const AddStudent = () => {
  const router = useRouter();
  const { addUser } = useUserStore();
  const { getAllColleges, colleges } = useCollegeStore((state) => ({
    colleges: state.colleges,
    getAllColleges: state.getAllColleges,
  }));
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    // Fetch colleges data
    getAllColleges();
  }, []);
  const onSubmit = async (data: FormData) => {
    try {
      // Append the role as "student" and include collegeId in the user data
      const userData = {
        ...data,
        role: "student",
      };

      await addUser(userData);
      toast.success(`Registration successful!!`);
      router.push("/login");
    } catch (error) {
      toast.error(`Error registering student. Please try again.`);
      console.error("Failed to add register:", error);
    }
  };

  return (
    <div className="main-div">
      <div className="input-form-div">
        <h1 className="text-2xl font-semibold text-red-500 mb-6">Register</h1>
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
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              College
            </label>
            <select
              {...register("collegeId")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select College</option>
              {colleges.map((college) => (
                <option key={college.id} value={college.id}>
                  {college.collegeName}
                </option>
              ))}
            </select>
            {errors.collegeId && (
              <p className="text-red-500 mt-1">{errors.collegeId.message}</p>
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

export default AddStudent;
