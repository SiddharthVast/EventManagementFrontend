"use client";
import React, { useEffect, useState } from "react";
import useFestivalStore, { Festival } from "../../../../store/festivalStore";
import Link from "next/link";
import Image from "next/image";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/16/solid";
import Loading from "@/app/loading";
import { toast } from "react-toastify";

import useLoginStore from "@/store/loginStore";
const ViewFestival = () => {
  const festivals = useFestivalStore((state) => state.festivals);
  const { getByCollege, deleteFestival, updateFestStatus } = useFestivalStore();
  const { user } = useLoginStore();
  const cid = user?.college?.id;
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFestival, setSelectedFestival] = useState<Festival | null>(null);

  useEffect(() => {
    if (cid) {
      const fetchData = async () => {
        await getByCollege(cid);
        setLoading(false);
      };
      fetchData();
    } else {
      setLoading(false);


    }
  }, [cid, getByCollege]);

  const handleDeleteClick = (festival: Festival) => {
    setSelectedFestival(festival);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedFestival) {
      await deleteFestival(selectedFestival.id);
      setIsModalOpen(false);
      setSelectedFestival(null);
      toast.success("Festival deleted successfully!");
    }
  };

  const getDateOnly = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const sortedFestivals = festivals
    ? [...festivals].sort((a, b) => getDateOnly(b.startDate).localeCompare(getDateOnly(a.startDate)))
    : [];

  return (
    <div className="main-div">
      {loading && <Loading />}
      {loading && <Loading />}
      {!loading && (
        <>
          <div className="show-form-div">
            <h3 className="text-2xl font-semibold text-red-500 mb-6 text-left">College Fest</h3>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Description</th>
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
                      className={`${festival.status && "bg-green-100 hover:bg-green-200"}`}
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
                          <Link href={`/admin/festivals/view-festival/${festival.id}`}>
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
                            onClick={() => handleDeleteClick(festival)}
                            className="text-red-500 hover:text-red-600"
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
                          <button
                            className="bg-gray-400 text-white py-1 px-3 rounded"
                            disabled
                          >
                            Closed
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="py-4 px-4 text-center text-sm text-gray-500">
                      No festivals found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
                <p>Are you sure you want to delete "{selectedFestival?.festivalTitle}"?</p>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={confirmDelete}
                    className="bg-red-500 text-white py-2 px-4 rounded mr-2"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="bg-gray-500 text-white py-2 px-4 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ViewFestival;
