"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import useLoginStore from "@/store/loginStore";
import { useRouter } from "next/navigation";
import "./styles/common.css";
import { useUser } from "./context/UserContext"; // Adjust the path as needed

const NavBar = () => {
  const { user } = useUser(); // Access user data from context

  const logout = useLoginStore((state) => state.logout);
  // const user = useLoginStore((state) => state.user);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };
  const renderLinks = () => {
    switch (user?.role) {
      case "superadmin":
        return (
          <>
            <Link href="/" style={linkStyle}>
              Home
            </Link>
            <Link href="/about" style={linkStyle}>
              About Project
            </Link>
            <Link href="/superadmin" style={linkStyle}>
              Colleges{" "}
            </Link>
            <a onClick={handleLogout} style={linkStyle}>
              Logout
            </a>
            <h6 className="absolute right-0 mt-1 mr-2">
              Welcome {user.firstName}
            </h6>
          </>
        );
      case "admin":
        return (
          <>
            <Link href="/" style={linkStyle}>
              Home
            </Link>
            <Link href="/about" style={linkStyle}>
              About Project
            </Link>
            <Link href="/admin/events/view-event" style={linkStyle}>
              Events
            </Link>
            <Link href="/admin" style={linkStyle}>
              Administration
            </Link>
            <a onClick={handleLogout} style={linkStyle}>
              Logout
            </a>
            <h6 className="absolute right-0 mt-1 mr-2">
              Welcome {user.firstName}
            </h6>{" "}
          </>
        );
      case "coordinator":
        return (
          <>
            <Link href="/" style={linkStyle}>
              Home
            </Link>
            <Link href="/about" style={linkStyle}>
              About Project
            </Link>
            <Link href="/events" style={linkStyle}>
              Events
            </Link>
            <Link href="/coordinator" style={linkStyle}>
              Coordinator
            </Link>
            <a onClick={handleLogout} style={linkStyle}>
              Logout
            </a>
            <h6 className="absolute right-0 mt-1 mr-2">
              Welcome {user.firstName}
            </h6>
          </>
        );
      case "judge":
        return (
          <>
            <Link href="/events" style={linkStyle}>
              Home
            </Link>
            <Link href="/about" style={linkStyle}>
              About Project
            </Link>
            <Link href="/judge/events" style={linkStyle}>
              Events
            </Link>
            <a onClick={handleLogout} style={linkStyle}>
              Logout
            </a>
            <h6 className="absolute right-0 mt-1 mr-2">
              Welcome {user.firstName}
            </h6>
          </>
        );
      case "judge":
        return (
          <>
            <Link href="/events" style={linkStyle}>
              Home
            </Link>
            <Link href="/about" style={linkStyle}>
              About Project
            </Link>
            <Link href="/judge/events" style={linkStyle}>
              Events
            </Link>
            <a onClick={handleLogout} style={linkStyle}>
              Logout
            </a>
            <h6 className="absolute right-0 mt-1 mr-2">
              Welcome {user.firstName}
            </h6>{" "}
          </>
        );
      case "student":
        return (
          <>
            <Link href="/" style={linkStyle}>
              Home
            </Link>
            <Link href="/about" style={linkStyle}>
              About Project
            </Link>
            <Link href="/events" style={linkStyle}>
              Events
            </Link>
            <Link href="/student" style={linkStyle}>
              Student
            </Link>
            <a onClick={handleLogout} style={linkStyle}>
              Logout
            </a>
            <h6 className="absolute right-0 mt-1 mr-2">
              Welcome {user.firstName}
            </h6>{" "}
          </>
        );
      default:
        return (
          <>
            <Link href="/" style={linkStyle}>
              Home
            </Link>
            <Link href="/about" style={linkStyle}>
              About Project
            </Link>
            <Link href="/events" style={linkStyle}>
              Events
            </Link>
            <Link href="student/registration" style={linkStyle}>
              Student Registration
            </Link>
            <Link href="/login" style={linkStyle}>
              Login
            </Link>
            <Link href="/contact" style={linkStyle}>
              Contact Us
            </Link>
          </>
        );
    }
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    cursor: "pointer",
  };

  return (
    // <div style={{ backgroundColor: '#8B0000', color: 'white' }}>
    <div className="main-header">
      <header className="header-title">College Event Management System</header>
      <nav className="navbar-with-menu-list">{renderLinks()}</nav>
    </div>
  );
};

export default NavBar;
