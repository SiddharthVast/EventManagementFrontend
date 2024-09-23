"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import useUserEventRegistartionStore from "@/store/user_event_registrationStore";
import usePointToJudgeStore from "@/store/pointsToJudgeStore";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";

const schema = yup.object().shape({
  totalScores: yup
    .array()
    .of(yup.number().required("Total score is required"))
    .required("At least one total score is required"),
  studentIds: yup
    .array()
    .of(yup.number().required("Student ID is required"))
    .required("At least one student ID is required"),
});

interface FormData {
  totalScores: number[];
  studentIds: number[];
}

interface Props {
  params: {
    eventId: string;
  };
}

const JudgePanel = ({ params: { eventId } }: Props) => {
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      totalScores: [],
      studentIds: [],
    },
  });

  const getRegByEidRole = useUserEventRegistartionStore(
    (state) => state.getRegByEidRole
  );
  const students = useUserEventRegistartionStore(
    (state) => state.registrations
  );

  const getPointsToJudge = usePointToJudgeStore((state) => state.getPointsById);
  const points = usePointToJudgeStore((state) => state.pointsToJudge);

  const updateUserEvntReg = useUserEventRegistartionStore(
    (state) => state.updateUserEvntReg
  );

  const [scores, setScores] = useState<{ [studentId: number]: number[] }>({});

  useEffect(() => {
    getRegByEidRole(+eventId, "student");
    getPointsToJudge(eventId);
  }, [eventId]);

  const handleScoreChange = (
    studentId: number,
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(event.target.value, 10) || 0;
    const newScores = {
      ...scores,
      [studentId]: scores[studentId]
        ? [...scores[studentId]]
        : Array(points.length).fill(0),
    };
    newScores[studentId][index] = value;
    setScores(newScores);
  };

  const calculateTotal = (studentId: number) => {
    return scores[studentId]?.reduce((total, score) => total + score, 0) || 0;
  };

  const onSubmit = async () => {
    try {
      const totalScores: number[] = [];
      const studentIds: number[] = [];

      students.forEach((student) => {
        const totalScore = calculateTotal(student.id);
        totalScores.push(totalScore);
        studentIds.push(student.id);
      });

      const regData = studentIds.map((id, index) => ({
        id,
        totalScores: totalScores[index],
      }));

      await updateUserEvntReg({ regData });

      // Clear the form after successful submission
      reset({
        totalScores: [],
        studentIds: [],
      });
      alert("Your feedback has been submitted successfully!");
      router.push("/judge/events");
    } catch (error) {
      console.error("Failed to update user event registration:", error);
    }
  };

  return (
    <div className="main-div p-4">
      <h1 className="form-heading">Event:{students[0]?.event.eventName}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Participants</th>
              <th className="px-4 py-2 border">Topic Name</th>
              {points.map((point, index) => (
                <th key={index} className="px-4 py-2 border">
                  {point.point}
                </th>
              ))}
              <th className="px-4 py-2 border">Total Points</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b bg-red-100">
                  {student.groupName !== "NA"
                    ? student.groupName + " " + "Group"
                    : `${student.user.firstName} ${student.user.lastName}`}
                </td>

                <td className="px-4 py-2 border text-center bg-red-50">
                  {student.topic}
                </td>
                {points.map((_, pointIndex) => (
                  <td key={pointIndex} className="px-4 py-2 border text-center">
                    <input
                      type="number"
                      value={
                        scores[student.id] && scores[student.id][pointIndex]
                          ? scores[student.id][pointIndex]
                          : ""
                      }
                      onChange={(e) =>
                        handleScoreChange(student.id, pointIndex, e)
                      }
                      className="w-full p-2 border border-gray-300 text-center"
                    />
                  </td>
                ))}
                <td className="px-4 py-2 border text-center">
                  {calculateTotal(student.id)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
      <div className="flex justify-end space-x-4 pt-4">
        <button type="submit" className="submit">
          Submit
        </button>
      </div>
    </div>
  );
};

export default JudgePanel;
