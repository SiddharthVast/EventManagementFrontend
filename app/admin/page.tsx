import Link from "next/link";
import AdminSummerImage from "../../public/JpgAdminSummerImage.jpg";
import Image from "next/image";
import MusicConnection from "../../public/AdminMusicNightImage.jpg";

const Admin = () => {
  return (
    <div className="flex pt-32">
      <div className="w-3/4 bg-white p-4">
        <h1 className="text-xl font-bold mb-6 text-left">
          Welcome To Event Management System
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
              href={`/admin/my-account`}
              className="block w-full bg-red-700 text-white text-lg py-5 px-4"
            >
              My Account
            </Link>
          </li>
        </ul>
      </div>
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
          <div>
            <Image
              src={MusicConnection}
              alt="Music Connection"
              className="w-full h-80 object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;