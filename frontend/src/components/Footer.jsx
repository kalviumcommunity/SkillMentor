// src/components/Footer.jsx
import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-10">
      <div className="max-w-4xl mx-auto px-4 flex flex-col items-center text-center gap-4">
        <p className="text-lg">© 2025 Skill Mentor. Empowering learning through mentorship.</p>

        <div className="flex gap-4 text-xl">
          <a href="#" className="hover:text-blue-400"><FaFacebook /></a>
          <a href="#" className="hover:text-pink-400"><FaInstagram /></a>
          <a href="#" className="hover:text-blue-300"><FaTwitter /></a>
          <a href="#" className="hover:text-blue-500"><FaLinkedin /></a>
        </div>

        <div className="text-sm text-gray-400">
          <a href="#" className="hover:underline px-2">About</a>|
          <a href="#" className="hover:underline px-2">Contact</a>|
          <a href="#" className="hover:underline px-2">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
