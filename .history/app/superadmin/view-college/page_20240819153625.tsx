// "use client";
// import React, { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import useCollegeStore from "../../../store/collegeStore";
// import useUserStore from "../../../store/userStore"; // Import the user store
// import Link from "next/link";

// const ViewCollege = () => {
//     const { colleges, getAllColleges } = useCollegeStore();
//     const { users, getAllUsers } = useUserStore(); // Destructure users and getAllUsers from the user store
//     const router = useRouter();

//     useEffect(() => {
//         getAllColleges();
//         getAllUsers(); // Fetch all users when the component loads
//     }, [getAllColleges, getAllUsers]);

//     const handleAddAdmin = (collegeId: number) => {
//         router.push(`/superadmin/add-admin/${collegeId}`);
//     };

//     return (
//         <div className="bg-gray-100 min-h-screen">
//             <div className="flex justify-center items-start p-8 pt-20">
//                 <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-8">
//                     <h1 className="text-2xl font-semibold text-red-500 mb-6">Our Registered Colleges</h1>
//                     <table className="min-w-full bg-white">
//                         <thead>
//                             <tr>
//                                 <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase">
//                                     College Name
//                                 </th>
//                                 <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase">
//                                     Reg. No.
//                                 </th>
//                                 <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase">
//                                     Email
//                                 </th>
//                                 <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase">
//                                     Address
//                                 </th>
//                                 <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase">
//                                     Admin List
//                                 </th>
//                                 <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase">
//                                     Admin
//                                 </th>
//                             </tr>
//                         </thead>
//                         <tbody> 
//                             {colleges.map((college) => (
//                                 <tr key={college.id}>
//                                     <td className="py-2 px-4 border-b border-gray-200 text-sm">
//                                         {college.collegeName}
//                                     </td>
//                                     <td className="py-2 px-4 border-b border-gray-200 text-sm">
//                                         {college.number}
//                                     </td>
//                                     <td className="py-2 px-4 border-b border-gray-200 text-sm">
//                                         {college.emailId}
//                                     </td>
//                                     <td className="py-2 px-4 border-b border-gray-200 text-sm">
//                                         {college.address}
//                                     </td>
//                                     <td className="py-2 px-4 border-b border-gray-200 text-sm">
//                                         <td className="py-2 px-4 border-b border-gray-200 text-sm">
//                                             {users.filter(user => user.collegeId === String(college.id)).length > 0
//                                                 ? users
//                                                     .filter(user => user.collegeId === String(college.id))
//                                                     .map(user => `${user.firstName} ${user.lastName}`)
//                                                     .join(", ")
//                                                 : "NA"}
//                                         </td>

//                                     </td>
//                                     <td className="py-2 px-4 border-b border-gray-200 text-sm">
//                                         <Link href={`/superadmin/view-college/${college.id}`}>
//                                             <button
//                                                 className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
//                                             >
//                                                 Add
//                                             </button>
//                                         </Link>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ViewCollege;

// --------------------------------------------2nd Time:----------

"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useCollegeStore from "../../../store/collegeStore";
import useUserStore from "../../../store/userStore";
import Link from "next/link";

const ViewCollege = () => {
    const { colleges, getAllColleges } = useCollegeStore();
    const { users, getAllUsers } = useUserStore();
    // const router = useRouter();

    useEffect(() => {
        if (users.length === 0) {
            getAllUsers();
        }
        if (colleges.length === 0) {
            getAllColleges();
        }
    }, [getAllColleges, getAllUsers, users.length, colleges.length]);


    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="flex justify-center items-start p-8 pt-20">
                <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-8">
                    <h1 className="text-2xl font-semibold text-red-500 mb-6">Our Registered Colleges</h1>
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase">
                                    College Name
                                </th>
                                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase">
                                    Reg. No.
                                </th>
                                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase">
                                    Email
                                </th>
                                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase">
                                    Address
                                </th>
                                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase">
                                    Admin List
                                </th>
                                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase">
                                    Admin
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {colleges.map((college) => (
                                <tr key={college.id}>
                                    <td className="py-2 px-4 border-b border-gray-200 text-sm">
                                        {college.collegeName}
                                    </td>
                                    <td className="py-2 px-4 border-b border-gray-200 text-sm">
                                        {college.number}
                                    </td>
                                    <td className="py-2 px-4 border-b border-gray-200 text-sm">
                                        {college.emailId}
                                    </td>
                                    <td className="py-2 px-4 border-b border-gray-200 text-sm">
                                        {college.address}
                                    </td>
                                    <td className="py-2 px-4 border-b border-gray-200 text-sm">
                                        {users.filter(user => {
                                            console.log("Comparing:", user.college.id, "with", String(college.id));
                                            return user.college.id === (college.id);
                                        }).length > 0
                                            ? users
                                                .filter(user => user.college.id === (college.id))
                                                .map(user => `${user.firstName} ${user.lastName}`)
                                                .join(", ")
                                            : "NA"}

                                    </td>
                                    <td className="py-2 px-4 border-b border-gray-200 text-sm">
                                        <Link href={`/superadmin/view-college/${college.id}`}>
                                            <button
                                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                                            >
                                                Add
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ViewCollege;
