import Link from "next/link";
import AdminSummerImage from "../../public/JpgAdminSummerImage.jpg";
import Image from "next/image";
import MusicConnection from "../../public/AdminMusicNightImage.jpg";

const Student = () => {
  return (
    <div className="main-div flex pt-36">
      <div className="input-form-div w-3/4 bg-white p-4">
        <h1 className="form-heading">Welcome to Event Management System</h1>
        <ul>
          <li className="mb-2">
            <Link
              href="/student/collegefest"
              className="block w-full bg-red-700 text-white text-lg py-5 px-4"
            >
              Collegefest
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href="/student/reg-events"
              className="block w-full bg-red-700 text-white text-lg py-5 px-4"
            >
              My Registered Events
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href="/student/my-account"
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

export default Student;
