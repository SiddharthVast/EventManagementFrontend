"use client";
import React, { useState } from "react";
import Image from "next/image";
import whereToFindUs from "../../public/WhereToFindUs.jpg";
import * as Yup from "yup";
import useContactUsStore, { Contact } from "@/store/contactusStore";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// import Loading from "../loading";

const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  mobileNumber: Yup.string()
    .matches(/^\d{10}$/, "Mobile Number must be exactly 10 digits")
    .required("Mobile Number is required"),
  message: Yup.string().required("Message is required"),
});

const ContactUsPage = () => {
  const contactUs = useContactUsStore((state) => state.handleContactSubmission);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Contact>({
    resolver: yupResolver(schema),
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);

  const onSubmitHandler = async (data: Contact) => {
    setLoader(true); // Start loader
    try {
      await contactUs(data);
      setSuccess("Contact Us Form Submitted Successfully!");
      setError("");
      reset();
      alert("Form Submitted Successfully!");
      router.push("/");
    } catch (error) {
      setError("Failed to Submit Contact Us Form");
      setSuccess("");
      alert("Form Submission Failed!");
    } finally {
      setLoader(false); // Stop loader
    }
  };

  return (
    <div className="main-div">
      <div className="input-form-div">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className=" text-red-600 text-2xl font-bold mb-6 text-left">
              Contact Us
            </h2>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  {...register("name")}
                  placeholder="Enter Your Name"
                />
                {errors.name && (
                  <p className="text-red-500 mt-1"> {errors.name.message}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  {...register("email")}
                  placeholder="Enter Your Email"
                />
                {errors.email && (
                  <p className="text-red-500 mt-1">{errors.email.message}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Phone Number
                </label>
                <input
                  type="text"
                  {...register("mobileNumber")}
                  placeholder="Enter Your Phone Number"
                />
                {errors.mobileNumber && (
                  <p className="text-red-500 mt-1">
                    {errors.mobileNumber.message}
                  </p>
                )}
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  {...register("message")}
                  rows={5}
                  placeholder="Your Message"
                />
                {errors.message && (
                  <p className="text-red-500 mt-1">{errors.message.message}</p>
                )}
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={loader}
                  className={`w-1/2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors ${
                    loader ? "cursor-not-allowed opacity-50" : ""
                  }`}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div>
            <h2 className=" text-red-600 text-2xl  font-bold mb-6 text-left">
              Where to Find Us
            </h2>
            <div className="mb-4">
              <Image
                src={whereToFindUs}
                alt="Map"
                className="w-full h-auto rounded-md"
              />
            </div>
            <div>
              <p className="text-sm mb-4">Get in touch</p>
              <p className="text-sm mb-4">
                You can find our offices located in the heart of the town
                center.
              </p>
              <address className="text-sm not-italic mb-4">
                301,
                <br />
                Chandravarsha, above SBI,
                <br />
                Sus Road, Pashan,
                <br />
                Pune 411021.
              </address>
              <p className="text-sm mb-4">+91-9821348455 (India)</p>
              <p className="text-sm">tanveera@valueaddsofttech.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
