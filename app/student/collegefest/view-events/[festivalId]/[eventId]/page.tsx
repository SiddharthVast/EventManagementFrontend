"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import useEventStore from "../../../../../../store/eventStore";
import useUserEventRegistartionStore from "../../../../../../store/user_event_registrationStore";
import useLoginStore from "@/store/loginStore";
import { XMarkIcon } from "@heroicons/react/24/solid";

interface GroupMember {
  firstName: string;
  lastName: string;
  email_id: string;
  mobileNumber: string;
}

interface Props {
  params: {
    festivalId: string;
    eventId: string;
  };
}

const EventInfo = ({ params: { festivalId, eventId } }: Props) => {
  const { event, getEventById } = useEventStore();
  const { addRegistration, checkRegistrationStatus } =
    useUserEventRegistartionStore();
  const { user } = useLoginStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [topic, setTopic] = useState("NA");
  const [groupName, setGroupName] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [groupMembers, setGroupMembers] = useState<GroupMember[]>([
    {
      firstName: "",
      lastName: "",
      email_id: "",
      mobileNumber: "",
    },
  ]);

  useEffect(() => {
    if (eventId) {
      getEventById(parseInt(eventId));
    }

    if (user && user.id && eventId) {
      checkRegistrationStatus(user.id, parseInt(eventId)).then((registered) => {
        setIsRegistered(registered);
      });
    }
  }, [eventId, user, getEventById, checkRegistrationStatus]);

  const handleMemberChange = (
    index: number,
    field: keyof GroupMember,
    value: string
  ) => {
    const updatedMembers = [...groupMembers];
    updatedMembers[index][field] = value;
    setGroupMembers(updatedMembers);
  };

  const handleAddMember = () => {
    setGroupMembers([
      ...groupMembers,
      { firstName: "", lastName: "", email_id: "", mobileNumber: "" },
    ]);
  };

  const handleRemoveMember = (index: number) => {
    const updatedMembers = groupMembers.filter((_, i) => i !== index);
    setGroupMembers(updatedMembers);
  };

  const handleSubmit = async () => {
    if (user && user.id) {
      const registrationData = {
        eventId: parseInt(eventId),
        userId: user.id,
        topic,
        groupName,
        // groupMembers: event.eventType !== "single" ? groupMembers : [],
      };
      await addRegistration(registrationData);
      setIsModalOpen(false);
      setTopic("NA");
      setGroupMembers([
        { firstName: "", lastName: "", email_id: "", mobileNumber: "" },
      ]); // Reset
      setIsRegistered(true);
    } else {
      alert("Please login to register for the event.");
    }
  };

  return (
    <div className="main-div">
      <h6 className="form-heading">Event Details</h6>
      <div className="border-b-2 border-gray-300 mb-4 relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 -top-2 bg-white px-2"></div>
      </div>

      <div className="flex flex-wrap md:flex-nowrap gap-4">
        <div className="w-full md:w-1/3">
          <Image
            src={
              typeof event.imageUrl === "string"
                ? event.imageUrl
                : event.eventName
            }
            alt={event.eventName || "Event"}
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
                <td className="p-2 pl-4 pr-4 font-bold">Event Name</td>
                <td className="p-2 pl-4 pr-4">{event.eventName}</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 pl-4 pr-4 font-bold">Event Type</td>
                <td className="p-2 pl-4 pr-4">{event.eventType}</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 pl-4 pr-4 font-bold">Members</td>
                <td className="p-2 pl-4 pr-4">{event.members}</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 pl-4 pr-4 font-bold">Venue</td>
                <td className="p-2 pl-4 pr-4">{event.venue}</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 pl-4 pr-4 font-bold">Start Date</td>
                <td className="p-2 pl-4 pr-4">
                  {new Date(event.startDateTime).toLocaleDateString("en-US", {
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
                <td className="p-2 pl-4 pr-4 font-bold">End Date</td>
                <td className="p-2 pl-4 pr-4">
                  {new Date(event.endDateTime).toLocaleDateString("en-US", {
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
                <td className="p-2 pl-4 pr-4 font-bold">Status</td>
                <td className="p-2 pl-4 pr-4">
                  {event.status ? "Open" : "Closed"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end mt-4">
        {!isRegistered ? (
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-600 text-white py-2 px-4 rounded mt-4"
          >
            Register
          </button>
        ) : (
          <button
            className="bg-gray-400 text-white py-2 px-4 rounded mt-4"
            disabled
          >
            Registered
          </button>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 w-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <button className="xmark-icon">
            <XMarkIcon className="w-6 h-6" />
          </button>
          <div className="bg-white p-6 rounded-lg shadow-lg min-w-96">
            {event.eventType != "sports " && (
              <>
                <h2 className="text-lg font-bold mb-4">Enter Your Topic </h2>
                <input
                  type="text"
                  className="border p-2 w-full mb-4"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </>
            )}
            {event.members != "single" && (
              <div className="bg-violet-100 p-2">
                <h2 className="text-md font-bold mb-4">
                  Enter Your Group Name
                </h2>
                <input
                  type="text"
                  className="border p-2 w-fit mb-4"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                />
                <h3 className="font-semibold mb-2">Group Members</h3>
                {groupMembers.map((member, index) => (
                  <div key={index} className="flex mb-2">
                    <input
                      type="text"
                      placeholder="First Name"
                      value={member.firstName}
                      onChange={(e) =>
                        handleMemberChange(index, "firstName", e.target.value)
                      }
                      className="border p-2 w-1/3 mr-2"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={member.lastName}
                      onChange={(e) =>
                        handleMemberChange(index, "lastName", e.target.value)
                      }
                      className="border p-2 w-1/3 mr-2"
                    />
                    <input
                      type="text"
                      placeholder="Email Id"
                      value={member.email_id}
                      onChange={(e) =>
                        handleMemberChange(index, "email_id", e.target.value)
                      }
                      className="border p-2 w-1/3"
                    />
                    <input
                      type="text"
                      placeholder="Mobile Number"
                      value={member.mobileNumber}
                      onChange={(e) =>
                        handleMemberChange(
                          index,
                          "mobileNumber",
                          e.target.value
                        )
                      }
                      className="border p-2 w-1/3"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveMember(index)}
                      className="text-red-500 ml-2"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={handleAddMember}
                  className="bg-blue-500 text-white py-1 px-3 rounded"
                >
                  Add Member
                </button>
              </div>
            )}

            <div className="flex justify-end mt-4">
              <button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
              >
                Submit
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gradient-to-r from-red-500 to-red-700 text-white py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ml-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventInfo;
