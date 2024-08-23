import Link from "next/link";
import AdminSummerImage from "../../public/JpgAdminSummerImage.jpg"; // Make sure to save your images in the public folder
import Image from "next/image";
import MusicConnection from "../../public/AdminMusicNightImage.jpg";
const Admin = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-3/4 bg-white p-4">
        <h1 className="text-xl font-bold mb-6">WELCOME TO EVENT MANAGEMENT SYSTEM</h1>
        <ul>
          <li className="mb-2">
            <Link href="/admin/add-festival" className="block w-full bg-red-700 text-white text-lg py-5 px-4">
              Add New Festival
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/add-event-program" className="block w-full bg-red-700 text-white text-lg py-5 px-4">
              View Festival
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/add-program-type" className="block w-full bg-red-700 text-white text-lg py-5 px-4">
              Add Event Program
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/add-theme" className="block w-full bg-red-700 text-white text-lg py-5 px-4">
              Add Volunteer
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/add-user" className="block w-full bg-red-700 text-white text-lg py-5 px-4">
              Add Student
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/event-report" className="block w-full bg-red-700 text-white text-lg py-5 px-4">
              Event Report
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/program-type-report" className="block w-full bg-red-700 text-white text-lg py-5 px-4">
              Program  Report
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/program-report" className="block w-full bg-red-700 text-white text-lg py-5 px-4">
              My Account
            </Link>
          </li>
        </ul>
      </div>

      {/* Features Section */}
      <div className="w-1/4 bg-white p-4">
        <h2 className="text-lg font-bold mb-4">FEATURES</h2>
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
