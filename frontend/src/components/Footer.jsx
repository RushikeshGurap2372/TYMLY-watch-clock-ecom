import React from "react";
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    // Uses the dark theme as requested: bg-gray-900
    <footer className="mt-auto bg-gray-900 text-gray-300 text-sm py-8 top-full">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 ">

        {/* Corporate Info */}
        <div>
          <h3 className="text-white font-semibold mb-3">The Watch House</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-amber-400">Our Heritage</a></li>
            <li><a href="#" className="hover:text-amber-400">Watch Servicing</a></li>
            <li><a href="#" className="hover:text-amber-400">Sell Your Watch</a></li>
            <li><a href="#" className="hover:text-amber-400">Dealer Network</a></li>
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h3 className="text-white font-semibold mb-3">Client Policies</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-amber-400">Authenticity Guarantee</a></li>
            <li><a href="#" className="hover:text-amber-400">Warranty Terms</a></li>
            <li><a href="#" className="hover:text-amber-400">Return & Exchange</a></li>
            <li><a href="#" className="hover:text-amber-400">Shipping Insurance</a></li>
          </ul>
        </div>

        {/* Help & Support */}
        <div>
          <h3 className="text-white font-semibold mb-3">Client Services</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-amber-400">My Account</a></li>
            <li><a href="#" className="hover:text-amber-400">Track Shipment</a></li>
            <li><a href="#" className="hover:text-amber-400">Appraisal Services</a></li>
            <li><a href="#" className="hover:text-amber-400">Contact Horology Expert</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white font-semibold mb-3">Reach Our Boutique</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-amber-400" /> support@timepiece.com
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-amber-400" /> +91 98765 43210
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} className="text-amber-400" /> Geneva, Switzerland
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 my-6"></div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-400 text-xs text-center md:text-left">
          © {new Date().getFullYear()} Timepiece Co. | All Rights Reserved.
        </p>

        <div className="flex space-x-4">
          <a href="#" className="hover:text-amber-400"><Facebook size={18} /></a>
          <a href="#" className="hover:text-amber-400"><Instagram size={18} /></a>
          <a href="#" className="hover:text-amber-400"><Twitter size={18} /></a>
          <a href="#" className="hover:text-amber-400"><Youtube size={18} /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;