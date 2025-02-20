import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNavbar from "../components/TopNavbar";

const Loginpage = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // if (!validateEmail(formData.email)) {
        //     setError("Please enter a valid email address.");
        //     return;
        // }

        // setError("");

        try {
            // const response = await fetch(
            //     "http://localhost:5000/api/users/login",
            //     {
            //         method: "POST",
            //         headers: {
            //             "Content-Type": "application/json",
            //         },
            //         body: JSON.stringify(formData),
            //     }
            // );

            // if (!response.ok) {
            //     throw new Error("Login failed");
            // }

            // const data = await response.json();
            // console.log("User logged in:", data.user);
            navigate("/nav");
        } catch (err) {
            console.error(err);
            setError("Login failed. Please try again.");
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-cover bg-center bg-[url('/images/image1.jpg')]">
            <div className="bg-white bg-opacity-20 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-96 border border-white/30">
                <h1 className="text-4xl text-center text-white font-bold mb-6">
                    LOGIN
                </h1>
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <label
                        htmlFor="email"
                        className="text-white font-semibold mb-2"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        className="p-3 border border-white/30 rounded-lg w-full text-black shadow-md focus:ring-2 focus:ring-purple-300 outline-none"
                    />

                    <label
                        htmlFor="password"
                        className="text-white font-semibold mt-4 mb-2"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        className="p-3 border border-white/30 rounded-lg w-full text-black shadow-md focus:ring-2 focus:ring-purple-300 outline-none"
                    />

                    {error && <p className="text-red-500 mt-2">{error}</p>}

                    <button
                        type="submit"
                        className="w-full mt-6 p-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Loginpage;
