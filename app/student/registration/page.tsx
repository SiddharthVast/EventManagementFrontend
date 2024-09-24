"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/userStore";
import useCollegeStore from "@/store/collegeStore";
import { toast } from "react-toastify";

// Updated Yup validation schema
const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  mobileNumber: yup.string().required("Mobile Number is required"),
  courseName: yup.string().required("Course Name is required"),
  details: yup.string(),
  collegeId: yup
    .number()
    .required("College is required")
    .typeError("College must be a number"),
});

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  mobileNumber: string;
  courseName: string;
  details?: string;
  collegeId: number;
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
    getAllColleges();
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
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
        <h1 className="form-heading">Register</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* First Name */}
          <div className="mb-4">
            <label>
              First Name
            </label>
            <input
              type="text"
              {...register("firstName")}
              placeholder="Enter First Name"
            />
            {errors.firstName && (
              <p className="text-red-500 mt-1">{errors.firstName.message}</p>
            )}
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label>
              Last Name
            </label>
            <input
              type="text"
              {...register("lastName")}
              placeholder="Enter Last Name"
            />
            {errors.lastName && (
              <p className="text-red-500 mt-1">{errors.lastName.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label>
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="Enter Email"
            />
            {errors.email && (
              <p className="text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label>
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              placeholder="Enter Password"
            />
            {errors.password && (
              <p className="text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label>
              Confirm Password
            </label>
            <input
              type="password"
              {...register("confirmPassword")}
              placeholder="Enter Confirm Password"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Mobile Number */}
          <div className="mb-4">
            <label>
              Mobile Number
            </label>
            <input
              type="text"
              {...register("mobileNumber")}
              placeholder="Enter Mobile Number"
            />
            {errors.mobileNumber && (
              <p className="text-red-500 mt-1">{errors.mobileNumber.message}</p>
            )}
          </div>

          {/* Course Name */}
          <div className="mb-4">
            <label>
              Course Name
            </label>
            <input
              type="text"
              {...register("courseName")}
              placeholder="Enter Course Name"
            />
            {errors.courseName && (
              <p className="text-red-500 mt-1">{errors.courseName.message}</p>
            )}
          </div>

          {/* Details */}
          <div className="mb-4">
            <label>
              Details
            </label>
            <textarea
              {...register("details")}
              placeholder="Enter Details"
            />
          </div>

          {/* College */}
          <div className="mb-4">
            <label>
              College
            </label>
            <select
              {...register("collegeId")}
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

          {/* Buttons */}
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

export default AddStudent;