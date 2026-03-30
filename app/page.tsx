"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Download, MapPin, CheckCircle } from 'lucide-react';

// ==========================================
// 1. CONFIGURATION DATA (Easy to swap per client)
// ==========================================
const config = {
  profile: {
    firstName: "The Painted",
    lastName: "Porch",
    businessName: "The Painted Porch",
    title: "Luxury Event Space",
    phone: "+1-555-019-8372",
    email: "concierge@thepaintedporch.com",
    website: "https://thepaintedporch.com",
    address: {
      street: "123 Historic Square",
      city: "Covington",
      state: "GA",
      zip: "30014",
      country: "USA"
    }
  },
  links: [
    { title: 'Venue Gallery', url: '#' },
    { title: 'Official Website', url: '#' },
    { title: 'Virtual Tour', url: '#' }
  ]
};

// ==========================================
// 2. VCARD GENERATOR UTILITY
// ==========================================
const generateAndDownloadVCard = (contactData) => {
  const { firstName, lastName, businessName, phone, email, address, website, title } = contactData;
  const vcard = `BEGIN:VCARD\nVERSION:3.0\nN:${lastName};${firstName};;;\nFN:${firstName} ${lastName}\nORG:${businessName}\nTITLE:${title}\nTEL;TYPE=WORK,VOICE:${phone}\nEMAIL;TYPE=PREF,INTERNET:${email}\nADR;TYPE=WORK:;;${address.street};${address.city};${address.state};${address.zip};${address.country}\nURL:${website}\nEND:VCARD`;

  const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${firstName}_${lastName}_Contact.vcf`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

// ==========================================
// 3. MAIN COMPONENT
// ==========================================
export default function PremiumLinkBio() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); 

  // --- Animation Variants ---
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 70 } }
  };

  // --- Form Handling ---
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      firstName: formData.name.split(' ')[0],
      lastName: formData.name.split(' ').slice(1).join(' ') || '',
      email: formData.email,
      source: 'Premium vCard Routing'
    };

    try {
      // INSTRUCTION: Replace this URL with your actual GoHighLevel Webhook
      const webhookUrl = 'https://services.leadconnectorhq.com/hooks/YOUR_WEBHOOK_ID_HERE';
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setSubmitStatus('success');
        setTimeout(() => {
          setIsModalOpen(false);
          setSubmitStatus(null);
          setFormData({ name: '', email: '' });
        }, 2500);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error("Webhook submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#EAE3D2] overflow-hidden font-['Montserrat']">
      
      {/* Ambient Glow / Materials */}
      <div className="fixed top-[-10%] left-[-10%] w-96 h-96 bg-[#c5a059] rounded-full mix-blend-screen filter blur-[100px] opacity-10 pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-96 h-96 bg-[#EAE3D2] rounded-full mix-blend-screen filter blur-[100px] opacity-[0.03] pointer-events-none"></div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center px-6 pt-16 pb-8 max-w-md mx-auto min-h-screen"
      >
        {/* Profile Section */}
        <motion.div variants={itemVariants} className="flex flex-col items-center w-full mb-10">
          <div className="w-24 h-24 rounded-full border-[1px] border-[#c5a059]/40 bg-[#EAE3D2]/5 backdrop-blur-sm p-1 mb-6 flex items-center justify-center transition-transform hover:scale-105 duration-500 shadow-[0_0_15px_rgba(197,160,89,0.1)]">
            {/* Logo Placeholder */}
            <div className="w-full h-full rounded-full bg-black/60 flex items-center justify-center text-[10px] tracking-widest text-[#c5a059]">LOGO</div>
          </div>
          <h1 className="text-3xl font-light tracking-widest text-center font-['Cormorant_Garamond'] uppercase">The Painted Porch</h1>
          <p className="text-xs tracking-[0.3em] text-[#c5a059] uppercase mt-4">{config.profile.title}</p>
        </motion.div>

        {/* Primary Action Button (Triggers Modal) */}
        <motion.div variants={itemVariants} className="w-full mb-6">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full py-4 px-6 rounded-xl bg-[#c5a059] text-[#050505] font-medium tracking-wide flex justify-between items-center shadow-[0_0_20px_rgba(197,160,89,0.15)] active:scale-[0.98] transition-all hover:bg-[#d6b36c]"
          >
            <span className="uppercase text-xs tracking-widest font-semibold">Inquire About Dates</span>
            <ArrowRight size={18} />
          </button>
        </motion.div>

        {/* Link Cards */}
        <motion.div variants={itemVariants} className="w-full flex flex-col gap-3 mb-12">
          {config.links.map((link, i) => (
            <a 
              key={i} 
              href={link.url} 
              className="group relative w-full p-5 rounded-xl border border-[#EAE3D2]/10 bg-[#EAE3D2]/[0.02] backdrop-blur-[20px] flex justify-between items-center overflow-hidden transition-all duration-500 hover:border-[#c5a059]/50 hover:bg-[#EAE3D2]/[0.04]"
            >
              <span className="relative z-10 text-sm font-light tracking-widest uppercase group-hover:text-[#c5a059] transition-colors">{link.title}</span>
              <ArrowRight size={16} className="relative z-10 text-[#EAE3D2]/30 group-hover:text-[#c5a059] transition-colors" />
            </a>
          ))}
        </motion.div>

        <div className="mt-auto w-full"></div>

        {/* vCard Download ("Concierge" Feature) */}
        <motion.div variants={itemVariants} className="w-full mb-8">
           <button 
             onClick={() => generateAndDownloadVCard(config.profile)}
             className="w-full py-4 border border-[#c5a059]/30 rounded-full flex justify-center items-center gap-3 text-xs tracking-[0.2em] uppercase text-[#c5a059] hover:bg-[#c5a059]/10 transition-colors active:scale-[0.98]"
           >
             <Download size={14} />
             Save Contact
           </button>
        </motion.div>

        {/* Footer */}
        <motion.footer variants={itemVariants} className="flex flex-col items-center opacity-40 text-[10px] tracking-[0.2em] uppercase gap-2">
          <div className="flex items-center gap-2"><MapPin size={12}/> Covington, Georgia</div>
        </motion.footer>
      </motion.div>

      {/* Pop-up Form (Bottom Sheet Modal) */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 w-full z-50 bg-[#0a0a0a] border-t border-[#c5a059]/20 rounded-t-3xl p-6 pb-12 shadow-[0_-10px_40px_rgba(0,0,0,0.8)]"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-['Cormorant_Garamond'] text-[#c5a059] tracking-wide">Request a Date</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 bg-white/5 rounded-full text-[#EAE3D2]/60 hover:text-white transition-colors">
                  <X size={18} />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {submitStatus === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-10 flex flex-col items-center justify-center text-center"
                  >
                    <div className="mb-4 text-[#c5a059]">
                      <CheckCircle size={48} strokeWidth={1} />
                    </div>
                    <h3 className="text-2xl font-['Cormorant_Garamond'] text-[#c5a059] mb-3">Request Received</h3>
                    <p className="text-xs text-[#EAE3D2]/60 font-light tracking-widest uppercase">Our concierge will contact you shortly.</p>
                  </motion.div>
                ) : (
                  <>
                    <div className="space-y-6 mb-8">
                      <input 
                        type="text" 
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Full Name" 
                        className="w-full bg-transparent border-b border-[#EAE3D2]/20 py-3 text-[#EAE3D2] placeholder:text-[#EAE3D2]/30 focus:outline-none focus:border-[#c5a059] transition-colors rounded-none text-sm tracking-wide" 
                      />
                      <input 
                        type="email" 
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email Address" 
                        className="w-full bg-transparent border-b border-[#EAE3D2]/20 py-3 text-[#EAE3D2] placeholder:text-[#EAE3D2]/30 focus:outline-none focus:border-[#c5a059] transition-colors rounded-none text-sm tracking-wide" 
                      />
                    </div>
                    
                    {submitStatus === 'error' && (
                      <p className="text-red-400 text-xs tracking-wide mb-4 text-center">Connection error. Please try again.</p>
                    )}

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-[#c5a059] text-black font-semibold tracking-widest uppercase text-xs rounded-xl disabled:opacity-70 disabled:cursor-not-allowed transition-opacity flex justify-center items-center shadow-[0_0_15px_rgba(197,160,89,0.2)]"
                    >
                      {isSubmitting ? 'Transmitting...' : 'Submit Inquiry'}
                    </button>
                  </>
                )}
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}