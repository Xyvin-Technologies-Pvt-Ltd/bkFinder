import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import logo from "../logos/bk-logo.png";
import { loginAdmin } from "../api/userApi";
import skybertech_logo from "../logos/skybertech_logo.png";
import xyvin_logo from "../logos/Xyvin_logo.png";

function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await loginAdmin(form);
            if (res.data.success) {
                toast.success("Login successful!");
                localStorage.setItem("isLoggedIn", "true");
                setTimeout(() => navigate("/managexcel"), 800);
            } else {
                toast.error("Invalid credentials");
            }
        } catch (error) {
            toast.error("Login failed. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center px-4 bg-stone-50">
            <div className="bg-gray-700 shadow-xl rounded-3xl p-10 w-full max-w-sm text-center border border-gray-400">
                <img
                    src={logo}
                    alt="Trade Expo Logo"
                    className="w-28 h-auto mx-auto mb-6 object-contain"
                />

                <h2 className="text-3xl font-extrabold text-gray-100 mb-8 tracking-wide">
                    Admin Login
                </h2>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                        type="text"
                        name="email"
                        placeholder="Username"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 bg-stone-50 rounded-lg text-gray-700 placeholder-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 outline-none transition-all duration-300"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 bg-stone-50 rounded-lg text-gray-700 placeholder-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 outline-none transition-all duration-300"
                    />

                    <button
                        type="submit"
                        className="w-full bg-gray-200 text-black font-bold py-3 rounded-full shadow-lg hover:bg-gray-400 transition-all duration-500 ease-in-out cursor-pointer"
                    >
                        Login
                    </button>
                </form>
            </div>
            <footer className="fixed bottom-0 left-0 w-full py-4shadow-inner">
                <div className="flex sm:flex-row items-center justify-center gap-2 sm:gap-3 text-gray-500 text-xs sm:text-base font-medium">
                    <span>Technology Partner</span>
                    <a
                        href="https://skybertech.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center"
                    >
                        <img
                            src={skybertech_logo}
                            alt="SkyberTech"
                            className="h-4 sm:h-6 object-contain hover:opacity-80 transition-opacity duration-300"
                        />
                    </a>

                    <span>in association with</span>

                    {/* Xyvin Logo */}
                    <a
                        href="https://www.xyvin.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center"
                    >
                        <img
                            src={xyvin_logo}
                            alt="Xyvin"
                            className="h-4 sm:h-6 object-contain hover:opacity-80 transition-opacity duration-300"
                        />
                    </a>
                </div>
            </footer>
        </div>
    );
}

export default Login;