"use client";
import React, { useEffect } from "react";
import useFestivalStore from "../../../../store/festivalStore";
import useUserStore from "../../../../store/userStore";
import Link from "next/link";
import Image from "next/image";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/16/solid";

const ViewFestival = () => {
  const festivals = useFestivalStore((state) => state.festivals);
  const { getAllFestivals } = useFestivalStore();
  const { users, getAllUsers } = useUserStore();
  const deleteFestival = useFestivalStore((state) => state.deleteFestival);

  useEffect(() => {
    if (users.length === 0) {
      getAllUsers();
    }
    if (festivals.length === 0) {
      getAllFestivals();
    }
  }, [getAllFestivals, getAllUsers, users.length, festivals.length]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex justify-center items-start p-8 pt-20">
        <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-2xl font-semibold text-red-500 mb-6 text-left">Techfest</h1>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Description</th>
                <th>Status</th>
                <th>Event</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {festivals.map((festival) => (
                <tr key={festival.id}>
                  <td className="py-2 px-4 border-b border-gray-200 text-sm text-left">
                    <Image
                      src={
                        typeof festival.imageUrl === "string"
                          ? festival.imageUrl
                          : festival.festivalTitle
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
                  <td className="py-2 px-4 border-b border-gray-200 text-sm text-center">
                    {festival.status ? "Open" : "Closed"}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 text-sm text-center">
                    <div className="flex space-x-2 justify-center">
                      <Link href={`/admin/events/add-event/${festival.id}`}>
                        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline">
                          Add
                        </button>
                      </Link>
                      <Link href={`/admin/events/view-event/${festival.id}`}>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline">
                          View
                        </button>
                      </Link>
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 text-sm text-center">
                    <div className="flex space-x-2 justify-center">
                      <Link
                        href={`/admin/festivals/view-festival/${festival.id}`}
                      >
                        <button>
                          <PencilSquareIcon className=" update-icon" />
                        </button>
                      </Link>
                      <button
                        onClick={() => deleteFestival(festival.id)}
                      >
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
    </div>
  );
};

export default ViewFestival;
