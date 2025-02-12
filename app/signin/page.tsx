"use client";

import { useState } from "react";

export default function SignInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                window.location.href = "/main";
            } else {
                const errorData = await response.json();
                setError(errorData.message || "An error occurred");
            }
        } catch (error) {
            setError("An error occurred while signing in");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            <form onSubmit={handleSubmit} className="p-8 bg-gray-800 rounded-lg">
                <h2 className="text-2xl mb-4">Sign In</h2>
                {error && <p className="text-red-500">{error}</p>}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 mb-2 bg-gray-700 border border-gray-600"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 mb-2 bg-gray-700 border border-gray-600"
                />
                <button type="submit" className="w-full bg-blue-500 p-2 mt-2">Sign In</button>
            </form>
        </div>
    );
}