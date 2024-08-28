"use client";
import React, { useEffect } from "react";
import useFestivalStore from "../../../store/festivalStore";
import useUserStore from "../../../store/userStore";
import Link from "next/link";
import Image from "next/image";

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
                    <h1 className="text-2xl font-semibold text-red-500 mb-6">Festivals</h1>
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase">
                                    Image
                                </th>
                                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase">
                                    Title
                                </th>
                                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase">
                                    Start Date
                                </th>
                                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase">
                                    End Date
                                </th>
                                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase">
                                    Description
                                </th>
                                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase">
                                    Status
                                </th>
                                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-center text-sm font-semibold text-gray-600 uppercase">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {festivals.map((festival) => (
                                <tr key={festival.id}>
                                    <td className="py-2 px-4 border-b border-gray-200 text-sm text-left">
                                        <Image
                                            src={typeof festival.imageUrl === 'string' ? festival.imageUrl : festival.festivalTitle}
                                            alt={festival.festivalTitle}
                                            width={50}
                                            height={50}
                                            className="object-cover"
                                        />
                                    </td>
                                    <td className="py-2 px-4 border-b border-gray-200 text-sm">
                                        {festival.festivalTitle}
                                    </td>
                                    <td className="py-2 px-4 border-b border-gray-200 text-sm">
                                        {new Date(festival.startDate).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
                                    </td>
                                    <td className="py-2 px-4 border-b border-gray-200 text-sm">
                                        {new Date(festival.endDate).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
                                    </td>
                                    <td className="py-2 px-4 border-b border-gray-200 text-sm">
                                        {festival.description}
                                    </td>
                                    <td className="py-2 px-4 border-b border-gray-200 text-sm">
                                        {festival.status ? 'Open' : 'Closed'}
                                    </td>
                                    <td className="py-2 px-4 border-b border-gray-200 text-sm text-center">
                                        <div className="flex space-x-2 justify-center">
                                            <Link href={`/admin/view-festival/${festival.id}`}>
                                                <button
                                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                                                >
                                                    Update
                                                </button>
                                            </Link>
                                            <button
                                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                                                onClick={() => deleteFestival(festival.id)}
                                            >
                                                Delete
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

