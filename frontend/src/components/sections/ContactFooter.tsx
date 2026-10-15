"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { COMPANY_INFO } from "@/lib/data";
import Footer from "@/components/layout/Footer";

export default function ContactFooter() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitStatus("success");
    setTimeout(() => {
      setSubmitStatus("idle");
      setFormState({ name: "", email: "", phone: "", organization: "", message: "" });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const inputClasses =
    "w-full px-4 py-2.5 rounded-lg bg-zinc-50 border border-zinc-200 focus:border-[#C41E3A] focus:ring-2 focus:ring-[#C41E3A]/15 text-sm text-zinc-900 placeholder-zinc-400 transition-all outline-none";

  return (
    <>
      {/* Contact Section */}
      <section id="contact" className="relative py-24 bg-zinc-50 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-rose-50/60 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4 mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-zinc-200 mx-auto shadow-xs">
              <MessageSquare className="w-3.5 h-3.5 text-[#C41E3A]" />
              <span className="text-xs font-semibold text-zinc-700">Get In Touch</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold text-zinc-950 tracking-tight">
              Let's Discuss Your <span className="brand-text-gradient">Requirements</span>
            </h2>

            <p className="text-base text-zinc-600 max-w-2xl mx-auto">
              Whether you're planning a new hot lab, upgrading Linac QA systems, or need preventive maintenance — reach out to our team.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 space-y-5"
            >
              {/* Address Card */}
              <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#C41E3A]/10 border border-[#C41E3A]/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#C41E3A]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-zinc-950 mb-1">Visit Our Office</h3>
                    <p className="text-sm text-zinc-600 leading-relaxed">
                      {COMPANY_INFO.contact.address}
                      <br />
                      {COMPANY_INFO.contact.city}, {COMPANY_INFO.contact.country} {COMPANY_INFO.contact.postalCode}
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone Card */}
              <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#C41E3A]/10 border border-[#C41E3A]/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#C41E3A]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-zinc-950 mb-2">Call or Text</h3>
                    <div className="space-y-1.5">
                      <a
                        href={`tel:${COMPANY_INFO.contact.phone}`}
                        className="block text-sm text-zinc-700 hover:text-[#C41E3A] transition-colors font-medium"
                      >
                        {COMPANY_INFO.contact.phone}
                      </a>
                      <a
                        href={`tel:${COMPANY_INFO.contact.mobile}`}
                        className="block text-sm text-zinc-700 hover:text-[#C41E3A] transition-colors font-medium"
                      >
                        {COMPANY_INFO.contact.mobile}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#C41E3A]/10 border border-[#C41E3A]/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#C41E3A]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-zinc-950 mb-2">Email Us</h3>
                    <div className="space-y-1.5">
                      <a
                        href={`mailto:${COMPANY_INFO.contact.email}`}
                        className="block text-sm text-zinc-700 hover:text-[#C41E3A] transition-colors break-all font-medium"
                      >
                        {COMPANY_INFO.contact.email}
                      </a>
                      <a
                        href={`mailto:${COMPANY_INFO.contact.supportEmail}`}
                        className="block text-sm text-zinc-700 hover:text-[#C41E3A] transition-colors break-all font-medium"
                      >
                        {COMPANY_INFO.contact.supportEmail}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hours Card */}
              <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#C41E3A]/10 border border-[#C41E3A]/20 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-[#C41E3A]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-zinc-950 mb-1">Business Hours</h3>
                    <p className="text-sm text-zinc-600">{COMPANY_INFO.contact.hours}</p>
                    <p className="text-xs text-zinc-400 mt-1">Emergency support available 24/7</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-white border border-zinc-200 shadow-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-zinc-800 mb-2">
                      Full Name <span className="text-[#C41E3A]">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className={inputClasses}
                      placeholder="Dr. Ahmed Khan"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-zinc-800 mb-2">
                      Email Address <span className="text-[#C41E3A]">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className={inputClasses}
                      placeholder="ahmed@hospital.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-zinc-800 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formState.phone}
                      onChange={handleChange}
                      className={inputClasses}
                      placeholder="+92 300 1234567"
                    />
                  </div>
                  <div>
                    <label htmlFor="organization" className="block text-sm font-medium text-zinc-800 mb-2">
                      Organization / Hospital
                    </label>
                    <input
                      type="text"
                      id="organization"
                      name="organization"
                      value={formState.organization}
                      onChange={handleChange}
                      className={inputClasses}
                      placeholder="Shaukat Khanum Cancer Hospital"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-zinc-800 mb-2">
                    Your Message <span className="text-[#C41E3A]">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className={`${inputClasses} resize-none`}
                    placeholder="Describe your project requirements, equipment needs, or technical inquiry..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitStatus === "success"}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#C41E3A] hover:bg-[#9E1B32] disabled:bg-emerald-600 transition-all text-sm font-semibold text-white shadow-md shadow-[#C41E3A]/20 disabled:cursor-not-allowed"
                >
                  {submitStatus === "success" ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Message Sent Successfully
                    </>
                  ) : submitStatus === "error" ? (
                    <>
                      <AlertCircle className="w-4 h-4" />
                      Please Try Again
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Inquiry
                    </>
                  )}
                </button>

                <p className="text-xs text-zinc-500 text-center mt-4">
                  We typically respond within 24 hours during business days. For urgent matters, please call directly.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
