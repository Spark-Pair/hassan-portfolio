import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { PERSONAL_INFO } from '../constants';

export const ContactSection = () => {
  const form = useRef(); // Create a reference to the form
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) newErrors.email = "Enter a valid email";
    if (formData.message.length < 10) newErrors.message = "Message is a bit too short";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Replace these three strings with your actual EmailJS credentials
    const SERVICE_ID = "service_cs5t4rw";
    const TEMPLATE_ID = "template_tcwp0qd";
    const PUBLIC_KEY = "DA2bCwlGFNetx3R5i";

    try {
      await emailjs.sendForm(
        SERVICE_ID, 
        TEMPLATE_ID, 
        form.current, 
        PUBLIC_KEY
      );
      
      setIsSent(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error("Email Error:", error);
      alert("Submission failed. Please try again or email hassan@sparkpair.dev directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user types
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  return (
    // Changed to h-screen and overflow-hidden to prevent scrolling
    <div className="w-full h-screen bg-black text-white flex items-center justify-center px-10 md:px-20 overflow-hidden">
      <div className="max-w-[1400px] w-full mx-auto">
        
        {/* Header Section - Reduced margins for fit */}
        <div className="mb-16">
          <p className="text-[10px] font-black tracking-[0.8em] uppercase text-indigo-500 mb-4">Connect / Collaboration</p>
          <h2 className="expand-cursor text-6xl md:text-[8vw] font-condensed uppercase leading-[0.8] tracking-tighter">
            Let's Build <br /> Something Real.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Contact Form */}
          <div className="lg:col-span-7">
            <form ref={form} onSubmit={handleSubmit} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Name Field */}
                <div className={`space-y-2 border-b pb-4 transition-colors duration-500 ${errors.name ? 'border-red-500/50' : 'border-white/10 focus-within:border-indigo-500'}`}>
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-black tracking-widest uppercase opacity-40">Full Name</label>
                    {errors.name && <span className="text-[10px] text-red-500 uppercase font-bold tracking-tighter animate-pulse">{errors.name}</span>}
                  </div>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    placeholder="Enter your name"
                    onChange={handleChange}
                    className="w-full bg-transparent border-none outline-none text-xl font-light placeholder:text-zinc-500 placeholder:opacity-50" 
                  />
                </div>

                {/* Email Field */}
                <div className={`space-y-2 border-b pb-4 transition-colors duration-500 ${errors.email ? 'border-red-500/50' : 'border-white/10 focus-within:border-indigo-500'}`}>
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-black tracking-widest uppercase opacity-40">Email Address</label>
                    {errors.email && <span className="text-[10px] text-red-500 uppercase font-bold tracking-tighter animate-pulse">{errors.email}</span>}
                  </div>
                  <input 
                    // type="email" 
                    name="email"
                    value={formData.email}
                    placeholder="Email @ address"
                    onChange={handleChange}
                    className="w-full bg-transparent border-none outline-none text-xl font-light placeholder:text-zinc-500 placeholder:opacity-50" 
                  />
                </div>
              </div>

              {/* Message Field */}
              <div className={`space-y-2 border-b pb-4 transition-colors duration-500 ${errors.message ? 'border-red-500/50' : 'border-white/10 focus-within:border-indigo-500'}`}>
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black tracking-widest uppercase opacity-40">Your Message</label>
                  {errors.message && <span className="text-[10px] text-red-500 uppercase font-bold tracking-tighter animate-pulse">{errors.message}</span>}
                </div>
                <textarea 
                  name="message"
                  value={formData.message}
                  rows="3"
                  placeholder="Tell me about your project..."
                  onChange={handleChange}
                  className="w-full bg-transparent border-none outline-none text-xl font-light placeholder:text-zinc-500 placeholder:opacity-50 resize-none"
                ></textarea>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="group flex items-center gap-4 text-xs font-black uppercase tracking-[0.3em] hover:text-indigo-400 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Dispatching..." : "Send Inquiry"}
                <span className={`h-[1px] bg-white group-hover:bg-indigo-400 transition-all duration-700 ease-in-out ${isSubmitting ? 'w-20 bg-indigo-500 animate-pulse' : 'w-12 group-hover:w-20'}`}></span>
              </button>
            </form>
          </div>

          {/* Right: Info & Socials */}
          <div className="lg:col-span-4 lg:col-start-9 space-y-12 border-l border-white/5 pl-12 hidden lg:block">
            <div className="space-y-4">
              <h3 className="text-[10px] font-black tracking-widest uppercase opacity-40">Direct Contact</h3>
              <a href={`mailto:${PERSONAL_INFO.email}`} className="group flex flex-col h-[1.4em] overflow-hidden leading-none text-2xl">
                {/* Top Row */}
                <div className="flex">
                  {PERSONAL_INFO.email.split("").map((char, i) => (
                    <span
                      key={i}
                      className="inline-block group-hover:-translate-y-full transition-transform duration-500 ease-in-out whitespace-pre py-[.2em]"
                      style={{ transitionDelay: `${i * 20}ms` }}
                    >
                      {char}
                    </span>
                  ))}
                </div>
                {/* Bottom Row (Animated into view) */}
                <div className="flex">
                  {PERSONAL_INFO.email.split("").map((char, i) => (
                    <span
                      key={i}
                      className="inline-block group-hover:-translate-y-full transition-transform duration-500 ease-in-out whitespace-pre py-[.2em]"
                      style={{ transitionDelay: `${i * 20}ms` }}
                    >
                      {char}
                    </span>
                  ))}
                </div>
              </a>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Located in {PERSONAL_INFO.location}. <br />
                Available for remote freelance <br /> & full-time opportunities.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-[10px] font-black tracking-widest uppercase opacity-40">Digital Spaces</h3>
              <div className="relative z-20 flex items-center gap-3 pointer-events-auto">
                {[
                  { icon: 'fa-linkedin-in', link: PERSONAL_INFO.linkedin },
                  { icon: 'fa-github', link: PERSONAL_INFO.github },
                  { icon: 'fa-instagram', link: PERSONAL_INFO.instagram }
                ].map((item, i) => (
                  <a 
                    key={i}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hide-cursor group relative w-12 h-12 rounded-full border border-white/20 flex items-center justify-center transition-all duration-500 hover:scale-110 hover:border-white/60 overflow-hidden bg-white/5"
                  >
                    <div className="absolute inset-0 bg-white scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
                    <i className={`fa-brands ${item.icon} text-md relative z-10 transition-colors duration-500 group-hover:text-black text-white`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};