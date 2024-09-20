"use client";
import Link from "next/link";
import React from "react";
// import useLoginStore from "@/store/loginStore";
import { useRouter } from "next/navigation";
import "./styles/common.css";
// import { useUser } from "./context/UserContext";
import useLoginStore from "@/store/loginStore";

const NavBar = () => {
  // const { user, logout } = useUser(); // Access user data from context
  const logout = useLoginStore((state) => state.logout);

  const { user } = useLoginStore((state) => ({
    user: state.user,
  }));
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
            <Link href="/" className="nav-link">
              Home
            </Link>
            <Link href="/about" className="nav-link">
              About Project
            </Link>
            <Link href="/superadmin" className="nav-link">
              Super-Admin
            </Link>
            <a onClick={handleLogout} className="nav-link">
              Logout
            </a>
            <h6 className="welcome-message">Welcome {user.firstName}</h6>
          </>
        );
      case "admin":
        return (
          <>
            <Link href="/" className="nav-link">
              Home
            </Link>
            <Link href="/about" className="nav-link">
              About Project
            </Link>
            <Link href="/admin/events/view-event" className="nav-link">
              Events
            </Link>
            <Link href="/admin" className="nav-link">
              Administration
            </Link>
            <a onClick={handleLogout} className="nav-link">
              Logout
            </a>
            <h6 className="welcome-message">Welcome {user.firstName}</h6>
          </>
        );
      case "coordinator":
        return (
          <>
            <Link href="/" className="nav-link">
              Home
            </Link>
            <Link href="/about" className="nav-link">
              About Project
            </Link>
            <Link href="/events" className="nav-link">
              Events
            </Link>
            <Link href="/coordinator" className="nav-link">
              Coordinator
            </Link>
            <a onClick={handleLogout} className="nav-link">
              Logout
            </a>
            <h6 className="welcome-message">Welcome {user.firstName}</h6>
          </>
        );
      case "judge":
        return (
          <>
            <Link href="/events" className="nav-link">
              Home
            </Link>
            <Link href="/about" className="nav-link">
              About Project
            </Link>
            <Link href="/judge/events" className="nav-link">
              Events
            </Link>
            <a onClick={handleLogout} className="nav-link">
              Logout
            </a>
            <h6 className="welcome-message">Welcome {user.firstName}</h6>
          </>
        );
      case "student":
        return (
          <>
            <Link href="/" className="nav-link">
              Home
            </Link>
            <Link href="/about" className="nav-link">
              About Project
            </Link>
            <Link href="/student/events" className="nav-link">
              Student
            </Link>

            <a onClick={handleLogout} className="nav-link">
              Logout
            </a>
            <h6 className="welcome-message">Welcome {user.firstName}</h6>
          </>
        );
      default:
        return (
          <>
            <Link href="/" className="nav-link">
              Home
            </Link>
            <Link href="/about" className="nav-link">
              About Project
            </Link>
            <Link href="/events" className="nav-link">
              Events
            </Link>
            <Link href="/student/registration" className="nav-link">
              Student Registration
            </Link>
            <Link href="/login" className="nav-link">
              Login
            </Link>
            <Link href="/contact" className="nav-link">
              Contact Us
            </Link>
          </>
        );
    }
  };

  return (
    <div className="main-header">
      <div className="header-content">
        <img src="/logo_size.jpg" alt="logo" className="logo" />
        <header className="header-title">
          College Event Management System
        </header>
        <h6>{user?.college.collegeName}</h6>
      </div>
      <nav className="navbar-with-menu-list">{renderLinks()}</nav>
    </div>
  );
};

export default NavBar;
