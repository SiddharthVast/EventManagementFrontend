import Image from "next/image";
import Link from "next/link";
import React from "react";
import AdminSummerImage from "../../public/JpgAdminSummerImage.jpg"; // Make sure to save your images in the public folder
import MusicConnection from "../../public/AdminMusicNightImage.jpg";

const SuperAdmin = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-3/4 bg-white p-4">
        <h1 className="text-xl font-bold mb-6">
          WELCOME TO EVENT MANAGEMENT SYSTEM
        </h1>
        <div className="button-container">
          <Link
            href="/superadmin/new-college"
            className="btn-main btn-add-new-college"
          >
            Add New College
          </Link>
          <Link
            href="/superadmin/view-college"
            className="btn-main btn-view-colleges"
          >
            View Colleges
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuperAdmin;
