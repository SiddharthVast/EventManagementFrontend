import Image from "next/image";
import Link from "next/link";
import React from "react";
import AdminSummerImage from "../../public/JpgAdminSummerImage.jpg";
const SuperAdmin = () => {
  return (
    <div className="flex pt-32">
      {/* Sidebar */}
      <div className="w-3/4 bg-white p-4">
        <h1 className="text-xl font-bold mb-6 text-left">
          Welcome To Event Management System
        </h1>
        <ul>
          <li className="mb-2">
            <Link
              href="/superadmin/college/new"
              className="block w-full bg-red-700 text-white text-lg py-5 px-4"
            >
              Add New College
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href="/superadmin/college"
              className="block w-full bg-red-700 text-white text-lg py-5 px-4"
            >
              View Colleges
            </Link>
          </li>
        </ul>
      </div>

      {/* Features Section */}
      <div className="w-1/4 bg-white p-4">
        <h2 className="text-lg font-bold mb-4">Features</h2>
        <div className="space-y-4">
          <div>
            <Image
              src={AdminSummerImage}
              alt="Summer Party"
              className="w-full h-80 object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdmin;
