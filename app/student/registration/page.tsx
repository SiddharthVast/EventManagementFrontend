"use client";
import useUserStore, { UserData } from "@/store/userStore";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { useRouter } from "next/navigation";


const scheme = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "First Name must be at least 2 characters")
    .max(50, "First Name must be less than 50 characters")
    .required("First Name is required"),
  lastName: Yup.string()
    .min(2, "Last Name must be at least 2 characters")
    .max(50, "Last Name must be less than 50 characters")
    .required("Last Name is required"),
  courseName: Yup.string(),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  mobileNumber: Yup.string()
    .matches(/^\d{10}$/, "Mobile Number must be exactly 10 digits")
    .required("Mobile Number is required"),
  confirmPassword: Yup.string().when("password", (password, field) =>
    password ? field.required().oneOf([Yup.ref("password")]) : field
  ),
});

const StudentRegistration = () => {
  const studentReg = useUserStore((state) => state.addUser);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserData>({
    resolver: yupResolver(scheme),
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const onSubmitHandler = async (data: UserData) => {
    try {
      await studentReg(data);
      setSuccess("Student Registered Successfully!");
      setError("");
      reset();
      router.push("/login");
    } catch (error) {
      setError("Failed to Register Student");
      setSuccess("");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-left">
          Student Registration
        </h2>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                FirstName
              </label>
              <input
                type="text"
                {...register("firstName")}
                className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter First Name"
              />
              {errors.firstName && (
                <p className="text-red-500 mt-1">{errors.firstName.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">LastName</label>
              <input
                type="text"
                {...register("lastName")}
                className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Last Name"
              />
              {errors.lastName && (
                <p className="text-red-500 mt-1">{errors.lastName.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                CourseName
              </label>
              <input
                type="text"
                {...register("courseName")}
                className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Course Name"
              />
              {errors.courseName && (
                <p className="text-red-500 mt-1">{errors.courseName.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="text"
                {...register("email")}
                className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Email"
              />
              {errors.email && (
                <p className="text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                {...register("password")}
                className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Password"
              />
              {errors.password && (
                <p className="text-red-500 mt-1">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                {...register("confirmPassword")}
                className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Password"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                MobileNumber
              </label>
              <input
                type="text"
                {...register("mobileNumber")}
                className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter MobileNumber"
              />
              {errors.mobileNumber && (
                <p className="text-red-500 mt-1">
                  {errors.mobileNumber.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Role</label>
              <select
                {...register("role")}
                className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="student">Student</option>
              </select>
              {errors.role && (
                <p className="text-red-500 mt-1">{errors.role.message}</p>
              )}
            </div>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentRegistration;
