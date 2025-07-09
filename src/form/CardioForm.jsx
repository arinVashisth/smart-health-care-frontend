import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// SVG Heartbeat line for subtle background
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

const UserIcon = () => (
  <svg className="inline-block w-5 h-5 text-blue-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="8" r="4" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 20c0-4 8-4 8-4s8 0 8 4" />
  </svg>
);
const HeartIcon = () => (
  <svg className="inline-block w-5 h-5 text-pink-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21C12 21 4 13.36 4 8.5C4 5.42 6.42 3 9.5 3C11.11 3 12.6 3.81 13.35 5.09C14.1 3.81 15.59 3 17.2 3C20.28 3 22.7 5.42 22.7 8.5C22.7 13.36 15 21 15 21H12Z" />
  </svg>
);
const DropletIcon = () => (
  <svg className="inline-block w-5 h-5 text-sky-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.1S7 8.14 7 13a5 5 0 0010 0c0-4.86-5-9.9-5-9.9z" />
  </svg>
);

function CardioForm() {
  const [formData, setFormData] = useState({
    age_years: '',
    ap_hi: '',
    ap_lo: '',
    cholesterol: '1',
    gluc: '1',
    active: '',
    smoke: '',
    alco: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Simple tooltip component
const Tooltip = ({ text }) => (
  <span className="relative group ml-1 cursor-pointer">
    <span className="text-blue-400 font-bold">ℹ️</span>
    <span className="absolute left-6 top-1 z-20 w-64 bg-blue-100 text-blue-900 text-xs rounded-lg px-3 py-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
      {text}
    </span>
  </span>
);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/predict/cardiovascular', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      navigate('/result', { state: { prediction: data.prediction, tips: data.tips } });
    } catch (error) {
      alert('Error fetching prediction. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-blue-100 px-4 py-8 overflow-hidden">
      <HeartbeatSVG />
      <div className="absolute right-0 bottom-0 w-64 h-64 opacity-10 pointer-events-none z-0">
        <svg width="100%" height="100%">
          <circle cx="128" cy="128" r="96" fill="#38bdf8" />
        </svg>
      </div>
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10 w-full max-w-lg bg-white/95 rounded-3xl shadow-2xl p-10"
      >
        <button
          type="button"
          onClick={() => navigate('/')}
          className="mb-6 px-4 py-2 bg-sky-100 text-blue-700 rounded-xl hover:bg-sky-200 transition font-semibold shadow"
        >
          ← Back
        </button>
        <h2 className="flex items-center justify-center text-2xl font-semibold text-blue-800 mb-6 text-center">
          <HeartIcon />
          Cardiovascular Disease Prediction
        </h2>
        <div className="grid grid-cols-1 gap-5">
          {/* Age */}
          <label className="block">
            <span className="font-medium text-blue-900"><UserIcon />Age (years)<Tooltip text="Enter your age in years. Must be a number between 1 and 120." /></span>
            <input
              name="age_years"
              type="number"
              placeholder="Age"
              value={formData.age_years}
              onChange={handleChange}
              min="1"
              max="120"
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 text-lg"
              required
            />
          </label>
          {/* Systolic BP */}
          <label className="block">
            <span className="font-medium text-blue-900"><DropletIcon />Systolic BP (mmHg)<Tooltip text="Upper blood pressure reading (SBP). Typical range: 90–180 mmHg." /></span>
            <input
              name="ap_hi"
              type="number"
              placeholder="e.g. 120"
              value={formData.ap_hi}
              onChange={handleChange}
              min="70"
              max="250"
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 text-lg"
              required
            />
            <span className="text-xs text-gray-500">Typical range: 90–180 mmHg</span>
          </label>
          {/* Diastolic BP */}
          <label className="block">
            <span className="font-medium text-blue-900"><DropletIcon />Diastolic BP (mmHg)<Tooltip text="Lower blood pressure reading (DBP). Typical range: 60–120 mmHg." /></span>
            <input
              name="ap_lo"
              type="number"
              placeholder="e.g. 80"
              value={formData.ap_lo}
              onChange={handleChange}
              min="40"
              max="150"
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 text-lg"
              required
            />
            <span className="text-xs text-gray-500">Typical range: 60–120 mmHg</span>
          </label>
          {/* Cholesterol */}
          <label className="block">
            <span className="font-medium text-blue-900"><DropletIcon />Cholesterol Level<Tooltip text="Select your recent cholesterol level. If unknown, choose 'Normal'." /></span>
            <select
              name="cholesterol"
              value={formData.cholesterol}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 text-lg bg-white"
              required
            >
              <option value="1">Normal (1)</option>
              <option value="2">Above Normal (2)</option>
              <option value="3">Well Above Normal (3)</option>
            </select>
            <span className="text-xs text-gray-500">If unknown, select Normal</span>
          </label>
          {/* Glucose */}
          <label className="block">
            <span className="font-medium text-blue-900"><DropletIcon />Glucose Level<Tooltip text="Select your recent glucose level. If unsure, choose 'Normal'." /></span>
            <select
              name="gluc"
              value={formData.gluc}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 text-lg bg-white"
              required
            >
              <option value="1">Normal (1)</option>
              <option value="2">Above Normal (2)</option>
              <option value="3">Well Above Normal (3)</option>
            </select>
            <span className="text-xs text-gray-500">If unknown, select Normal</span>
          </label>
          {/* Physically Active */}
          <label className="block">
            <span className="font-medium text-blue-900"><HeartIcon />Do you exercise regularly?<Tooltip text="Select 'Yes' if you exercise regularly (at least 3 times/week)." />
</span>
            <select
              name="active"
              value={formData.active}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 text-lg bg-white"
              required
            >
              <option value="">Select</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </label>
          {/* Smoking */}
          <label className="block">
            <span className="font-medium text-blue-900"><HeartIcon />Do you smoke?<Tooltip text="Select 'Yes' if you currently smoke tobacco products." /></span>
            <select
              name="smoke"
              value={formData.smoke}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 text-lg bg-white"
              required
            >
              <option value="">Select</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </label>
          {/* Alcohol */}
          <label className="block">
            <span className="font-medium text-blue-900"><HeartIcon />Do you drink alcohol?<Tooltip text="Select 'Yes' if you regularly consume alcohol." /></span>
            <select
              name="alco"
              value={formData.alco}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 text-lg bg-white"
              required
            >
              <option value="">Select</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </label>
        </div>
        <button
          type="submit"
          className="mt-8 w-full bg-blue-700 text-white py-3 rounded-2xl hover:bg-blue-800 transition text-lg font-semibold shadow-lg"
        >
          {loading ? "Predicting..." : "Predict"}
        </button>
      </motion.form>
    </div>
  );
}

export default CardioForm;
