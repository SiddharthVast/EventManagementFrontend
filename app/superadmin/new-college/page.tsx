"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useCollegeStore, { CollegeData } from "../../../store/collegeStore";
import { XMarkIcon } from "@heroicons/react/24/solid";

const schema = yup.object().shape({
  collegeName: yup.string().required("College Name is required"),
  number: yup
    .string()
    .matches(
      /^[a-zA-Z]{3}\d{7}$/,
      "Registration Number must start with 3 alphabetic characters followed by 7 digits"
    )
    .required("Registration Number is required"),
  emailId: yup.string().email("Invalid email").required("Email is required"),
  address: yup.string().required("Address is required"),
});

const AddCollege = () => {
  const router = useRouter();
  const addCollege = useCollegeStore((state) => state.addCollege);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CollegeData>({
    resolver: yupResolver(schema),
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const onSubmitHandler = async (data: CollegeData) => {
    try {
      await addCollege(data);
      setSuccess("College added successfully!");
      setError("");
      reset();
      router.push("/superadmin");
    } catch (err) {
      setError("Failed to add college");
      setSuccess("");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex justify-center items-start p-8 pt-20">
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8 relative">
          <button
            onClick={() => router.push("/superadmin")}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
          <div className="w-full">
            <h2 className="text-2xl font-semibold text-red-500 mb-6">
              ADD COLLEGE
            </h2>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  College Name
                </label>
                <input
                  type="text"
                  {...register("collegeName")}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter College Name"
                />
                {errors.collegeName && (
                  <p className="text-red-500 mt-1">
                    {errors.collegeName.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Registration Number
                </label>
                <input
                  type="text"
                  {...register("number")}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter Registration Number"
                />
                {errors.number && (
                  <p className="text-red-500 mt-1">{errors.number.message}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  {...register("emailId")}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter Email"
                />
                {errors.emailId && (
                  <p className="text-red-500 mt-1">{errors.emailId.message}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Address
                </label>
                <input
                  type="text"
                  {...register("address")}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter Address"
                />
                {errors.address && (
                  <p className="text-red-500 mt-1">{errors.address.message}</p>
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
              {success && <p className="text-green-500 mt-4">{success}</p>}
              {error && <p className="text-red-500 mt-4">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCollege;
