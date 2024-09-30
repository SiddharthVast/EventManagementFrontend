"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import "./styles/common.css";
import useLoginStore from "@/store/loginStore";

const NavBar = () => {
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
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/about" className="nav-link">About Project</Link>
            <Link href="/superadmin" className="nav-link">Super-Admin</Link>
            <a onClick={handleLogout} className="nav-link">Logout</a>
          </>
        );
      case "admin":
        return (
          <>
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/about" className="nav-link">About Project</Link>
            <Link href="/admin" className="nav-link">Administration</Link>
            <a onClick={handleLogout} className="nav-link">Logout</a>
          </>
        );
      case "coordinator":
        return (
          <>
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/about" className="nav-link">About Project</Link>
            <Link href="/coordinator" className="nav-link">Coordinator</Link>
            <a onClick={handleLogout} className="nav-link">Logout</a>
          </>
        );
      case "judge":
        return (
          <>
            <Link href="/events" className="nav-link">Home</Link>
            <Link href="/about" className="nav-link">About Project</Link>
            <Link href="/judge/events" className="nav-link">Judge</Link>
            <a onClick={handleLogout} className="nav-link">Logout</a>
          </>
        );
      case "student":
        return (
          <>
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/about" className="nav-link">About Project</Link>
            <Link href="/student/events" className="nav-link">Student</Link>
            <a onClick={handleLogout} className="nav-link">Logout</a>
          </>
        );
      default:
        return (
          <>
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/about" className="nav-link">About Project</Link>
            <Link href="/student/registration" className="nav-link">Student Registration</Link>
            <Link href="/login" className="nav-link">Login</Link>
            <Link href="/contact" className="nav-link">Contact Us</Link>
          </>
        );
    }
  };

  return (
    <div className="main-header">
      <div className="header-content">
        <img src="/logo_size.jpg" alt="logo" className="logo" />
        <header className="header-title">College Event Management System</header>
        {/* <h6>{user?.college.collegeName}</h6> */}
        {user?.college?.collegeName && <h6>{user.college.collegeName}</h6>}

      </div>

      <div className="navbar-container">
        <nav className="navbar-with-menu-list">
          {renderLinks()}
          {user && (
            <div className="user-info">
              <>
                <h6 className="welcome-message"> {user.firstName}</h6>
                <Link href={user.role === "student" ? "/student/my-profile" : "#"}>
                  <img
                    src={user.imageUrl || "/default-avatar.png"}
                    alt="User Avatar"
                    className="user-avatar"
                  />
                </Link>
              </>
            </div>
          )}
        </nav>
      </div>
    </div>
  );

};

export default NavBar;
