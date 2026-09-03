import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI, setToken, setUser } from "../../services/api";
import lighthouseImage from "../../assets/images/user/Rectangle 2756.jpg";

const PhoneIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.69 14.9 16.08 14.81 16.44 14.93C17.59 15.31 18.82 15.52 20.09 15.52C20.59 15.52 21 15.93 21 16.43V20.09C21 20.59 20.59 21 20.09 21C10.65 21 3 13.35 3 3.91C3 3.41 3.41 3 3.91 3H7.58C8.08 3 8.49 3.41 8.49 3.91C8.49 5.18 8.7 6.41 9.08 7.56C9.2 7.92 9.11 8.31 8.83 8.59L6.62 10.79Z"
      fill="#6B7280"
    />
  </svg>
);

const LockIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M17 11H7V7C7 4.24 9.24 2 12 2C14.76 2 17 4.24 17 7V11ZM12 17C13.1 17 14 16.1 14 15C14 13.9 13.1 13 12 13C10.9 13 10 13.9 10 15C10 16.1 10.9 17 12 17ZM19 11H18.9C18.7 8.2 16.4 6 13.6 6H10.4C7.6 6 5.3 8.2 5.1 11H5C3.9 11 3 11.9 3 13V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V13C21 11.9 20.1 11 19 11Z"
      fill="#6B7280"
    />
  </svg>
);

const BrandLogo = () => (
  <div className="text-3xl font-extrabold tracking-wide bg-gradient-to-r from-green-500 via-orange-500 to-orange-600 bg-clip-text text-transparent">AdMart</div>
);

export default function UserLogin() {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!mobile.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const data = await authAPI.userLogin(mobile.trim(), password);
      setToken(data.token);
      setUser(data.user);

      if (data.user.status === "approved") {
        navigate("/user/dashboard");
      } else if (data.user.status === "rejected") {
        setError(`Your registration was rejected. ${data.user.rejectionReason ? 'Reason: ' + data.user.rejectionReason : ''} Please contact support.`);
      } else {
        setError("Your account is under verification. Please wait for admin approval.");
      }
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex w-full h-screen min-h-screen overflow-hidden bg-white max-md:h-auto max-md:min-h-[100svh] max-md:overflow-y-auto">

      {/* LEFT IMAGE */}
      <section className="relative w-[61.4%] h-screen shrink-0 overflow-hidden max-md:hidden">
        <img
          src={lighthouseImage}
          alt="Lighthouse by the sea"
          className="w-full h-full object-cover object-center block"
        />
      </section>

      {/* RIGHT FORM */}
      <section className="w-[38.6%] h-screen flex items-center justify-center bg-white overflow-y-auto py-6 max-md:w-full max-md:h-auto max-md:min-h-screen max-md:p-8 max-md:pt-12 max-md:pb-14 max-md:items-start">

        <div className="w-[85%] max-w-[430px] flex flex-col items-center max-md:w-full my-auto -translate-y-px">

          {/* LOGO */}
          <div className="w-full flex justify-center mb-8 max-md:mb-6">
            <BrandLogo />
          </div>

          {/* CARD */}
          <div className="w-full p-6 sm:p-7 bg-[#dff1ff] rounded-lg shadow-[0_1px_2px_rgba(0,0,0,0.16),0_2px_5px_rgba(0,0,0,0.08)]">

            <h1 className="m-0 text-center text-[#111] font-sans text-lg font-bold leading-normal max-md:text-xl">
              Welcome to our platform
            </h1>

            <h2 className="mt-1 mb-6 text-center text-[#111] font-sans text-base font-bold leading-snug max-md:text-lg">
              Login
            </h2>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm font-sans text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="w-full">

              {/* MOBILE NUMBER */}
              <div className="w-full mb-4">
                <label
                  htmlFor="mobile"
                  className="block mb-1.5 text-gray-600 font-sans text-sm font-medium"
                >
                  Mobile Number
                </label>

                <div className="relative w-full h-11 flex items-center bg-white border border-gray-300 rounded-md focus-within:border-[#0787ff] focus-within:ring-1 focus-within:ring-[#0787ff]">
                  <span className="absolute left-3 shrink-0">
                    <PhoneIcon />
                  </span>

                  <input
                    id="mobile"
                    type="tel"
                    placeholder="Mobile Number"
                    autoComplete="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full h-full pl-10 pr-3 border-none outline-none bg-transparent text-[#333] font-sans text-sm placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div className="w-full mb-2">
                <label
                  htmlFor="password"
                  className="block mb-1.5 text-gray-600 font-sans text-sm font-medium"
                >
                  Password
                </label>

                <div className="relative w-full h-11 flex items-center bg-white border border-gray-300 rounded-md focus-within:border-[#0787ff] focus-within:ring-1 focus-within:ring-[#0787ff]">
                  <span className="absolute left-3 shrink-0">
                    <LockIcon />
                  </span>

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-full pl-10 pr-10 border-none outline-none bg-transparent text-[#333] font-sans text-sm placeholder:text-gray-400"
                  />

                  <span
                    className="absolute right-3 shrink-0 text-gray-400 cursor-pointer select-none"
                    onClick={() => setShowPassword((p) => !p)}
                  >
                    {showPassword ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="#6B7280"/></svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2z" fill="#6B7280"/></svg>
                    )}
                  </span>
                </div>
              </div>

              {/* REGISTER LINK */}
              <div className="mt-1 text-[#333] font-sans text-sm leading-normal">
                Don't have an account?{" "}
                <Link to="/register" className="text-[#111] no-underline font-semibold hover:underline">
                  Register
                </Link>
              </div>

              {/* LOGIN BUTTON */}
              <div className="flex justify-end mt-5">
                <button
                  type="submit"
                  disabled={loading}
                  className="min-w-[110px] h-10 px-6 rounded-md bg-[#0787ff] text-white font-sans text-sm font-semibold cursor-pointer transition-colors duration-150 hover:bg-[#0078e6] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </div>

            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
