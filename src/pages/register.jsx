import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { BsApple } from "react-icons/bs";
import { Link } from "react-router";
import Logo from "../../src/assets/img/logo.png";

export const RegisterPage = () => {
  
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-teal-400 text-white py-9 px-4 text-center">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="font-bold text-xl flex items-center gap-2">
            <img src={Logo} alt="Logo" className="h-6" /> InTrack
          </div>
          <div className="space-x-4 text-sm">
            <Link to="/register" className="hover:underline">
              Sign Up
            </Link>
            <Link to="/login" className="hover:underline">
              Sign In
            </Link>
          </div>
        </div>
        <div className="mt-7">
          <h1 className="text-3xl font-bold mb-6">Welcome!</h1>
        </div>
      </div>

      {/* Form Card */}
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg -mt-20">
          <h2 className="text-lg font-medium text-center mb-4">
            Register
          </h2>


          <div className="text-center text-gray-400 mb-4">or</div>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your full name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
            />
            <input
              type="email"
              placeholder="Your email address"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
            />
            <input
              type="password"
              placeholder="Your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
            />

            <div className="flex items-center text-sm gap-2">
              <input
                type="checkbox"
                id="remember"
                className="accent-teal-500"
              />
              <label htmlFor="remember" className="text-gray-600">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-teal-400 text-white py-2 rounded-lg font-semibold hover:bg-teal-500"
            >
              SIGN UP
            </button>

            <p className="text-sm text-center text-gray-600 mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-teal-500 hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
