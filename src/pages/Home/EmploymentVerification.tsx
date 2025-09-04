import React, { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import {  useNavigate } from 'react-router-dom';

const EmploymentVerification: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const [message, setMessage] = useState("Please wait...");

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("Initiated advanced security protocols...");
    }, 3000);

    return () => clearTimeout(timer); // Cleanup if component unmounts
  }, []);


  const handleClick = () => {
    setLoading(true);
    let progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) return prev + 10;
        clearInterval(progressInterval);
        setTimeout(() => {
          navigate('/apply');
          console.log(progress)
        }, 30000); // Delay after progress reaches 100
        return 100;
      });
    }, 300); // Updates progress every 300ms
  };



  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative bg-gray-50 text-gray-800 px-6 py-10 max-w-3xl mx-auto rounded-xl shadow-lg font-inter">
      <h1 className="text-3xl font-extrabold mb-6 text-blue-800">Employment Verification System</h1>

      <section className="space-y-5 text-[15px] leading-relaxed">
        <div>
          <h2 className="text-xl font-semibold text-blue-600 mb-2">About this service</h2>
          <p className='font-semibold text-gray-500 mb-8'>
            E-Verify, authorized by the Illegal Immigration Reform and Immigrant Responsibility Act of 1996 (IIRIRA),
            is a web-based system through which employers electronically confirm the employment eligibility of their employees.
          </p>
        </div>

        <p className='font-semibold text-gray-500 mb-8'>
          In the E-Verify process, employers create cases based on information taken from an employee’s Form I-9, Employment Eligibility Verification.
          E-Verify then electronically compares that information to records available to the U.S. Department of Homeland Security (DHS)
          and the Social Security Administration (SSA). The employer usually receives a response within a few seconds either confirming
          the employee’s employment eligibility or indicating that the employee needs to take further action to complete the case.
        </p>

        <p className='font-semibold text-gray-500 mb-8'>
          E-Verify is administered by SSA and U.S. Citizenship and Immigration Services (USCIS). USCIS facilitates compliance with U.S. immigration law
          by providing E-Verify program support, user support, training and outreach, and developing innovative technological solutions
          in employment eligibility verification.
        </p>

        <div>
      {loading && (
        <div className="fixed inset-0 bg-white flex flex-col justify-center items-center z-50">
 <p className="text-sm text-green-600 font-bold mb-9">
      {message}
    </p>
<p className='text-2xl  font-bold mb-9'>Loading... </p>


          <div className="w-3/4 max-w-xl">
            <div className="h-2 bg-gray-200 rounded-full">
             
              {/* <div
                className="h-2 bg-blue-500 rounded-full"
                style={{ width: `${progress}%`, transition: 'width 0.3s ease-in-out' }}
              ></div> */}

              

<div className="w-full h-2 bg-gray-300 overflow-hidden rounded-full">
  <div className="h-full bg-blue-500 animate-loading-bar"></div>
</div>


            </div>
            {/* <p className="mt-4 text-blue-600 font-medium">{`${progress}%`}</p> */}
          </div>
        </div>
      )}


<div className="space-y-4 text-gray-700  mb-5 text-base leading-relaxed">
  <p>
    Visit the E-Verify data page for in-depth information on E-Verify, including performance and usage statistics, reports, system enhancements, and the participating employer search tool. See FAQ below to read more.
  </p>
  
  <p className="font-semibold">
    Know the basic legal requirements.
  </p>
  
  <p>
    For all U.S hires, completing the Employment Eligibility Verification Form or Form I-9, is one of the key identity verification requirements that all employers must complete. Non-compliance can result in fines and criminal penalties. The form requires employees to present documentation that proves their identity and their eligibility to legally work in the United States. This is a typical requirement in an on-site work environment.
  </p>
  
  <p>
    Employers in a WFH setup must have a process in place for new hires to submit acceptable identification papers, so you may verify them for validity. Using a paperless I-9 form with your pre employment background check company is a great method to complete the process while staying compliant.
  </p>
</div>

<p className='text-blue-800 text-xl font-semibold mb-5'>Take Action</p>
<div onClick={handleClick} className='bg-green-700 px-5 py-2 text-center text-white'>Complete verification process for an employer now</div>
    </div>


        <div className='bg-gray-300 p-4 text-semibold'>NOTE: After completion, Your Employment verification statement will open a secured PDF in a new window in your browser. You may need to allow pop-ups from this site to view or print your statement</div>
      </section>

      {/* Always Visible & Animated Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-xl hover:bg-blue-700 transition-all duration-300  z-50"
        aria-label="Back to top"
      >
        <FaArrowUp size={24} />
      </button>
    </div>
  );
};

export default EmploymentVerification;
