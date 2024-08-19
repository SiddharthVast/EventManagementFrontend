"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useCollegeStore, { CollegeData } from "../../../store/collegeStore";
import Image from "next/image";
import AdminSummerImage from '../../../public/JpgAdminSummerImage.jpg';
import SecondImage from '../../../public/AdminMusicNightImage.jpg';

const schema = yup.object().shape({
    collegeName: yup.string().required("College Name is required"),
    number: yup.string()
        .matches(/^[a-zA-Z]{3}\d{7}$/, "Registration Number must start with 3 alphabetic characters followed by 7 digits")
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
                <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8 flex">
                    <div className="w-2/3">
                        <h2 className="text-2xl font-semibold text-red-500 mb-6">ADD COLLEGE</h2>
                        <form onSubmit={handleSubmit(onSubmitHandler)}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">College Name</label>
                                <input
                                    type="text"
                                    {...register("collegeName")}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Enter College Name"
                                />
                                {errors.collegeName && (
                                    <p className="text-red-500 mt-1">{errors.collegeName.message}</p>
                                )}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Registration Number</label>
                                <input
                                    type="text"
                                    {...register("number")}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Enter Contact Number"
                                />
                                {errors.number && (
                                    <p className="text-red-500 mt-1">{errors.number.message}</p>
                                )}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
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
                                <label className="block text-gray-700 text-sm font-bold mb-2">Address</label>
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
                            <div className="flex justify-center"> {/* Center the buttons */}
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                                    type="submit"
                                >
                                    Submit
                                </button>
                                <button
                                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="reset"
                                >
                                    Reset
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="w-1/3 ml-4">
                        <Image
                            src={AdminSummerImage}
                            className="w-full h-auto object-cover"
                            alt="College Image"
                        />
                        <Image
                            src={SecondImage}
                            className="w-full h-auto object-cover mt-4"
                            alt="Second College Image"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCollege;
