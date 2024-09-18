"use client";
import React, { useEffect } from "react";
import useFestivalStore, { Festival } from "../../../../store/festivalStore";
import Link from "next/link";
import Image from "next/image";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/16/solid";
import { useUser } from "../../../context/UserContext";

const ViewFestival = () => {
  const festivals = useFestivalStore((state) => state.festivals);
  const { getByCollege, deleteFestival, updateFestStatus } = useFestivalStore();
  const { user } = useUser();
  const cid = user?.college?.id;

  useEffect(() => {
    // Fetch festivals for a specific college ID
    if (cid) {
      getByCollege(cid);
    }
  }, [getByCollege, cid]);

  // Function to get the date without time
  const getDateOnly = (dateString: string) => {
    const date = new Date(dateString);
    // Return the date part only in YYYY-MM-DD format
    return date.toISOString().split("T")[0];
  };

  // Check if festivals are defined and sort them
  const sortedFestivals = festivals
    ? [...festivals].sort((a, b) => {
        const dateA = getDateOnly(a.startDate);
        const dateB = getDateOnly(b.startDate);
        return dateB.localeCompare(dateA); // Descending order
      })
    : [];

  return (
    <div className="main-div">
      {/* <div> */}
      <div className="w-full max-w-fit bg-white shadow-lg rounded-lg p-8">
        <h3 className="text-2xl font-semibold text-red-500 mb-6 text-left">
          College Fest
        </h3>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Description</th>
              {/* <th>Status</th> */}
              <th>Event</th>
              <th>Actions</th>
              <th>Completed</th>
            </tr>
          </thead>
          <tbody>
            {sortedFestivals.length ? (
              sortedFestivals.map((festival) => (
                <tr
                  key={festival.id}
                  className={`${
                    festival.status && "bg-green-100 hover:bg-green-200 "
                  }`}
                >
                  <td className="py-2 px-4 border-b border-gray-200 text-sm text-left">
                    <Image
                      src={
                        typeof festival.imageUrl === "string"
                          ? festival.imageUrl
                          : "/default-image.png"
                      }
                      alt={festival.festivalTitle}
                      width={50}
                      height={50}
                      className="object-cover"
                    />
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 text-sm text-center">
                    {festival.festivalTitle}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 text-sm">
                    {new Date(festival.startDate).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 text-sm">
                    {new Date(festival.endDate).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 text-sm text-center">
                    {festival.description}
                  </td>
                  {/* <td className="py-2 px-4 border-b border-gray-200 text-sm text-center">
                    {festival.status ? "Open" : "Closed"}
                  </td> */}
                  <td className="py-2 px-4 border-b border-gray-200 text-sm text-center">
                    <div className="flex space-x-2 justify-center">
                      <Link href={`/admin/events/view-event/${festival.id}`}>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline">
                          View
                        </button>
                      </Link>
                      {festival.status && (
                        <Link href={`/admin/events/add-event/${festival.id}`}>
                          <button
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                            disabled={!festival.status}
                          >
                            Add
                          </button>
                        </Link>
                      )}
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 text-sm text-center">
                    <div className="flex space-x-2 justify-center">
                      <Link
                        href={`/admin/festivals/view-festival/${festival.id}`}
                      >
                        <button
                          aria-label={`Edit ${festival.festivalTitle}`}
                          className="text-yellow-500 hover:text-yellow-600"
                          disabled={!festival.status}
                        >
                          <PencilSquareIcon className="update-icon" />
                        </button>
                      </Link>
                      <button
                        aria-label={`Delete ${festival.festivalTitle}`}
                        onClick={() => deleteFestival(festival.id)}
                        className="text-red-500 hover:text-red-600"
                        disabled={!festival.status}
                      >
                        <TrashIcon className="delete-icon" />
                      </button>
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 text-sm text-center">
                    {festival.status ? (
                      <button
                        onClick={() => updateFestStatus(festival.id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                      >
                        Complete
                      </button>
                    ) : (
                      <span className="text-gray-500">closed</span> // Placeholder for closed status
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={9}
                  className="py-4 px-4 text-center text-sm text-gray-500"
                >
                  No festivals found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* </div> */}
      </div>
    </div>
  );
};

export default ViewFestival;
