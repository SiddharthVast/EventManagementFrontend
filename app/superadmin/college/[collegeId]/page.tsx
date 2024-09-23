"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useCollegeStore, { CollegeData } from "../../../../store/collegeStore";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  collegeName: yup.string().required("College Name is required"),
  number: yup
    .string()
    .matches(
      /^[a-zA-Z]{3}\d{7}$/,
      "Registration Number must start with 3 alphabetic characters followed by 7 digits"
    )
    .required("Registration Number is required"),
  emailId: yup.string().email("Invalid email").required("Email is required"),
  address: yup.string().required("Address is required"),
});
interface Props {
  params: {
    collegeId: string;
  };
}
const AddCollege = ({ params: { collegeId } }: Props) => {
  const router = useRouter();
  const addCollege = useCollegeStore((state) => state.addCollege);
  const { updateCollege, colleges } = useCollegeStore();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<CollegeData>({
    resolver: yupResolver(schema),
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (collegeId) {
      const collegeToEdit = colleges.find(
        (college) => college.id === parseInt(collegeId)
      );
      if (collegeToEdit) {
        setValue("collegeName", collegeToEdit.collegeName);
        setValue("number", collegeToEdit.number);
        setValue("emailId", collegeToEdit.emailId);
        setValue("address", collegeToEdit.address);
      }
    }
  }, [collegeId, colleges, setValue]);

  const onSubmitHandler = async (data: CollegeData) => {
    try {
      if (collegeId === "new") {
        await addCollege(data);
        toast.success("College added successfully!");
        reset();
      } else {
        await updateCollege(+collegeId, data);
        toast.success("College updated successfully!");
      }
      router.push("/superadmin");
    } catch (err) {
      toast.error("Error adding/updating college. Please try again.");
      setError("Error adding/updating college");
    }
  };

  return (
    <div className="main-div">
      <div className="input-form-div">
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8 relative">
          <button
            onClick={() => router.push("/superadmin")}
            className="xmark-icon"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
          <div className="w-full">
            <h2 className="form-heading">
              ADD COLLEGE
            </h2>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
              <div className="mb-4">
                <label>
                  College Name
                </label>
                <input
                  type="text"
                  {...register("collegeName")}
                  placeholder="Enter College Name"
                />
                {errors.collegeName && (
                  <p className="text-red-500 mt-1">
                    {errors.collegeName.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label>
                  Registration Number
                </label>
                <input
                  type="text"
                  {...register("number")}
                  placeholder="Enter Registration Number"
                />
                {errors.number && (
                  <p className="text-red-500 mt-1">{errors.number.message}</p>
                )}
              </div>
              <div className="mb-4">
                <label>
                  Email
                </label>
                <input
                  type="email"
                  {...register("emailId")}
                  placeholder="Enter Email"
                />
                {errors.emailId && (
                  <p className="text-red-500 mt-1">{errors.emailId.message}</p>
                )}
              </div>
              <div className="mb-4">
                <label>
                  Address
                </label>
                <input
                  type="text"
                  {...register("address")}
                  placeholder="Enter Address"
                />
                {errors.address && (
                  <p className="text-red-500 mt-1">{errors.address.message}</p>
                )}
              </div>
              <div className="flex justify-end space-x-4">
                <button className="reset" type="button" onClick={() => reset()}>
                  Reset
                </button>
                <button className="submit" type="submit">
                  Submit
                </button>
              </div>
              {success && <p className="text-green-500 mt-4">{success}</p>}
              {error && <p className="text-red-500 mt-4">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCollege;
