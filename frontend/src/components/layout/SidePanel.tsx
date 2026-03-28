"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";

interface SidePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com/danishinternational" },
  { icon: Instagram, href: "https://instagram.com/danishinternational" },
  { icon: Twitter, href: "https://twitter.com/danishinternational" },
  { icon: Linkedin, href: "https://linkedin.com/company/danishinternational" },
  { icon: Youtube, href: "https://youtube.com/danishinternational" },
];

const SidePanel: React.FC<SidePanelProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-screen w-full max-w-[400px] bg-white z-[70] shadow-2xl p-10 flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-2xl font-bold text-color-3 tracking-tight">Information</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6 text-color-3" />
              </button>
            </div>

            {/* Contact Details */}
            <div className="space-y-8 flex-1">
              <div className="flex gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-color-1/10 flex items-center justify-center group-hover:bg-color-1 group-hover:text-white transition-all duration-300">
                  <MapPin className="w-5 h-5 text-color-1 group-hover:text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-color-4 uppercase tracking-widest mb-1">Our Address</h3>
                  <p className="text-color-3 font-medium leading-relaxed">
                    123 Medical Avenue, Healthcare City, <br /> Lahore, Pakistan
                  </p>
                </div>
              </div>

              <div className="flex gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-color-1/10 flex items-center justify-center group-hover:bg-color-1 group-hover:text-white transition-all duration-300">
                  <Phone className="w-5 h-5 text-color-1 group-hover:text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-color-4 uppercase tracking-widest mb-1">Call Us</h3>
                  <p className="text-color-3 font-medium">(+92) 423-5923982</p>
                </div>
              </div>

              <div className="flex gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-color-1/10 flex items-center justify-center group-hover:bg-color-1 group-hover:text-white transition-all duration-300">
                  <Mail className="w-5 h-5 text-color-1 group-hover:text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-color-4 uppercase tracking-widest mb-1">Email Us</h3>
                  <p className="text-color-3 font-medium lowercase">info@danish-international.com</p>
                </div>
              </div>

              {/* Enquiry Button */}
              <div className="pt-6">
                <button className="w-full h-14 bg-color-3 text-white rounded-xl font-bold hover:bg-color-1 transition-all duration-300 flex items-center justify-center gap-2">
                  Send Enquiry
                </button>
              </div>
            </div>

            {/* Social Icons */}
            <div className="pt-10 border-t border-gray-100">
              <h3 className="text-sm font-semibold text-color-4 uppercase tracking-widest mb-6">Follow Us</h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-color-3 hover:bg-color-1 hover:text-white hover:scale-110 transition-all duration-300"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SidePanel;
