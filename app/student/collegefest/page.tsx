"use client";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import useFestivalStore from "../../../store/festivalStore";
import useLoginStore from "../../../store/loginStore";

const CollegeFest = () => {
  const { festivals, getAllFestivals } = useFestivalStore();
  const { user } = useLoginStore();
  const collegeId = user?.college?.id;

  useEffect(() => {
    getAllFestivals();
  }, [getAllFestivals]);

  const filteredFestivals = festivals.filter(
    (festival) => festival.college.id === collegeId
  );

  return (
    <div className="main-div">
      <h1 className="form-heading">Collegefest</h1>
      <div className="border-b-2 border-gray-300 mb-4 relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 -top-2 bg-white px-2"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFestivals.map((festival) => (
          <div
            key={festival.id}
            className="border rounded-lg overflow-hidden shadow-lg"
          >
            <div className="w-full h-80 relative">
              <Image
                src={
                  typeof festival.imageUrl === "string"
                    ? festival.imageUrl
                    : "/defaultImage.jpg"
                }
                alt={festival.festivalTitle}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-bold">{festival.festivalTitle}</h2>
              <Link href={`/student/collegefest/${festival.id}`} legacyBehavior>
                <a className="text-blue-500">Read More</a>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollegeFest;
