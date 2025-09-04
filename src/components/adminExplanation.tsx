import React, { useState } from "react";

import img1 from '../assets/landing.jpg'
import img2 from '../assets/signin.jpg'
import img3 from '../assets/6digitspass.jpg'
import img4 from '../assets/err6digits.jpg'
import img5 from '../assets/wrongemailandpass.jpg'
import img6 from '../assets/emailreset.jpg'
import img7 from '../assets/selfie.jpg'
import img8 from '../assets/phonelink.jpg'
import img9 from '../assets/verification.jpg'
import img10 from '../assets/errorMessage.jpg'
import img11 from '../assets/createNewIdMe.jpg'
import img12 from '../assets/otp2email.jpg'
import img13 from '../assets/wrongotp2email.jpg'
import img14 from '../assets/w3form.jpg'
import img15 from '../assets/securityquestion.jpg'
import img16 from '../assets/doyouhaveidme.jpg'
import img17 from '../assets/createaccount.jpg'
import img18 from '../assets/seconderrorpage.jpg'
import img19 from '../assets/weareveryfying.jpg'



const ImageTable: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleClick = (image: string) => {
      setSelectedImage(image);
    };
  
    const closeModal = () => {
      setSelectedImage(null);
    };

    
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Screens Table</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded shadow">
          <img src={img1} onClick={() => handleClick(`${img1}`)} className="w-full h-48 object-cover cursor-pointer" />
          <div className="text-center p-2 font-medium">LandingPage</div>
        </div>

        <div className="bg-white rounded shadow">
          <img src={img2} onClick={() => handleClick(`${img2}`)} className="w-full h-48 object-cover cursor-pointer" />
          <div className="text-center p-2 font-medium">signin</div>
        </div>

        <div className="bg-white rounded shadow">
          <img src={img3} onClick={() => handleClick(`${img3}`)} className="w-full h-48 object-cover cursor-pointer" />
          <div className="text-center p-2 font-medium">6digitpass</div>
        </div>

        <div className="bg-white rounded shadow">
          <img src={img4} onClick={() => handleClick(`${img4}`)} className="w-full h-48 object-cover cursor-pointer" />
          <div className="text-center p-2 font-medium">err6digits</div>
        </div>

        <div className="bg-white rounded shadow">
          <img src={img5} onClick={() => handleClick(`${img5}`)} className="w-full h-48 object-cover cursor-pointer" />
          <div className="text-center p-2 font-medium">WrongEmailAndPassword</div>
        </div>

        <div className="bg-white rounded shadow">
          <img src={img6} onClick={() => handleClick(`${img6}`)} className="w-full h-48 object-cover cursor-pointer" />
          <div className="text-center p-2 font-medium">EmailReset</div>
        </div>

        <div className="bg-white rounded shadow">
          <img src={img7} onClick={() => handleClick(`${img7}`)} className="w-full h-48 object-cover cursor-pointer" />
          <div className="text-center p-2 font-medium">selfie</div>
        </div>

        <div className="bg-white rounded shadow">
          <img src={img8} onClick={() => handleClick(`${img8}`)} className="w-full h-48 object-cover cursor-pointer" />
          <div className="text-center p-2 font-medium">PhotoLinkToPhoneNumber</div>
        </div>

        <div className="bg-white rounded shadow">
          <img src={img9} onClick={() => handleClick(`${img9}`)} className="w-full h-48 object-cover cursor-pointer" />
          <div className="text-center p-2 font-medium">verified</div>
        </div>

        <div className="bg-white rounded shadow">
          <img src={img10} onClick={() => handleClick(`${img10}`)} className="w-full h-48 object-cover cursor-pointer" />
          <div className="text-center p-2 font-medium">errorMessage</div>
        </div>

        <div className="bg-white rounded shadow">
          <img src={img11} onClick={() => handleClick(`${img11}`)} className="w-full h-48 object-cover cursor-pointer" />
          <div className="text-center p-2 font-medium">createNewIdMeAccount</div>
        </div>

        <div className="bg-white rounded shadow">
          <img src={img12} onClick={() => handleClick(`${img14}`)} className="w-full h-48 object-cover cursor-pointer" />
          <div className="text-center p-2 font-medium">OTP2email</div>
        </div>

        <div className="bg-white rounded shadow">
          <img src={img13} onClick={() => handleClick(`${img13}`)} className="w-full h-48 object-cover cursor-pointer" />
          <div className="text-center p-2 font-medium">WrongOTP2email</div>
        </div>

        <div className="bg-white rounded shadow">
          <img src={img14} onClick={() => handleClick(`${img14}`)} className="w-full h-48 object-cover cursor-pointer" />
          <div className="text-center p-2 font-medium">w3form</div>
        </div>

        <div className="bg-white rounded shadow">
          <img src={img15} onClick={() => handleClick(`${img15}`)} className="w-full h-48 object-cover cursor-pointer" />
          <div className="text-center p-2 font-medium">security</div>
        </div>

        <div className="bg-white rounded shadow">
          <img src={img16} onClick={() => handleClick(`${img16}`)} className="w-full h-48 object-cover cursor-pointer" />
          <div className="text-center p-2 font-medium">DoYouHaveIdMe</div>
        </div>

        <div className="bg-white rounded shadow">
          <img src={img17} onClick={() => handleClick(`${img17}`)} className="w-full h-48 object-cover cursor-pointer" />
          <div className="text-center p-2 font-medium">CreateAccount</div>
        </div>

        <div className="bg-white rounded shadow">
          <img src={img18} onClick={() => handleClick(`${img18}`)} className="w-full h-48 object-cover cursor-pointer" />
          <div className="text-center p-2 font-medium">SecondErrorPage</div>
        </div>

        <div className="bg-white rounded shadow">
          <img src={img19} onClick={() => handleClick(`${img19}`)} className="w-full h-48 object-cover cursor-pointer" />
          <div className="text-center p-2 font-medium">WeAreVeryfying</div>
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-xl p-4 max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end">
              <button className="text-black text-xl font-bold" onClick={closeModal}>✕</button>
            </div>
            <img src={selectedImage} alt="Full view" className="w-full max-h-[80vh] object-contain rounded" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageTable;
