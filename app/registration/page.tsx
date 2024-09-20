"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter, useSearchParams } from "next/navigation";
import useUserStore from "@/store/userStore";
// import { useUser } from "../context/UserContext";
import useLoginStore from "@/store/loginStore";
import { XMarkIcon } from "@heroicons/react/24/solid";

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
  const { user } = useLoginStore((state) => ({
    user: state.user,
  }));
  // const { user, logout } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role");
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
    <div className="main-div">
      <div className="input-form-div">
        <button onClick={() => router.push("/admin")} className="xmark-icon">
          <XMarkIcon className="w-6 h-6" />
        </button>
        <h1 className="form-heading">Add {role}</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label>First Name</label>
            <input
              type="text"
              {...register("firstName")}
              placeholder="Enter First Name"
            />
            {errors.firstName && (
              <p className="text-red-500 mt-1">{errors.firstName.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label>Last Name</label>
            <input
              type="text"
              {...register("lastName")}
              placeholder="Enter Last Name"
            />
            {errors.lastName && (
              <p className="text-red-500 mt-1">{errors.lastName.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label>Email</label>
            <input
              type="email"
              {...register("email")}
              placeholder="Enter Email"
            />
            {errors.email && (
              <p className="text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label>Password</label>
            <input
              type="password"
              {...register("password")}
              placeholder="Enter Password"
            />
            {errors.password && (
              <p className="text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label>Mobile Number</label>
            <input
              type="text"
              {...register("mobileNumber")}
              placeholder="Enter Mobile Number"
            />
            {errors.mobileNumber && (
              <p className="text-red-500 mt-1">{errors.mobileNumber.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label>Details</label>
            <textarea {...register("details")} placeholder="Enter Details" />
            {errors.details && (
              <p className="text-red-500 mt-1">{errors.details.message}</p>
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

export default AddUserByAdmin;
