import React from "react";
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 text-sm py-8 top-full">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">

        {/* Corporate Info */}
        <div>
          <h3 className="text-white font-semibold mb-3">Corporate</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white">About Us</a></li>
            <li><a href="#" className="hover:text-white">Careers</a></li>
            <li><a href="#" className="hover:text-white">Press Release</a></li>
            <li><a href="#" className="hover:text-white">Affiliate Program</a></li>
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h3 className="text-white font-semibold mb-3">Policies</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-white">Return & Exchange</a></li>
            <li><a href="#" className="hover:text-white">Shipping Policy</a></li>
          </ul>
        </div>

        {/* Help & Support */}
        <div>
          <h3 className="text-white font-semibold mb-3">Customer Service</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white">My Account</a></li>
            <li><a href="#" className="hover:text-white">Track Order</a></li>
            <li><a href="#" className="hover:text-white">Wishlist</a></li>
            <li><a href="#" className="hover:text-white">FAQs</a></li>
            <li><a href="#" className="hover:text-white">Contact Us</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white font-semibold mb-3">Reach Us</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <Mail size={16} /> support@fashionshop.com
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} /> +91 98765 43210
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} /> Mumbai, India
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 my-6"></div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-400 text-xs text-center md:text-left">
          © {new Date().getFullYear()} FashionShop Pvt. Ltd. | All Rights Reserved.
        </p>

        <div className="flex space-x-4">
          <a href="#" className="hover:text-white"><Facebook size={18} /></a>
          <a href="#" className="hover:text-white"><Instagram size={18} /></a>
          <a href="#" className="hover:text-white"><Twitter size={18} /></a>
          <a href="#" className="hover:text-white"><Youtube size={18} /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
