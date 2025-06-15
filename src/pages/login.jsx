import React from "react";
import { Link } from "react-router";
import Logo from "../../src/assets/img/logo.png"; // Adjust the path to your logo image

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Side */}
      <div className="flex-1 flex flex-col justify-center items-center p-10 bg-white">
        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-bold text-gray-700 mb-1">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Enter your email and password to sign in
          </p>

          <form className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>

            <div className="flex items-center text-sm">
              <input type="checkbox" id="remember" className="mr-2" />
              <label htmlFor="remember" className="text-gray-600">
                Remember me
              </label>
            </div>
            <Link>
              <button
                type="submit"
                className="w-full bg-teal-400 text-white font-semibold py-2 rounded-md hover:bg-teal-500 transition"
              >
                SIGN IN
              </button>
            </Link>
          </form>

          <p className="text-sm text-gray-500 text-center mt-4">
            Don’t have an account?{" "}
            <a href="/register" className="text-teal-400 font-semibold">
              Sign up
            </a>
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="hidden md:flex flex-1 items-center justify-center bg-teal-300 rounded-l-3xl relative">
        <div className="text-center text-white">
          <img src={Logo} alt="Logo" className="w-20 mx-auto mb-4" />
          <h1 className="text-3xl font-bold">In Track</h1>
        </div>
      </div>
    </div>
  );
}
