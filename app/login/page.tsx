"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useLoginStore from "@/store/loginStore";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Modal from "../modal/modal";
import axios from "axios";
import Link from "next/link";
import Loading from "../loading";

interface FormValues {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(8).max(255).required(),
});

const resetPasswordSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
});

const Login = () => {
  const [loading, setLoading] = useState(false);
  const login = useLoginStore((state) => state.login);
  const fetchUser = useLoginStore((state) => state.fetchUser);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const {
    register: resetRegister,
    handleSubmit: handleResetSubmit,
    formState: { errors: resetErrors },
    reset: resetResetForm,
  } = useForm<{ email: string }>({
    resolver: yupResolver(resetPasswordSchema),
  });

  const [error, setError] = useState("");
  const [showResetModal, setShowResetModal] = useState(false);

  useEffect(() => {
  }, [loading]);
  const onSubmitHandler = async (data: FormValues) => {
    try {
      setLoading(true);
      await login(data);
      await fetchUser();
      const user = useLoginStore.getState().user;
      if (user?.role === "admin") {
        router.push("/admin");
      } else if (user?.role === "superadmin") {
        router.push("/superadmin");
      } else if (user?.role === "coordinator") {
        router.push("/coordinator");
      } else if (user?.role === "judge") {
        router.push("/judge/events");
      } else {
        router.push("/student/events");
      }
      reset();
    } catch (err) {
      setError("Invalid username or password");
    }
    finally {
      setLoading(false);
    }
  };

  const onSubmitResetEmail = async ({ email }: { email: string }) => {
    try {

      const response = await axios.post(
        "http://localhost:3000/users/request-password-reset",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("A reset link has been sent to your email.");
        setShowResetModal(false);
        resetResetForm();
      } else {
        alert("Failed to send reset email.");
      }
    } catch (err) {
      console.error("Error sending reset email:", err);
      alert("Error sending reset email.");
    }
  };

  const handleReset = () => {
    reset();
    setError("");
  };

  return (
    <div className="main-div h-screen flex items-center justify-center">
      {loading && <Loading />}
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md -mt-10">
        <h2 className="text-2xl font-bold mb-6 text-left">
          Login to Your Account
        </h2>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="text"
              {...register("email")}
              className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              {...register("password")}
              className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
            <div className="flex justify-end">

              <Link
                href="#"
                onClick={() => setShowResetModal(true)}
                className="text-blue-500 hover:underline text-sm mt-2 block"
              >
                Forgot Password?
              </Link>
            </div>
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="w-1/2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
              disabled={loading}
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="w-1/2 bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
            >
              Reset
            </button>
          </div>
        </form>
        <div className="flex flex-col items-center mt-6 space-y-2">

          <Link href="student/registration" className="text-blue-500 hover:underline">
            Don't have account? Register
          </Link>

        </div>
      </div>

      {showResetModal && (
        <Modal onClose={() => setShowResetModal(false)}>
          <h2 className="text-xl font-bold mb-4">Reset Password</h2>
          <form onSubmit={handleResetSubmit(onSubmitResetEmail)}>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="text"
              {...resetRegister("email")}
              className="block w-full px-4 py-2 border rounded-md"
            />
            {resetErrors.email && (
              <p className="text-red-500 text-xs mt-1">{resetErrors.email.message}</p>
            )}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors mt-4"
            >
              Send Reset Email
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Login;