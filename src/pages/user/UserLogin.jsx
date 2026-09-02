import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import lighthouseImage from "../../assets/images/user/Rectangle 2756.jpg";

const UserIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
      fill="#6B7280"
    />
    <path
      d="M3 22C3 17.5817 7.02944 14 12 14C16.9706 14 21 17.5817 21 22H3Z"
      fill="#6B7280"
    />
  </svg>
);

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

const BrandLogo = () => (
  <svg
    width="78"
    height="52"
    viewBox="0 0 78 52"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M40 7H62L70 17H48L40 7Z" fill="#159447" />
    <path d="M55 17H70L64 10L55 17Z" fill="#159447" />
    <path d="M16 30H53L61 40H24L16 30Z" fill="#F6A21A" />
    <path d="M16 30H31L24 22L16 30Z" fill="#F6A21A" />
    <path d="M30 20H59V27H30V20Z" fill="#159447" />
  </svg>
);

export default function UserLogin() {
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/user/dashboard");
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

            <form onSubmit={handleSubmit} className="w-full">

              {/* FULL NAME */}
              <div className="w-full mb-4">
                <label
                  htmlFor="fullName"
                  className="block mb-1.5 text-gray-600 font-sans text-sm font-medium"
                >
                  Full Name
                </label>

                <div className="relative w-full h-11 flex items-center bg-white border border-gray-300 rounded-md focus-within:border-[#0787ff] focus-within:ring-1 focus-within:ring-[#0787ff]">
                  <span className="absolute left-3 shrink-0">
                    <UserIcon />
                  </span>

                  <input
                    id="fullName"
                    type="text"
                    placeholder="Full Name"
                    autoComplete="name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full h-full pl-10 pr-3 border-none outline-none bg-transparent text-[#333] font-sans text-sm placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* MOBILE NUMBER */}
              <div className="w-full mb-2">
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
                  className="min-w-[110px] h-10 px-6 rounded-md bg-[#0787ff] text-white font-sans text-sm font-semibold cursor-pointer transition-colors duration-150 hover:bg-[#0078e6] active:scale-[0.98]"
                >
                  Login
                </button>
              </div>

            </form>
          </div>
        </div>
      </section>
    </main>
  );
}