import React from "react";
import Logo from "../../src/assets/img/logo.png";
import Support from "../../src/assets/img/sponsor.png";
import Itd from "../../src/assets/img/homeitd.png";
import { Link } from "react-router";

export const Home = () => {
  return (
    <div className="min-h-screen font-sans bg-white">
      {/* Header */}

      {/* Hero Section */}
      <section className="text-center  bg-gradient-to-b from-teal-400 to-teal-500">
        <div className="bg-white py-3 px-4">
          <Link
            to="/register"
            className="bg-white text-black font-semibold px-6 py-3  rounded shadow"
          >
            Sign up
          </Link>
        </div>
        <div className="flex flex-col items-center">
          <img src={Logo} alt="logo" className="w-10 mb-2" />
          <h1 className="text-4xl font-bold text-white">In Track</h1>
          <p className="text-white mt-4 max-w-xl mb-12">
            a task management platform that keeps you organized, focused, and
            always on schedule with real-time tracking and smart reminders
          </p>
          <div className="bg-zinc-50 px-150 py-7 rounded-tr rounded-tl "></div>
          <div className="bg-zinc-50 px-70">
            <img src={Support} alt="support" className="" />
          </div>
        </div>
        <div className="bg-zinc-50">
          <section>
            <div className="max-w-7xl mx-auto px-4 py-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <img src={Itd} alt="isidikit  " />
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-2">
                    Managing Internships Made Easier
                  </h3>
                  <p className="text-gray-600">
                    With InTrack, all internship processes from start to finish
                    can be monitored and managed in one integrated platform.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};
