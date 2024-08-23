// "use client";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useRouter } from "next/navigation";
// import * as yup from "yup";
// import { useState } from "react";
// import { SubmitHandler, useForm } from "react-hook-form";
// import useFestivalStore, { FestivalData } from "../../../store/festivalStore";
// import Image from "next/image";
// import AdminSummerImage from '../../../public/JpgAdminSummerImage.jpg';
// import SecondImage from '../../../public/AdminMusicNightImage.jpg';
// import useUserStore from "@/store/userStore";

// const schema = yup.object().shape({
//     festivalTitle: yup.string().required("Festival Title is required"),
//     startDate: yup.string().required("Start Date is required"),
//     endDate: yup.string().required("End Date is required"),
//     description: yup.string().required("Description is required"),
// });

// const AddFestival = () => {
//     const router = useRouter();
//     const addFestival = useFestivalStore((state) => state.addFestival);
//     const { user } = useUserStore(); // Fetch the logged-in user's details

//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//         reset,
//     } = useForm({
//         resolver: yupResolver(schema),
//     });

//     const [success, setSuccess] = useState("");
//     const [error, setError] = useState("");

//     const onSubmitHandler: SubmitHandler<{ festivalTitle: string; startDate: string; endDate: string; description: string; }> = async (formData) => {
//         console.log("Form data:", formData);
//         console.log("College ID:", user.college.id);
//         try {
//             // Attach the collegeId from the logged-in user to the festival data
//             // data.collegeId = user.college.id;

//             const festivalData: FestivalData = {
//                 ...formData,
//                 collegeId: user.college.id,
//             };
//             console.log("Festival data to be sent:", festivalData);
//             // Assume addFestival is a function that handles the festival creation logic
//             await addFestival(festivalData);
//             setSuccess("Festival added successfully!");
//             setError("");
//             reset();
//             router.push("/admin");
//         } catch (err) {
//             console.error("Error adding festival:", err);
//             setError("Failed to add festival");
//             setSuccess("");
//         }
//     };

//     return (
//         <div className="bg-gray-100 min-h-screen">
//             <div className="flex justify-center items-start p-8 pt-20">
//                 <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8 flex">
//                     <div className="w-2/3">
//                         <h2 className="text-2xl font-semibold text-red-500 mb-6">FESTIVAL REGISTRATION</h2>
//                         <form onSubmit={handleSubmit(onSubmitHandler)}>
//                             <div className="mb-4">
//                                 <label className="block text-gray-700 text-sm font-bold mb-2">Festival Title</label>
//                                 <input
//                                     type="text"
//                                     {...register("festivalTitle")}
//                                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                                     placeholder="Enter Festival Title"
//                                 />
//                                 {errors.festivalTitle && (
//                                     <p className="text-red-500 mt-1">{errors.festivalTitle.message}</p>
//                                 )}
//                             </div>
//                             <div className="mb-4">
//                                 <label className="block text-gray-700 text-sm font-bold mb-2">Festival Start Date</label>
//                                 <input
//                                     type="datetime-local"
//                                     {...register("startDate")}
//                                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                                 />
//                                 {errors.startDate && (
//                                     <p className="text-red-500 mt-1">{errors.startDate.message}</p>
//                                 )}
//                             </div>
//                             <div className="mb-4">
//                                 <label className="block text-gray-700 text-sm font-bold mb-2">Festival End Date</label>
//                                 <input
//                                     type="datetime-local"
//                                     {...register("endDate")}
//                                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                                 />
//                                 {errors.endDate && (
//                                     <p className="text-red-500 mt-1">{errors.endDate.message}</p>
//                                 )}
//                             </div>
//                             {/* <div className="mb-4">
//                                 <label className="block text-gray-700 text-sm font-bold mb-2">Photo</label>
//                                 <input
//                                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                                     type="file"
//                                 />
//                             </div> */}
//                             {/* <div className="mb-4">
//                                 <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
//                                 <textarea
//                                     {...register("description")}
//                                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                                     placeholder="Enter Description"
//                                     rows={4}
//                                 ></textarea>
//                                 {errors.description && (
//                                     <p className="text-red-500 mt-1">{errors.description.message}</p>
//                                 )}
//                             </div> */}
//                             <div className="flex justify-center">
//                                 <button
//                                     className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
//                                     type="submit"
//                                 >
//                                     Submit
//                                 </button>
//                                 <button
//                                     className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                                     type="reset"
//                                 >
//                                     Reset
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                     <div className="w-1/3 ml-4">
//                         <Image
//                             src={AdminSummerImage}
//                             className="w-full h-auto object-cover"
//                             alt="Event Poster"
//                         />
//                         <Image
//                             src={SecondImage}
//                             className="w-full h-auto object-cover mt-4"
//                             alt="Second Event Poster"
//                         />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AddFestival;

// --------------------------2nd time-----------------

// "use client";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useRouter } from "next/navigation";
// import * as yup from "yup";
// import { useState } from "react";
// import { SubmitHandler, useForm } from "react-hook-form";
// import useFestivalStore, { FestivalData } from "../../../store/festivalStore";
// import Image from "next/image";
// import AdminSummerImage from '../../../public/JpgAdminSummerImage.jpg';
// import SecondImage from '../../../public/AdminMusicNightImage.jpg';
// import useUserStore from "@/store/userStore";
// import useLoginStore from '@/store/loginStore';

// const schema = yup.object().shape({
//     festivalTitle: yup.string().required("Festival Title is required"),
//     startDate: yup.string().required("Start Date is required"),
//     endDate: yup.string().required("End Date is required"),
//     imageUrl: yup.string().required("Image is required"),
//     description: yup.string().required("Description is required"),
// });

// const AddFestival = () => {
//     const router = useRouter();
//     const addFestival = useFestivalStore((state) => state.addFestival);
//     const fetchUser = useLoginStore((state) => state.fetchUser); // Fetch method to get user data
//     const user = useUserStore.getState().user; // Get the initial user state

//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//         reset,
//     } = useForm({
//         resolver: yupResolver(schema),
//     });

//     const [success, setSuccess] = useState("");
//     const [error, setError] = useState("");

//     const onSubmitHandler: SubmitHandler<{ festivalTitle: string; startDate: string; endDate: string; imageUrl: File; description: string }> = async (formData) => {
//         try {

//             await fetchUser();
//             const user = useLoginStore.getState().user;
//             console.log("Current User:", user);

//             if (!user || !user.college || user.college.id === 0) {
//                 throw new Error("User is not logged in or college data is invalid");
//             }

//             const data = new FormData();
//         data.append('festivalTitle', formData.festivalTitle);
//         data.append('startDate', formData.startDate);
//         data.append('endDate', formData.endDate);
//         data.append('description', formData.description);
//         data.append('file', formData.imageUrl[0]); // Append file
//         data.append('collegeId', user.college.id.toString());

//             console.log("Submitting Festival Data:", data);

//             const res = await addFestival(festivalData);
//             console.log("API Response:", res);

//             setSuccess("Festival added successfully!");
//             setError("");
//             reset();
//             router.push("/admin");
//         } catch (err) {
//             console.error("Error adding festival:", err);
//             setError("Failed to add festival");
//             setSuccess("");
//         }
//     };



//     return (
//         <div className="bg-gray-100 min-h-screen">
//             <div className="flex justify-center items-start p-8 pt-20">
//                 <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8 flex">
//                     <div className="w-2/3">
//                         <h2 className="text-2xl font-semibold text-red-500 mb-6">FESTIVAL REGISTRATION</h2>
//                         <form onSubmit={handleSubmit(onSubmitHandler)}>
//                             <div className="mb-4">
//                                 <label className="block text-gray-700 text-sm font-bold mb-2">Festival Title</label>
//                                 <input
//                                     type="text"
//                                     {...register("festivalTitle")}
//                                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                                     placeholder="Enter Festival Title"
//                                 />
//                                 {errors.festivalTitle && (
//                                     <p className="text-red-500 mt-1">{errors.festivalTitle.message}</p>
//                                 )}
//                             </div>
//                             <div className="mb-4">
//                                 <label className="block text-gray-700 text-sm font-bold mb-2">Festival Start Date</label>
//                                 <input
//                                     type="datetime-local"
//                                     {...register("startDate")}
//                                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                                 />
//                                 {errors.startDate && (
//                                     <p className="text-red-500 mt-1">{errors.startDate.message}</p>
//                                 )}
//                             </div>
//                             <div className="mb-4">
//                                 <label className="block text-gray-700 text-sm font-bold mb-2">Festival End Date</label>
//                                 <input
//                                     type="datetime-local"
//                                     {...register("endDate")}
//                                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                                 />
//                                 {errors.endDate && (
//                                     <p className="text-red-500 mt-1">{errors.endDate.message}</p>
//                                 )}
//                             </div>
//                             <div className="mb-4">
//                                 <label className="block text-gray-700 text-sm font-bold mb-2">Festival Image URL</label>
//                                 <input
//                                     type="file"
//                                     {...register("imageUrl")}
//                                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                                     placeholder="Enter Image URL"
//                                 />
//                                 {errors.imageUrl && (
//                                     <p className="text-red-500 mt-1">{errors.imageUrl.message}</p>
//                                 )}
//                             </div>
//                             <div className="mb-4">
//                                 <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
//                                 <textarea
//                                     {...register("description")}
//                                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                                     placeholder="Enter Description"
//                                     rows={4}
//                                 ></textarea>
//                                 {errors.description && (
//                                     <p className="text-red-500 mt-1">{errors.description.message}</p>
//                                 )}
//                             </div>
//                             <div className="flex justify-center">
//                                 <button
//                                     className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
//                                     type="submit"
//                                 >
//                                     Submit
//                                 </button>
//                                 <button
//                                     className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                                     type="reset"
//                                 >
//                                     Reset
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                     <div className="w-1/3 ml-4">
//                         <Image
//                             src={AdminSummerImage}
//                             className="w-full h-auto object-cover"
//                             alt="Event Poster"
//                         />
//                         <Image
//                             src={SecondImage}
//                             className="w-full h-auto object-cover mt-4"
//                             alt="Second Event Poster"
//                         />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// -----------extra:---------------------

// const data = new FormData();
// data.append('festivalTitle', data.festivalTitle);
// data.append('startDate', formData.startDate);
// data.append('endDate', formData.endDate);
// data.append('description', formData.description);
// data.append('file', formData.imageUrl); // Append file
// data.append('collegeId', user.college.id.toString());


// imageUrl: yup.mixed().required("Image is required"),
// imageUrl: yup
// .mixed()
// .required("Image is required")
// .test(
//     "fileType",
//     "Only .jpg, .jpeg, and .png formats are supported.",
//     (value) => {
//         const fileList = value as FileList;
//         if (!fileList || fileList.length === 0) return false;
//         const file = fileList[0]; // Get the first file
//         return ACCEPTED_IMAGE_MIME_TYPES.includes(file.type);
//     }
// )
// .test(
//     "fileSize",
//     "Max image size is 5MB.",
//     (value) => {
//         const fileList = value as FileList;
//         if (!fileList || fileList.length === 0) return false;
//         const file = fileList[0]; // Get the first file
//         return file.size <= MAX_FILE_SIZE;
//     }
// ),

// export default AddFestival;

// ------------------------3rd time--------------
"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useFestivalStore, { FestivalData } from "../../../store/festivalStore";
import Image from "next/image";
import AdminSummerImage from '../../../public/JpgAdminSummerImage.jpg';
import SecondImage from '../../../public/AdminMusicNightImage.jpg';
import useLoginStore from '@/store/loginStore';

const schema = yup.object().shape({
    festivalTitle: yup.string().required("Festival Title is required"),
    startDate: yup.string().required("Start Date is required"),
    endDate: yup.string().required("End Date is required"),
    description: yup.string().required("Description is required"),
});

const AddFestival = () => {
    const router = useRouter();
    const addFestival = useFestivalStore((state) => state.addFestival);
    const fetchUser = useLoginStore((state) => state.fetchUser);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FestivalData>({
        resolver: yupResolver(schema),
    });

    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const onSubmitHandler: SubmitHandler<FestivalData> = async (formData) => {
        try {
            await fetchUser();
            const user = useLoginStore.getState().user;

            if (!user || !user.college || user.college.id === 0) {
                throw new Error("User is not logged in or college data is invalid");
            }

            const data = new FormData();
            data.append('festivalTitle', formData.festivalTitle);
            data.append('startDate', formData.startDate);
            data.append('endDate', formData.endDate);
            data.append('description', formData.description);

            if (formData.imageUrl && formData.imageUrl.length > 0) {
                data.append('file', formData.imageUrl[0]);
            }
            data.append('collegeId', user.college.id.toString());

            console.log("Submitting Festival Data:", JSON.stringify(formData));

            const res = await addFestival(data as unknown as FestivalData);
            console.log(res);

            setSuccess("Festival added successfully!");
            setError("");
            reset();
            router.push("/admin");
        } catch (err) {
            console.error("Error adding festival:", err);
            setError("Failed to add festival");
            setSuccess("");
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="flex justify-center items-start p-8 pt-20">
                <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8 flex">
                    <div className="w-2/3">
                        <h2 className="text-2xl font-semibold text-red-500 mb-6">FESTIVAL REGISTRATION</h2>
                        <form onSubmit={handleSubmit(onSubmitHandler)}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Festival Title</label>
                                <input
                                    type="text"
                                    {...register("festivalTitle")}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Enter Festival Title"
                                />
                                {errors.festivalTitle && (
                                    <p className="text-red-500 mt-1">{errors.festivalTitle.message}</p>
                                )}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Festival Start Date</label>
                                <input
                                    type="datetime-local"
                                    {...register("startDate")}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                {errors.startDate && (
                                    <p className="text-red-500 mt-1">{errors.startDate.message}</p>
                                )}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Festival End Date</label>
                                <input
                                    type="datetime-local"
                                    {...register("endDate")}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                {errors.endDate && (
                                    <p className="text-red-500 mt-1">{errors.endDate.message}</p>
                                )}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Festival Image</label>
                                <input
                                    type="file"
                                    {...register("imageUrl")}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                {errors.imageUrl && (
                                    <p className="text-red-500 mt-1">{errors.imageUrl.message}</p>
                                )}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                                <textarea
                                    {...register("description")}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Enter Description"
                                    rows={4}
                                ></textarea>
                                {errors.description && (
                                    <p className="text-red-500 mt-1">{errors.description.message}</p>
                                )}
                            </div>
                            <div className="flex justify-center">
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
                            alt="Event Poster"
                        />
                        <Image
                            src={SecondImage}
                            className="w-full h-auto object-cover mt-4"
                            alt="Second Event Poster"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddFestival;

