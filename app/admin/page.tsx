import Link from "next/link";
import AdminSummerImage from "../../public/JpgAdminSummerImage.jpg";
import Image from "next/image";
import MusicConnection from "../../public/AdminMusicNightImage.jpg";

const Admin = () => {
  return (
    <div className="main-div">
      <div className="input-form-div">
        <h1 className="text-xl font-bold mb-6">
          Welcome to Event Management System
        </h1>
        <ul>
          <li className="mb-2">
            <Link
              href="/admin/festivals/add-festival"
              className="block w-full bg-red-700 text-white text-lg py-5 px-4"
            >
              Add New Festival
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href="/admin/festivals/view-festival"
              className="block w-full bg-red-700 text-white text-lg py-5 px-4"
            >
              View Festival
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href={`/registration?role=coordinator`}
              className="block w-full bg-red-700 text-white text-lg py-5 px-4"
            >
              Add Coordinator
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href={`/registration?role=judge`}
              className="block w-full bg-red-700 text-white text-lg py-5 px-4"
            >
              Add Judge
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href="/program-type-report"
              className="block w-full bg-red-700 text-white text-lg py-5 px-4"
            >
              Event Report
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href="/program-report"
              className="block w-full bg-red-700 text-white text-lg py-5 px-4"
            >
              My Account
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Admin;
