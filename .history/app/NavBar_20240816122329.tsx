// import Link from "next/link";
// import React from "react";

// const NavBar = () => {

//     return (
//         <>
//             <div style={{ backgroundColor: '#8B0000', color: 'white' }}>
//                 <header style={{ padding: '1em 0', textAlign: 'center', fontSize: '2em', fontWeight: 'bold' }}>
//                     College Event Management System
//                 </header>
//                 <nav style={{ display: 'flex', justifyContent: 'center', gap: '2em', padding: '1em 0', backgroundColor: '#A52A2A' }}>
//                     <a href="/" style={{ color: 'white', textDecoration: 'none' }}>Home</a>
//                     <a href="/about" style={{ color: 'white', textDecoration: 'none' }}>About Project</a>
//                     <a href="/events" style={{ color: 'white', textDecoration: 'none' }}>Events</a>
//                     <a href="/registration" style={{ color: 'white', textDecoration: 'none' }}>Student Registration</a>
//                     <a href="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</a>
//                     <a href="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact Us</a>
//                 </nav>
//             </div>
//         </>

//     );
// };


// export default NavBar;



// -----------------------------------------------------------


// "use client"; // Ensure it's a Client Component since it uses hooks

// import Link from "next/link";
// import React from "react";
// import { useUser } from './UserContext';
// import { useRouter } from 'next/navigation';
// const NavBar = () => {
//     const { user } = useUser();

//     const renderLinks = () => {
//         switch (user?.role) {
//             case 'admin':
//                 return (
//                     <>
//                         <Link href="/" style={linkStyle}>Home</Link>
//                         <Link href="/about" style={linkStyle}>About Project</Link>
//                         <Link href="/events" style={linkStyle}>Events</Link>
//                         <Link href="/admin" style={linkStyle}>Admin</Link>
//                         <Link href="/logout" style={linkStyle}>Logout</Link>
//                     </>
//                 );
//             case 'volunteer':
//                 return (
//                     <>
//                         <Link href="/" style={linkStyle}>Home</Link>
//                         <Link href="/about" style={linkStyle}>About Project</Link>
//                         <Link href="/events" style={linkStyle}>Events</Link>
//                         <Link href="/volunteer" style={linkStyle}>Volunteer</Link>
//                         <Link href="/logout" style={linkStyle}>Logout</Link>
//                     </>
//                 );
//             case 'student':
//                 return (
//                     <>
//                         <Link href="/" style={linkStyle}>Home</Link>
//                         <Link href="/about" style={linkStyle}>About Project</Link>
//                         <Link href="/events" style={linkStyle}>Events</Link>
//                         <Link href="/student" style={linkStyle}>Student</Link>
//                         <Link href="/logout" style={linkStyle}>Logout</Link>
//                     </>
//                 );
//             default:
//                 return (
//                     <>
//                         <Link href="/" style={linkStyle}>Home</Link>
//                         <Link href="/about" style={linkStyle}>About Project</Link>
//                         <Link href="/events" style={linkStyle}>Events</Link>
//                         <Link href="/registration" style={linkStyle}>Student Registration</Link>
//                         <Link href="/login" style={linkStyle}>Login</Link>
//                         <Link href="/contact" style={linkStyle}>Contact Us</Link>
//                     </>
//                 );
//         }
//     };

//     const linkStyle = {
//         color: 'white',
//         textDecoration: 'none'
//     };

//     return (
//         <div style={{ backgroundColor: '#8B0000', color: 'white' }}>
//             <header style={{ padding: '1em 0', textAlign: 'center', fontSize: '2em', fontWeight: 'bold' }}>
//                 College Event Management System
//             </header>
//             <nav style={{ display: 'flex', justifyContent: 'center', gap: '2em', padding: '1em 0', backgroundColor: '#A52A2A' }}>
//                 {renderLinks()}

//             </nav>
//         </div>
//     );
// };

// export default NavBar;


// --------------------------4thtime----------------------

// "use client";

// import Link from "next/link";
// import React from "react";
// import useLoginStore from '@/store/loginStore';

// const NavBar = () => {
//     const user = useLoginStore((state) => state.user);

//     const renderLinks = () => {
//         switch (user?.role) {
//             case 'admin':
//                 return (
//                     <>
//                         <Link href="/" style={linkStyle}>Home</Link>
//                         <Link href="/about" style={linkStyle}>About Project</Link>
//                         <Link href="/events" style={linkStyle}>Events</Link>
//                         <Link href="/admin" style={linkStyle}>Admin</Link>
//                         <Link href="/logout" style={linkStyle}>Logout</Link>
//                     </>
//                 );
//             case 'volunteer':
//                 return (
//                     <>
//                         <Link href="/" style={linkStyle}>Home</Link>
//                         <Link href="/about" style={linkStyle}>About Project</Link>
//                         <Link href="/events" style={linkStyle}>Events</Link>
//                         {/* <Link href="/volunteer" style={linkStyle}>Volunteer</Link>
//                         <Link href="/logout" style={linkStyle}>Logout</Link> */}
//                     </>
//                 );
//             case 'student':
//                 return (
//                     <>
//                         <Link href="/" style={linkStyle}>Home</Link>
//                         <Link href="/about" style={linkStyle}>About Project</Link>
//                         <Link href="/events" style={linkStyle}>Events</Link>
//                         <Link href="/student" style={linkStyle}>Student</Link>
//                         <Link href="/logout" style={linkStyle}>Logout</Link>
//                     </>
//                 );
//             default:
//                 return (
//                     <>
//                         <Link href="/" style={linkStyle}>Home</Link>
//                         <Link href="/about" style={linkStyle}>About Project</Link>
//                         <Link href="/events" style={linkStyle}>Events</Link>
//                         <Link href="/registration" style={linkStyle}>Student Registration</Link>
//                         <Link href="/login" style={linkStyle}>Login</Link>
//                         <Link href="/contact" style={linkStyle}>Contact Us</Link>
//                     </>
//                 );
//         }
//     };

//     const linkStyle = {
//         color: 'white',
//         textDecoration: 'none'
//     };

//     return (
//         <div style={{ backgroundColor: '#8B0000', color: 'white' }}>
//             <header style={{ padding: '1em 0', textAlign: 'center', fontSize: '2em', fontWeight: 'bold' }}>
//                 College Event Management System
//             </header>
//             <nav style={{ display: 'flex', justifyContent: 'center', gap: '2em', padding: '1em 0', backgroundColor: '#A52A2A' }}>
//                 {renderLinks()}
//             </nav>
//         </div>
//     );
// };

// export default NavBar;

// -------------------------------------5th time logout-----------------
"use client";

import Link from "next/link";
import React from "react";
import useLoginStore from '@/store/loginStore';
import { useRouter } from 'next/navigation';

const NavBar = () => {
    const user = useLoginStore((state) => state.user);
    const logout = useLoginStore((state) => state.logout);
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/login'); // Redirect to login page after logout
    };

    const renderLinks = () => {
        switch (user?.role) {
            case 'superadmin':
                return (
                    <>
                        <Link href="/" style={linkStyle}>Home</Link>
                        <Link href="/about" style={linkStyle}>About Project</Link>
                        <Link href="/events" style={linkStyle}>Events</Link>
                        <Link href="/superadmin" style={linkStyle}>SuperAdmin</Link>
                        <a onClick={handleLogout} style={linkStyle}>Logout</a>
                    </>
                );
            case 'admin':
                return (
                    <>
                        <Link href="/" style={linkStyle}>Home</Link>
                        <Link href="/about" style={linkStyle}>About Project</Link>
                        <Link href="/events" style={linkStyle}>Events</Link>
                        <Link href="/admin" style={linkStyle}>Admin</Link>
                        <a onClick={handleLogout} style={linkStyle}>Logout</a>
                    </>
                );
            case 'volunteer':
                return (
                    <>
                        <Link href="/" style={linkStyle}>Home</Link>
                        <Link href="/about" style={linkStyle}>About Project</Link>
                        <Link href="/events" style={linkStyle}>Events</Link>
                        {/* <Link href="/volunteer" style={linkStyle}>Volunteer</Link> */}
                        <a onClick={handleLogout} style={linkStyle}>Logout</a>
                    </>
                );
            case 'student':
                return (
                    <>
                        <Link href="/" style={linkStyle}>Home</Link>
                        <Link href="/about" style={linkStyle}>About Project</Link>
                        <Link href="/events" style={linkStyle}>Events</Link>
                        <Link href="/student" style={linkStyle}>Student</Link>
                        <a onClick={handleLogout} style={linkStyle}>Logout</a>
                    </>
                );
            default:
                return (
                    <>
                        <Link href="/" style={linkStyle}>Home</Link>
                        <Link href="/about" style={linkStyle}>About Project</Link>
                        <Link href="/events" style={linkStyle}>Events</Link>
                        <Link href="/registration" style={linkStyle}>Student Registration</Link>
                        <Link href="/login" style={linkStyle}>Login</Link>
                        <Link href="/contact" style={linkStyle}>Contact Us</Link>
                    </>
                );
        }
    };

    const linkStyle = {
        color: 'white',
        textDecoration: 'none',
        cursor: 'pointer' // Ensure pointer cursor for logout
    };

    return (
        <div style={{ backgroundColor: '#8B0000', color: 'white' }}>
            <header style={{ padding: '1em 0', textAlign: 'center', fontSize: '2em', fontWeight: 'bold' }}>
                College Event Management System
            </header>
            <nav style={{ display: 'flex', justifyContent: 'center', gap: '2em', padding: '1em 0', backgroundColor: '#A52A2A' }}>
                {renderLinks()}
            </nav>
        </div>
    );
};

export default NavBar;


