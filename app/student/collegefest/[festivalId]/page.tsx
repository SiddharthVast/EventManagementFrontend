"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import useFestivalStore from "../../../../store/festivalStore";

interface Props {
  params: {
    festivalId: string;
  };
}

const Collegefest = ({ params: { festivalId } }: Props) => {
  const { festival, getFestivalById } = useFestivalStore();

  useEffect(() => {
    if (festivalId) {
      getFestivalById(parseInt(festivalId));
    }
  }, [festivalId, getFestivalById]);

  return (
    <div className="main-div">
      <h1 className=" form-heading">Details of {festival.festivalTitle}</h1>
      <div className="border-b-2 border-gray-300 mb-4 relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 -top-2 bg-white px-2"></div>
      </div>

      <div className="flex flex-wrap md:flex-nowrap gap-4">
        <div className="w-full md:w-1/3">
          <Image
            src={
              typeof festival.imageUrl === "string"
                ? festival.imageUrl
                : festival.festivalTitle
            }
            alt={festival.festivalTitle || "Festival"}
            width={400}
            height={500}
            layout="responsive"
            objectFit="cover"
          />
        </div>
        <div className="w-full md:w-2/3 flex flex-col justify-between">
          <table className="w-full border-collapse text-lg">
            <tbody>
              <tr className="border-b">
                <td className="text-base p-4 font-bold">Festival Title</td>
                <td className="text-base p-4">
                  {festival.festivalTitle}
                  <Link
                    href={`/student/collegefest/view-events/${festival.id}`}
                    legacyBehavior
                  >
                    <a className="text-blue-500">(View Events)</a>
                  </Link>
                </td>
              </tr>
              <tr className="border-b">
                <td className="text-base p-4 font-bold">Start Date</td>
                <td className="text-base p-4">
                  {new Date(festival.startDate).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
              </tr>
              <tr className="border-b">
                <td className="text-base p-4 font-bold">End Date</td>
                <td className="text-base p-4">
                  {new Date(festival.endDate).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
              </tr>
              <tr className="border-b">
                <td className="text-base p-4 font-bold">Description</td>
                <td className="text-base p-4">{festival.description}</td>
              </tr>
              <tr className="border-b">
                <td className="text-base p-4 font-bold">Status</td>
                <td className="text-base p-4">
                  {festival.status ? "Active" : "Inactive"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Collegefest;
