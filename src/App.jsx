import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Inline SVGs for background and icons
const HeartbeatSVG = () => (
  <svg
    className="absolute left-0 top-0 w-full h-32 opacity-20 pointer-events-none"
    viewBox="0 0 1440 320"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
  >
    <path
      d="M0,160 L120,160 L180,80 L240,240 L300,160 L360,200 L420,80 L480,160 L540,120 L600,240 L660,160 L720,80 L780,200 L840,160 L900,240 L960,80 L1020,160 L1080,200 L1140,80 L1200,160 L1260,240 L1320,160 L1380,80 L1440,160"
      stroke="#38bdf8"
      strokeWidth="4"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const StethoscopeIcon = () => (
  <svg
    className="inline-block w-7 h-7 text-blue-500 mr-2 align-middle"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 13a5 5 0 01-5-5V5m0 0a5 5 0 0110 0v3a5 5 0 01-5 5zm0 0v5a3 3 0 006 0v-5"
    />
    <circle cx="18" cy="17" r="3" />
  </svg>
);

const DISEASES = [
  { label: "Cardiovascular Disease", value: "cardiovascular" },
  { label: "Diabetes", value: "diabetes" },
  { label: "COPD", value: "copd" },
  { label: "Depression", value: "depression" },
  { label: "Kidney Disease", value: "kidney" },
];

function App() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [selectedDisease, setSelectedDisease] = useState('');
  const navigate = useNavigate();
  const messages = [
    "Monitor your health continuously with real-time tracking and smart insights",
    "Stay informed about your well-being and take control of your health every day",
    "We put your health first with tools designed to keep you safe and supported",
    "Anticipate potential health issues and take action before they become serious",
    "Empowering you with the data and tools to live a longer, healthier life",
    "Your personal health companion—always watching, always caring",
    "Seamlessly track vitals, symptoms, and progress in one powerful dashboard",
    "Transform your lifestyle with personalized health tips and timely alerts",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const handleDiseaseChange = (e) => {
    setSelectedDisease(e.target.value);
    if (e.target.value) {
      navigate(`/form/${e.target.value}`);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-50 to-blue-100 px-4 py-8 overflow-hidden">
      {/* Subtle SVG background */}
      <HeartbeatSVG />
      <div className="absolute right-0 bottom-0 w-80 h-80 opacity-10 pointer-events-none z-0">
        {/* Abstract circle */}
        <svg width="100%" height="100%">
          <circle cx="160" cy="160" r="120" fill="#38bdf8" />
        </svg>
      </div>
      <div className="relative z-10 w-full max-w-3xl bg-white/90 rounded-3xl shadow-2xl flex flex-col items-center p-10">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center text-4xl md:text-5xl font-extrabold text-blue-900 mb-8 text-center drop-shadow-lg"
        >
          <StethoscopeIcon />
          Smart Health Care Tracker
        </motion.h1>
        <div className="h-24 flex items-center justify-center mb-8">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentMessageIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.7 }}
              className="text-2xl md:text-3xl text-blue-700 font-semibold text-center"
            >
              {messages[currentMessageIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
        <div className="w-full flex flex-col items-center mt-10">
          <label className="flex items-center text-xl font-semibold text-blue-800 mb-4">
            {/* Icon for dropdown label */}
            <svg className="w-6 h-6 text-blue-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Which disease do you want to predict?
          </label>
          <select
            value={selectedDisease}
            onChange={handleDiseaseChange}
            className="w-full max-w-md px-5 py-3 border border-blue-200 rounded-2xl shadow focus:outline-none focus:ring-4 focus:ring-blue-300 text-lg bg-white transition"
            style={{ boxShadow: '0 4px 24px 0 rgba(56,189,248,0.09)' }}
          >
            <option value="">Select a disease</option>
            {DISEASES.map((d) => (
              <option key={d.value} value={d.value}>{d.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default App;
