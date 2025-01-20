import React from 'react';
import { CgFacebook } from 'react-icons/cg';

import { BsInstagram, BsLinkedin, BsTwitter } from 'react-icons/bs';
const Footer = () => {
  return (
    <div>
    <footer className="bg-green-700 text-white mt-8 ">
        <div className="container mx-auto flex flex-wrap justify-between py-8 px-6 space-y-6 md:space-y-0">
            <div className="min-w-[200px]"  id="about">
                <h3 className="text-lg font-bold mb-2">About Us</h3>
                <p className="text-sm">Your one-stop shop for fresh vegetables, fruits, and essentials delivered straight to your home.</p>
            </div>
            <div className="min-w-[200px]">
                <h3 className="text-lg font-bold mb-2">Quick Links</h3>
                <ul className="text-sm space-y-2">
                    <li><a href="privacy.html" className="hover:underline">Privacy Policy</a></li>
                    <li><a href="terms.html" className="hover:underline">Terms & Conditions</a></li>
                    <li><a href="faq.html" className="hover:underline">FAQ</a></li>
                </ul>
            </div>
            <div className="min-w-[200px]"  id="contact">
                <h3 className="text-lg font-bold mb-2">Contact Us</h3>
                <p className="text-sm">Email: support@shopontrack.com</p>
                <p className="text-sm">Phone: +123-456-7890</p>
            </div>
            <div className="min-w-[200px]">
                <h3 className="text-lg font-bold mb-2">Follow Us</h3>
                <div className="flex space-x-4">
                    <a href="#" className="text-white text-xl hover:text-gray-300"><i className="fab fa-facebook"></i></a>
                    <a href="#" className="text-white text-xl hover:text-gray-300"><i className="fab fa-twitter"></i></a>
                    <a href="#" className="text-white text-xl hover:text-gray-300"><i className="fab fa-instagram"></i></a>
                </div>
            </div>
        </div>
        <div className="bg-green-800 text-center py-4">
            <p className="text-sm">&copy; 2025 Shop On Track. All Rights Reserved.</p>
        </div>
    </footer>
    </div>
  );
};

export default Footer;
