import Link from "next/link";
import React from "react";

const NavBar = () => {

    return (
        <>
            <div style={{ backgroundColor: '#8B0000', color: 'white' }}>
                <header style={{ padding: '1em 0', textAlign: 'center', fontSize: '2em', fontWeight: 'bold' }}>
                    College Event Management System
                </header>
                <nav style={{ display: 'flex', justifyContent: 'center', gap: '2em', padding: '1em 0', backgroundColor: '#A52A2A' }}>
                    <a href="/" style={{ color: 'white', textDecoration: 'none' }}>Home</a>
                    <a href="/about" style={{ color: 'white', textDecoration: 'none' }}>About Project</a>
                    <a href="/events" style={{ color: 'white', textDecoration: 'none' }}>Events</a>
                    <a href="/registration" style={{ color: 'white', textDecoration: 'none' }}>Student Registration</a>
                    <a href="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</a>
                    <a href="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact Us</a>
                </nav>
            </div>
        </>

    );
};


export default NavBar;