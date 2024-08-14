// import React from 'react';

// const Login = () => {
//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-100">
//             <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
//                 <h2 className="text-2xl font-bold mb-6 text-left">Login to Your Account</h2>
//                 <form>
//                     <div className="mb-4">
//                          <label className="block text-sm font-medium mb-2">Username</label>
//                         <input
//                             type="text"
//                             className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                     </div>
//                     <div className="mb-6">
//                         <label className="block text-sm font-medium mb-2">Password</label>
//                         <input
//                             type="password"
//                             className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                     </div>
//                     <div className="flex space-x-4">
//                         <button
//                             type="submit"
//                             className="w-1/2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
//                         >
//                             Submit
//                         </button>
//                         <button
//                             type="reset"
//                             className="w-1/2 bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
//                         >
//                             Reset
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Login;

// "use client"; // Ensure it's a Client Component

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation'; // Using next/navigation for routing
// import { useUser } from '../UserContext';

// const LoginPage = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const { setUser } = useUser();
//     const router = useRouter();

//     // Handle login click
//     const handleLogin = async () => {
//         const response = await fetch('/auth/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ username, password }),
//         });

//         if (response.ok) {
//             const userData = await response.json();
//             setUser(userData); // Set the user data in context
//             router.push('/'); // Navigate to the homepage
//         } else {
//             console.error('Login failed');
//         }
//     };

//     return (
//         <div>
//             <h1>Login Page</h1>
//             <input
//                 type="text"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 placeholder="Username"
//             />
//             <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Password"
//             />
//             <button onClick={handleLogin}>Login</button>
//         </div>
//     );
// };

// export default LoginPage;



// -------------------3rd time-----------------------------------------
// app/login/page.tsx

// "use client"; // Ensure this directive is at the top of the file

// import { useEffect, useState } from 'react';
// import * as yup from "yup";
// import useLoginStore from '@/store/loginStore';
// import { useForm } from "react-hook-form";
// import { yupResolver } from '@hookform/resolvers/yup';
// import router from 'next/router';
// import { useRouter } from 'next/navigation'; // or from 'next/router' for older versions


// interface FormValues {
//     username: string;
//     password: string;
// }

// const schema = yup.object().shape({
//     username: yup.string().min(2).max(255).required(),
//     password: yup.string().min(8).max(255).required(),
// });

// const Login = () => {
//     const login = useLoginStore((state) => state.login);
//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//         reset,
//     } = useForm<FormValues>({
//         resolver: yupResolver(schema),
//     });

//     const [error, setError] = useState('');
//     const { setUser } = useUserContext();
//     const [data, setData] = useState(null);
//     const router = useRouter();


//     const onSubmitHandler = async (data: FormValues) => {
//         try {
//             await login(data); // Call the login function from the store

//             // The login function inside `UserContext` will handle setting the user 
//             // and performing the redirection based on the user role.
//             // router.refresh();
//             reset(); // Reset the form after successful login
//         } catch (err) {
//             setError('Invalid username or password');
//         }
//     };

//     const handleReset = () => {
//         reset();
//         setError('');
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-100">
//             <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
//                 <h2 className="text-2xl font-bold mb-6 text-left">Login to Your Account</h2>
//                 {error && <div className="mb-4 text-red-500">{error}</div>}
//                 <form onSubmit={handleSubmit(onSubmitHandler)}>
//                     <div className="mb-4">
//                         <label className="block text-sm font-medium mb-2">Username</label>
//                         <input
//                             type="text"
//                             {...register('username')}
//                             className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                         {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
//                     </div>
//                     <div className="mb-6">
//                         <label className="block text-sm font-medium mb-2">Password</label>
//                         <input
//                             type="password"
//                             {...register('password')}
//                             className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                         {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
//                     </div>
//                     <div className="flex space-x-4">
//                         <button
//                             type="submit"
//                             className="w-1/2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
//                         >
//                             Submit
//                         </button>
//                         <button
//                             type="button"
//                             onClick={handleReset}
//                             className="w-1/2 bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
//                         >
//                             Reset
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Login;


// ----------------------4th time--------------------

// "use client"; // Ensure this directive is at the top of the file

// import { useState } from 'react';
// import * as yup from "yup";
// import useLoginStore from '@/store/loginStore';
// import { useForm } from "react-hook-form";
// import { yupResolver } from '@hookform/resolvers/yup';
// import { useRouter } from 'next/navigation';

// interface FormValues {
//     username: string;
//     password: string;
// }

// const schema = yup.object().shape({
//     username: yup.string().min(2).max(255).required(),
//     password: yup.string().min(8).max(255).required(),
// });

// const Login = () => {
//     const login = useLoginStore((state) => state.login);
//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//         reset,
//     } = useForm<FormValues>({
//         resolver: yupResolver(schema),
//     });

//     const [error, setError] = useState('');
//     const router = useRouter();

//     const onSubmitHandler = async (data: FormValues) => {
//         try {
//             await login(data); // Call the login function from the store
//             reset(); // Reset the form after successful login
//         } catch (err) {
//             setError('Invalid username or password');
//         }
//     };

//     const handleReset = () => {
//         reset();
//         setError('');
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-100">
//             <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
//                 <h2 className="text-2xl font-bold mb-6 text-left">Login to Your Account</h2>
//                 {error && <div className="mb-4 text-red-500">{error}</div>}
//                 <form onSubmit={handleSubmit(onSubmitHandler)}>
//                     <div className="mb-4">
//                         <label className="block text-sm font-medium mb-2">Username</label>
//                         <input
//                             type="text"
//                             {...register('username')}
//                             className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                         {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
//                     </div>
//                     <div className="mb-6">
//                         <label className="block text-sm font-medium mb-2">Password</label>
//                         <input
//                             type="password"
//                             {...register('password')}
//                             className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                         {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
//                     </div>
//                     <div className="flex space-x-4">
//                         <button
//                             type="submit"
//                             className="w-1/2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
//                         >
//                             Submit
//                         </button>
//                         <button
//                             type="button"
//                             onClick={handleReset}
//                             className="w-1/2 bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
//                         >
//                             Reset
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Login;


// ----------------------------------------------------------5th time-------
// "use client";
// import { useRouter } from 'next/navigation'; // Adjust import based on your Next.js version
// import useLoginStore from '@/store/loginStore';
// import { useForm } from "react-hook-form";
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from "yup";
// import React, { useState } from 'react';

// interface FormValues {
//     username: string;
//     password: string;
// }

// const schema = yup.object().shape({
//     username: yup.string().min(2).max(255).required(),
//     password: yup.string().min(8).max(255).required(),
// });

// const Login = () => {
//     const login = useLoginStore((state) => state.login);
//     const router = useRouter(); // Use Router for navigation
//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//         reset,
//     } = useForm<FormValues>({
//         resolver: yupResolver(schema),
//     });

//     const [error, setError] = useState('');

//     const onSubmitHandler = async (data: FormValues) => {
//         try {
//             await login(data);
//             // Fetch user and redirect based on role
//             const user = useLoginStore.getState().user;
//             if (user?.role === 'admin') {
//                 router.push('/admin');
//             } else if (user?.role === 'volunteer') {
//                 router.push('/volunteer');
//             } else {
//                 router.push('/student');
//             }
//             reset(); // Reset the form after successful login
//         } catch (err) {
//             setError('Invalid username or password');
//         }
//     };

//     const handleReset = () => {
//         reset();
//         setError('');
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-100">
//             <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
//                 <h2 className="text-2xl font-bold mb-6 text-left">Login to Your Account</h2>
//                 {error && <div className="mb-4 text-red-500">{error}</div>}
//                 <form onSubmit={handleSubmit(onSubmitHandler)}>
//                     <div className="mb-4">
//                         <label className="block text-sm font-medium mb-2">Username</label>
//                         <input
//                             type="text"
//                             {...register('username')}
//                             className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                         {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
//                     </div>
//                     <div className="mb-6">
//                         <label className="block text-sm font-medium mb-2">Password</label>
//                         <input
//                             type="password"
//                             {...register('password')}
//                             className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                         {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
//                     </div>
//                     <div className="flex space-x-4">
//                         <button
//                             type="submit"
//                             className="w-1/2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
//                         >
//                             Submit
//                         </button>
//                         <button
//                             type="button"
//                             onClick={handleReset}
//                             className="w-1/2 bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
//                         >
//                             Reset
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Login;

// ------------------------6th time:--------------------------

"use client";
import { useRouter } from 'next/navigation'; // Use Router for navigation
import useLoginStore from '@/store/loginStore';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import React, { useState } from 'react';

interface FormValues {
    email: string;
    password: string;
}

const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(8).max(255).required(),
    // firstName: yup.string().required("Name is required"),
    // lastName: yup.string().required("Name is required"),
    // mobileNumber: yup.string().required("MobileNumber is required"),
    // courseName: yup.string(),
    role: yup.string(),
});

const Login = () => {
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

    const [error, setError] = useState('');

    const onSubmitHandler = async (data: FormValues) => {
        try {
            console.log(data);
            let res = await login(data);
            console.log(res);
            await fetchUser(); // Ensure user data is fetched after login
            const user = useLoginStore.getState().user;
            if (user?.role === 'admin') {
                router.push('/admin');
            } else if (user?.role === 'volunteer') {
                router.push('/admin');
            } else {
                router.push('/student');
            }
            reset(); // Reset the form after successful login
        } catch (err) {
            setError('Invalid username or password');
        }
    };

    const handleReset = () => {
        reset();
        setError('');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-left">Login to Your Account</h2>
                {error && <div className="mb-4 text-red-500">{error}</div>}
                <form onSubmit={handleSubmit(onSubmitHandler)}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input
                            type="text"
                            {...register('email')}
                            className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">Password</label>
                        <input
                            type="password"
                            {...register('password')}
                            className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                    </div>
                    <div className="flex space-x-4">
                        <button
                            type="submit"
                            className="w-1/2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
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
            </div>
        </div>
    );
};

export default Login;

