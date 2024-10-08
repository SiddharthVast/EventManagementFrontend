"use client";
import React, { useEffect, useState } from "react";
import useCollegeStore from "../../../store/collegeStore";
import useUserStore from "../../../store/userStore";
import Link from "next/link";
import {
  UserPlusIcon,
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/16/solid";
import Loading from "@/app/loading";

const ViewCollege = () => {
  const { colleges, getAllColleges } = useCollegeStore();
  const { users, getAllUsers, deleteUser } = useUserStore();
  const deleteCollege = useCollegeStore((state) => state.deleteCollege);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await getAllUsers();
      await getAllColleges();
      setLoading(false);
    };
    fetchData();
  }, [getAllUsers, getAllColleges]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="main-div">
      <div className="show-form-div">
        <h1 className="text-2xl font-semibold text-red-500 mb-6">
          Our Registered Colleges
        </h1>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th>College Name</th>
              <th>Reg. No.</th>
              <th>Email</th>
              <th>Address</th>
              <th>Admin List</th>
              <th>Admin</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {colleges.map((college) => (
              <tr key={college.id}>
                <td>{college.collegeName}</td>
                <td>{college.number}</td>
                <td>{college.emailId}</td>
                <td>{college.address}</td>
                <td>
                  {users.filter((user) => user.college?.id === college.id)
                    .length > 0
                    ? users
                      .filter(
                        (user) =>
                          user.college?.id === college.id &&
                          user.role === "admin"
                      )
                      .map((user) => (
                        <div
                          key={user.id}
                          className="relative flex items-center justify-between"
                        >
                          <span className="bg-slate-100 px-4 py-2 m-1 flex items-center justify-between relative">
                            {user.firstName} {user.lastName}
                            <button
                              onClick={() => deleteUser(user.id)}
                              className="absolute top-0 right-0 mt-1 mr-1 text-red-600 hover:text-red-800"
                            >
                              <XMarkIcon className="w-3 h-3  cursor-pointer" />
                            </button>
                          </span>
                        </div>
                      ))
                    : "NA"}
                </td>
                <td>
                  <Link href={`/superadmin/admin/${college.id}`}>
                    <button>
                      <UserPlusIcon className="icon assign-icon" />
                    </button>
                  </Link>
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-sm text-center">
                  <div className="flex space-x-2 justify-center">
                    <Link href={`/superadmin/college/${college.id}`}>
                      <button>
                        <PencilSquareIcon className=" update-icon" />
                      </button>
                    </Link>
                    <button onClick={() => deleteCollege(college.id)}>
                      <TrashIcon className=" delete-icon" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewCollege;
