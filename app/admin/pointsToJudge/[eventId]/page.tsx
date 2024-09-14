"use client";
import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useRouter } from "next/navigation"; // Use only next/navigation
import usePointToJudgeStore from "@/store/pointsToJudgeStore";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TrashIcon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/16/solid";
import useEventStore from "@/store/eventStore";

// Define the schema with yup
const schema = yup.object().shape({
  points: yup
    .array()
    .of(
      yup.object().shape({
        point: yup.string().required("Point is required"),
      })
    )
    .required("At least one point is required"),
  eventId: yup.number().required("Event Id is required"),
});

interface Point {
  point: string;
}

interface FormData {
  points: Point[];
  eventId: number;
}

interface Props {
  params: {
    eventId: string;
  };
}

const AddPointsForm = ({ params: { eventId } }: Props) => {
  const router = useRouter();
  const [eventName, setEventName] = useState<string | null>(null);

  const { addPoints } = usePointToJudgeStore();
  const pointsToJudge = usePointToJudgeStore((state) => state.pointsToJudge);
  const pointToJudge = usePointToJudgeStore((state) => state.pointToJudge);
  const getPointsById = usePointToJudgeStore((state) => state.getPointsById);
  const deletePointToJudge = usePointToJudgeStore((state) => state.deletePoint);
  const { event, getEventById } = useEventStore((state) => ({
    event: state.event,
    getEventById: state.getEventById,
  }));

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    getPointsById(eventId);
    getEventById(+eventId);
    pointsToJudge;
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get("name");
    setEventName(name);
  }, []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      points: [{ point: "" }],
      eventId: parseInt(eventId, 10),
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "points",
    control,
  });

  // Handle form submission
  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError(null);
    try {
      await addPoints(
        data.points.map((point) => ({
          ...point,
          eventId: data.eventId, // Ensure eventId is included for each point
        }))
      );
      // Clear the form after successful submission
      reset({
        points: [{ point: "" }],
        eventId: parseInt(eventId, 10),
      });
    } catch (error) {
      console.error("Failed to add points:", error);
      setError("Failed to add points. Please try again.");
    } finally {
      getPointsById(eventId);
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="relative max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <button
          type="button"
          onClick={() =>
            router.push(`/admin/events/view-event/${event.festival.id}`)
          }
          className="absolute top-4 right-4"
        >
          <XMarkIcon className="h-6 w-6 absolute -right-2 text-gray-500 hover:text-gray-700" />
        </button>
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold text-white bg-red-800 p-2 rounded-md">
            {eventName}
          </h1>
        </div>
        <h2 className="text-xl font-semibold text-red-500 mb-6">Add Points</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {fields.map((field, index) => (
            <div key={field.id} className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Skill Set {index + 1}
              </label>
              <input
                type="text"
                {...register(`points.${index}.point` as const)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter Point to Judge"
              />
              {errors.points?.[index]?.point && (
                <p className="text-red-500 mt-1">
                  {errors.points[index].point?.message}
                </p>
              )}
              <button
                type="button"
                className="text-red-500 mt-2"
                onClick={() => remove(index)}
              >
                Remove Point
              </button>
            </div>
          ))}

          <div className="flex justify-between mb-4">
            <button
              type="button"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => append({ point: "" })}
              disabled={fields.length >= 5} // Disable if there are already 5 points
            >
              Add Another Point
            </button>
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <div className="flex justify-end space-x-4">
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() =>
                reset({
                  points: [{ point: "" }],
                  eventId: parseInt(eventId, 10),
                })
              }
            >
              Reset
            </button>
            <button className="submit" type="submit">
              Submit
            </button>
          </div>

          <table>
            <thead>
              <tr>
                <th>Point</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pointsToJudge.map((ptj) => (
                <tr>
                  <td>{ptj.point}</td>
                  <td>
                    <button onClick={() => deletePointToJudge(ptj.id)}>
                      <TrashIcon className="icon delete-icon" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>
        {/* <button
          onClick={() =>
            router.push(`/admin/events/view-event/${event.festival.id}`)
          }
        >
          Done
        </button> */}
      </div>
    </div>
  );
};

export default AddPointsForm;
