import React from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
// import { FaLinkedin, FaYoutube } from "react-icons/fa6";
import logo from '../../assets/logo-removebg-preview.png'

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0f2544] text-white pt-10 pb-6 px-6 relative">
      <div className="max-w-5xl mx-auto text-center space-y-4">
        {/* Logo Section */}
        <img src={logo}
        width="200" />

        {/* Title */}
        <h3 className="text-lg font-medium">System Human Resource Services</h3>

        {/* Social Media Icons */}
        <div className="flex justify-center gap-4 mt-4 text-xl">
          <FaFacebookF className="cursor-pointer hover:text-blue-500" />
          <FaInstagram className="cursor-pointer hover:text-pink-500" />
          <button className="bg-white text-[#0f2544] px-3 py-1 rounded-full text-sm font-medium">
            LinkedIn
          </button>
          <button className="bg-white text-[#0f2544] px-3 py-1 rounded-full text-sm font-medium">
            YouTube
          </button>
        </div>

        {/* Compliance Note */}
        <p className="text-sm italic mt-4">
          In compliance with the official website of the U.S. Department of Homeland Security.
        </p>

        {/* Copyright */}
        <p className="text-sm">
          © Copyright 2024 Employment Verification Service
        </p>
      </div>

      {/* Scroll to Top Button */}
    
    </footer>
  );
};

export default Footer;
