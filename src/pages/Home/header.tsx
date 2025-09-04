import {  useNavigate } from 'react-router-dom';
import logo from '../../assets/logo-removebg-preview.png'
import bg from '../../assets/pexels-photo-3184405.webp'
import { useEffect, useState } from 'react';

const Header = () => {
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
    console.log(progress)
    let progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) return prev + 10;
        clearInterval(progressInterval);
        setTimeout(() => {
          navigate('/apply');
        }, 3000); // Delay after progress reaches 100
        return 100;
      });
    }, 300); // Updates progress every 300ms
  };



  return (
    <header className="border-b shadow">
      {/* Main header section with background image */}
        {/* E-Verify logo and text */}
        <div className="flex items-center bg-[#05014A] space-x-2">
          <div className="flex items-center space-x-1">
            <img src={logo} alt="logo"  />
          </div>
        </div>


        <div
  className=" px-4 py-3 max-w-7xl mx-auto bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: `url(${bg})` }}
>

 {/* System Human Resource Services */}

 <div className='flex flex-row mb-8  md:flex-row items-center justify-between'>

<div className="mt-2 md:mt-0 w-1/2 text-left">
<p className="text-2xl font-medium text-white">
    System Human Resource Services
  </p>
 
</div>

        {/* Menu button */}
        <div className="mt-2 md:mt-0">
          <button className="bg-blue-900 text-white text-sm font-medium px-4 py-2 rounded">
            ≡ MENU
          </button>
        </div>
 </div>

 <div>
      {loading && (
        <div className="fixed inset-0 bg-white flex flex-col justify-center items-center z-50">
           <p className='text-sm text-green-600 font-bold mb-9'>{message}</p>

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

      <div
        onClick={handleClick}
        className="cursor-pointer text-white bg-[#05014A] w-[200px] text-sm font-semibold px-4 py-2 text-center"
      >
        Start verification process now
      </div>
    </div>

      </div>

      {/* Start Verification Section with background image */}
    
    </header>
  );
};

export default Header;
