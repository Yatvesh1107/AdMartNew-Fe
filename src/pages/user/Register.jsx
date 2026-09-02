import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import image7 from "../../assets/images/user/image 7.jpg";
import image2 from "../../assets/images/user/image 2.jpg";
import image8 from "../../assets/images/user/image 8.jpg";
import image5 from "../../assets/images/user/image 5.jpg";
import image6 from "../../assets/images/user/image 6.jpg";

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

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [completed, setCompleted] = useState(false);

  const stages = [
    { id: 1, title: "Address Details", image: image7 },
    { id: 2, title: "ID Details", image: image2 },
    { id: 3, title: "Password Details", image: image8 },
    { id: 4, title: "Payment", image: image5 },
  ];

  const current = stages.find((s) => s.id === step);

  const handleNext = () => {
    if (step === 4) {
      setCompleted(true);
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step === 1) {
      navigate("/user/login");
    } else {
      setStep(step - 1);
    }
  };

  if (completed) {
    return (
      <main className="relative w-full h-screen min-h-screen overflow-hidden">
        <img
          src={image6}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover object-center block"
        />

        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="w-full max-w-md bg-[#dff1ff] rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] p-8 text-center max-md:p-6">
            <div className="flex justify-center mb-6">
              <BrandLogo />
            </div>

            <h1 className="m-0 text-[#111] font-sans text-xl font-bold mb-4">
              Account Under Verification
            </h1>

            <p className="m-0 text-[#4b5563] font-sans text-sm leading-relaxed">
              Your registration is currently under review by the administrator.
              Access will be granted after approval.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex w-full h-screen min-h-screen overflow-hidden bg-white max-md:h-auto max-md:min-h-[100svh] max-md:overflow-y-auto">

      {/* LEFT IMAGE */}
      <section className="relative w-[61.4%] h-screen shrink-0 overflow-hidden max-md:hidden">
        <img
          src={current.image}
          alt={current.title}
          className="w-full h-full object-cover object-center block"
        />
      </section>

      {/* RIGHT FORM */}
      <section className="w-[38.6%] h-screen flex items-center justify-center bg-white overflow-y-auto py-6 max-md:w-full max-md:h-auto max-md:min-h-screen max-md:p-8 max-md:pt-12 max-md:pb-14 max-md:items-start">

        <div className="w-[85%] max-w-[430px] flex flex-col items-center max-md:w-full my-auto">

          {/* LOGO */}
          <div className="w-full flex justify-center mb-8 max-md:mb-6">
            <BrandLogo />
          </div>

          {/* STEP INDICATOR */}
          <div className="w-full flex items-center justify-center mb-6">
            {stages.map((s, idx) => (
              <div key={s.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-sans text-xs font-semibold ${
                      s.id < step
                        ? "bg-green-500 text-white"
                        : s.id === step
                        ? "bg-[#0787ff] text-white"
                        : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    {s.id < step ? "\u2713" : s.id}
                  </div>
                  <span
                    className={`mt-1 font-sans text-[10px] max-md:text-xs ${
                      s.id === step ? "text-[#0787ff] font-semibold" : "text-gray-500"
                    }`}
                  >
                    {s.title.split(" ")[0]}
                  </span>
                </div>

                {idx < stages.length - 1 && (
                  <div
                    className={`w-8 max-md:w-6 h-[2px] mx-1 mt-[-14px] ${
                      s.id < step ? "bg-green-500" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* CARD */}
          <div className="w-full p-6 sm:p-7 bg-[#dff1ff] rounded-lg shadow-[0_1px_2px_rgba(0,0,0,0.16),0_2px_5px_rgba(0,0,0,0.08)]">

            <h1 className="m-0 text-center text-[#111] font-sans text-lg font-bold leading-normal max-md:text-xl mb-1">
              Welcome to our platform
            </h1>

            <h2 className="mt-1 mb-6 text-center text-[#111] font-sans text-base font-bold leading-snug max-md:text-lg">
              {current.title}
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleNext();
              }}
              className="w-full"
            >

              {step === 1 && (
                <div className="w-full space-y-4">
                  {[
                    { id: "house", label: "Flat / House No.", placeholder: "House No." },
                    { id: "street", label: "Area / Street.", placeholder: "Area / Street" },
                    { id: "locality", label: "Colony / Locality", placeholder: "Colony / Locality" },
                    { id: "city", label: "City", placeholder: "City" },
                    { id: "state", label: "State", placeholder: "State" },
                    { id: "pincode", label: "Pincode", placeholder: "Pincode", type: "number" },
                  ].map((f) => (
                    <div key={f.id} className="w-full">
                      <label
                        htmlFor={f.id}
                        className="block mb-1.5 text-gray-600 font-sans text-sm font-medium"
                      >
                        {f.label}
                      </label>
                      <input
                        id={f.id}
                        type={f.type || "text"}
                        placeholder={f.placeholder}
                        className="w-full h-11 px-3 bg-white border border-gray-300 rounded-md outline-none text-[#333] font-sans text-sm placeholder:text-gray-400 focus:border-[#0787ff] focus:ring-1 focus:ring-[#0787ff]"
                      />
                    </div>
                  ))}
                </div>
              )}

              {step === 2 && (
                <div className="w-full space-y-4">
                  {[
                    { id: "aadhar", label: "Aadhaar Number", placeholder: "Aadhaar Number" },
                    { id: "pan", label: "PAN Card Number", placeholder: "PAN Card Number" },
                  ].map((f) => (
                    <div key={f.id} className="w-full">
                      <label
                        htmlFor={f.id}
                        className="block mb-1.5 text-gray-600 font-sans text-sm font-medium"
                      >
                        {f.label}
                      </label>
                      <input
                        id={f.id}
                        type="text"
                        placeholder={f.placeholder}
                        className="w-full h-11 px-3 bg-white border border-gray-300 rounded-md outline-none text-[#333] font-sans text-sm placeholder:text-gray-400 focus:border-[#0787ff] focus:ring-1 focus:ring-[#0787ff]"
                      />
                    </div>
                  ))}

                  {[
                    { id: "aadharFront", label: "Aadhaar Front Photo" },
                    { id: "aadharBack", label: "Aadhaar Back Photo" },
                    { id: "panPhoto", label: "PAN Card Photo" },
                  ].map((f) => (
                    <div key={f.id} className="w-full">
                      <label
                        htmlFor={f.id}
                        className="block mb-1.5 text-gray-600 font-sans text-sm font-medium"
                      >
                        {f.label}
                      </label>
                      <input
                        id={f.id}
                        type="file"
                        accept="image/*"
                        className="w-full h-11 px-3 bg-white border border-gray-300 rounded-md text-[#333] font-sans text-sm file:mr-3 file:border-0 file:bg-[#0787ff] file:text-white file:text-xs file:font-semibold file:py-2 file:px-3 file:rounded file:cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              )}

              {step === 3 && (
                <div className="w-full space-y-4">
                  {[
                    { id: "password", label: "Password", placeholder: "Password", type: "password" },
                    { id: "confirmPassword", label: "Confirm Password", placeholder: "Confirm Password", type: "password" },
                    { id: "referral", label: "Referral Code (optional)", placeholder: "Referral Code", type: "text", optional: true },
                  ].map((f) => (
                    <div key={f.id} className="w-full">
                      <label
                        htmlFor={f.id}
                        className="block mb-1.5 text-gray-600 font-sans text-sm font-medium"
                      >
                        {f.label}
                      </label>
                      <input
                        id={f.id}
                        type={f.type}
                        placeholder={f.placeholder}
                        className="w-full h-11 px-3 bg-white border border-gray-300 rounded-md outline-none text-[#333] font-sans text-sm placeholder:text-gray-400 focus:border-[#0787ff] focus:ring-1 focus:ring-[#0787ff]"
                      />
                    </div>
                  ))}
                </div>
              )}

              {step === 4 && (
                <div className="w-full space-y-4">
                  <div className="w-full flex flex-col items-center">
                    <label className="block mb-1.5 text-gray-600 font-sans text-sm font-medium w-full">
                      Scan QR Code to Pay
                    </label>
                    <div className="w-44 h-44 bg-white border border-gray-300 rounded-md flex items-center justify-center text-gray-400 font-sans text-xs">
                      QR CODE
                    </div>
                  </div>

                  <div className="w-full">
                    <label
                      htmlFor="paymentScreenshot"
                      className="block mb-1.5 text-gray-600 font-sans text-sm font-medium"
                    >
                      Upload Payment Screenshot
                    </label>
                    <input
                      id="paymentScreenshot"
                      type="file"
                      accept="image/*"
                      className="w-full h-11 px-3 bg-white border border-gray-300 rounded-md text-[#333] font-sans text-sm file:mr-3 file:border-0 file:bg-[#0787ff] file:text-white file:text-xs file:font-semibold file:py-2 file:px-3 file:rounded file:cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {/* NAV BUTTONS */}
              <div className="flex items-center justify-between mt-6">
                <button
                  type="button"
                  onClick={handleBack}
                  className="min-w-[100px] h-10 px-6 rounded-md bg-white border border-[#0787ff] text-[#0787ff] font-sans text-sm font-semibold cursor-pointer transition-colors duration-150 hover:bg-[#eaf4ff] active:scale-[0.98]"
                >
                  Back
                </button>

                <button
                  type="submit"
                  className="min-w-[110px] h-10 px-6 rounded-md bg-[#0787ff] text-white font-sans text-sm font-semibold cursor-pointer transition-colors duration-150 hover:bg-[#0078e6] active:scale-[0.98]"
                >
                  {step === 4 ? "Submit" : "Next"}
                </button>
              </div>

            </form>

            <div className="mt-4 text-center text-[#333] font-sans text-sm leading-normal">
              Already have an account?{" "}
              <Link to="/user/login" className="text-[#111] no-underline font-semibold hover:underline">
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}