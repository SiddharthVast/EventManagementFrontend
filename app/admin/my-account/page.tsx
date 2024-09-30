"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import useLoginStore from "@/store/loginStore";
import { useRouter } from "next/navigation";
import { XMarkIcon } from "@heroicons/react/24/solid";
import useUserStore, { UserData } from "@/store/userStore";
import useEventStore from "@/store/eventStore";
import { toast } from "react-toastify";

const MAX_FILE_SIZE = 1024 * 1024 * 5; // 5MB
const ACCEPTED_IMAGE_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png"];

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
    details: yup.string().required("Details are required"),
    imageUrl: yup
        .mixed<FileList | string>()
        .required()
        .test("fileRequired", "Image file is required", (value) => {
            if (!value || (value instanceof FileList && value.length === 0)) return false;
            return true;
        })
        .test("fileType", "Only .jpg, .jpeg, and .png formats are supported.", (value) => {
            if (!value || !(value instanceof FileList)) return false;
            const files = Array.from(value);
            return files.every((file) => ACCEPTED_IMAGE_MIME_TYPES.includes(file.type));
        })
        .test("fileSize", "Max image size is 5MB.", (value) => {
            if (!value || !(value instanceof FileList)) return false;
            const files = Array.from(value);
            return files.every((file) => file.size <= MAX_FILE_SIZE);
        }),
});

const UpdateAdminForm = () => {
    const router = useRouter();
    const { user } = useLoginStore((state) => ({
        user: state.user,
    }));
    const { updateUser } = useUserStore();
    const uploadImageToCloudinary = useEventStore(
        (state) => state.uploadImageToCloudinary
    );
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (user) {
            setValue("firstName", user.firstName);
            setValue("lastName", user.lastName);
            setValue("email", user.email);
            setValue("password", user.password);
            setValue("mobileNumber", user.mobileNumber);
            setValue("details", user.details);
        }
    }, [user, setValue]);


    const onSubmitHandler: SubmitHandler<UserData> = async (formData) => {
        try {
            if (!user || !user.id || user.college?.id === 0) {
                throw new Error("User is not logged in or college data is invalid");
            }
            const imageFiles = formData.imageUrl as unknown as FileList;
            if (imageFiles && imageFiles[0] instanceof File) {
                const file = imageFiles[0];
                const imageUrl = await uploadImageToCloudinary(file);
                formData.imageUrl = imageUrl;
            }
            const { confirmPassword, ...updatedData } = formData;
            const userData = {
                ...updatedData,
                id: user.id,
                role: "admin",
            };
            await updateUser(userData);
            toast.success("Your details are updated successfully!");
            router.push("/admin");
            reset();
        } catch (error) {
            toast.error("Error updating your details. Please try again.");
        }
    };

    return (
        <div className="main-div">
            <div className="input-form-div">
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
                    onClick={() => router.back()}
                >
                    <XMarkIcon className="h-6 w-6" />
                </button>
                <h1 className="form-heading">Update Details</h1>
                <form onSubmit={handleSubmit(onSubmitHandler)}>
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
                        <label>
                            Profile Photo
                        </label>
                        <input
                            type="file"
                            {...register("imageUrl")}
                        />
                        {errors.imageUrl && (
                            <p className="text-red-500 mt-1">{errors.imageUrl.message}</p>
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

export default UpdateAdminForm;
