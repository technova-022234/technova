import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Loginpage = () => {
    const [formData, setFormData] = useState({ email: "", teamname: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Email:", formData.email);
        console.log("Team Name:", formData.teamname);
        navigate("/level1")
    };
    return (
        <div className="h-screen flex items-center justify-center bg-cover bg-center bg-[url('/images/image1.jpg')]">
            {/* Glassmorphism Card */}
            <div className="bg-white bg-opacity-20 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-96 border border-white/30">
                <h1 className="text-4xl text-center text-white font-bold mb-6">
                    LOGIN
                </h1>

                {/* Form */}
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
                        htmlFor="teamname"
                        className="text-white font-semibold mt-4 mb-2"
                    >
                        Team Name
                    </label>
                    <input
                        type="text"
                        id="teamname"
                        name="teamname"
                        placeholder="Enter your team name"
                        value={formData.teamname}
                        onChange={handleChange}
                        className="p-3 border border-white/30 rounded-lg w-full text-black shadow-md focus:ring-2 focus:ring-purple-300 outline-none"
                    />

                    {/* Animated Button */}
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
