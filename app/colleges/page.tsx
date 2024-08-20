"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import useCollegeStore from "@/stores/collegeStore";

interface College {
  id: number;
  collegeName: string;
  number: string;
  emailId: string;
  address: string;
}

const Colleges = () => {
  const { colleges, getAllColleges } = useCollegeStore((state) => ({
    colleges: state.colleges,
    getAllColleges: state.getAllColleges,
  }));

  useEffect(() => {
    getAllColleges();
  }, [getAllColleges]);

  return (
    <>
      <table className="table table-auto">
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {colleges?.map((college: College) => (
            <tr key={college.id}>
              <td>{college.collegeName}</td>
              <td>
                <Link href={`/colleges/${college.id}`}>
                  <button className="btn btn-outline btn-success btn-sm">
                    Update
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Colleges;
