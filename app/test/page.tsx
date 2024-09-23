"use client";
import { useEffect, useState } from "react";
import useLoginStore from "@/store/loginStore";
import useFestivalStore from "@/store/festivalStore";

const AddEvent = () => {
  const user = useLoginStore((state) => state.user);
  const fetchUser = useLoginStore((state) => state.fetchUser);
  const festival = useFestivalStore((state) => state.festival);
  const getByCollege = useFestivalStore((state) => state.getByCollege);

  useEffect(() => {
    fetchUser();
  }, []);
  useEffect(() => {
    if (user) {
      const collegeId = user?.college?.id ?? 0;
      getByCollege(collegeId);

      console.log("User is not null:", collegeId);
    } else {
      console.log("User is null or undefined");
    }
  }, [user]);

  const onSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("fest", festival);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <form onSubmit={onSubmitHandler}>
        <h1>College ID: {user?.college.id}</h1>
        <button type="submit">OK</button>
      </form>
    </div>
  );
};

export default AddEvent;
