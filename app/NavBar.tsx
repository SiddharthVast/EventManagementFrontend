"use client";

import Link from "next/link";
import React from "react";
import useLoginStore from "@/store/loginStore";
import { useRouter } from "next/navigation";
import "./styles/common.css";

const NavBar = () => {
  const user = useLoginStore((state) => state.user);
  const logout = useLoginStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login"); // Redirect to login page after logout
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
            <Link href="/events" style={linkStyle}>
              Events
            </Link>
            <Link href="/superadmin" style={linkStyle}>
              SuperAdmin
            </Link>
            <a onClick={handleLogout} style={linkStyle}>
              Logout
            </a>
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
            <Link href="/events" style={linkStyle}>
              Events
            </Link>
            <Link href="/admin" style={linkStyle}>
              Admin
            </Link>
            <a onClick={handleLogout} style={linkStyle}>
              Logout
            </a>
          </>
        );
      case "volunteer":
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
            {/* <Link href="/volunteer" style={linkStyle}>Volunteer</Link> */}
            <a onClick={handleLogout} style={linkStyle}>
              Logout
            </a>
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
            <Link href="/registration" style={linkStyle}>
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
    cursor: "pointer", // Ensure pointer cursor for logout
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
