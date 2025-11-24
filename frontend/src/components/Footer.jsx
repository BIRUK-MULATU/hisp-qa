import React from "react";
import logo from "../assets/hisp.png";

function Footer() {
  return (
    <footer className="bg-[#004B87] text-white py-8 mt-12">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        
        {/* Logo and Description */}
        <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
          <img src={logo} alt="HISP Ethiopia Logo" className="h-12 mb-2" />
          <p className="text-center md:text-left text-sm">
            HISP Ethiopia - Empowering Digital Health Solutions Across the Country
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col md:flex-row gap-6 text-sm">
          <a href="/" className="hover:underline">Home</a>
          <a href="/questions" className="hover:underline">Questions</a>
          <a href="/about" className="hover:underline">About</a>
          <a href="/contact" className="hover:underline">Contact</a>
        </div>
      </div>

      <div className="text-center mt-6 text-xs text-gray-300">
        &copy; {new Date().getFullYear()} HISP Ethiopia. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
