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

// Simple tooltip component
const Tooltip = ({ text }) => (
  <span className="relative group ml-1 cursor-pointer">
    <span className="text-blue-400 font-bold">ℹ️</span>
    <span className="absolute left-6 top-1 z-20 w-64 bg-blue-100 text-blue-900 text-xs rounded-lg px-3 py-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
      {text}
    </span>
  </span>
);

const UserIcon = () => (
  <svg className="inline-block w-5 h-5 text-blue-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="8" r="4" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 20c0-4 8-4 8-4s8 0 8 4" />
  </svg>
);
const KidneyIcon = () => (
  <svg className="inline-block w-5 h-5 text-pink-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <ellipse cx="8" cy="12" rx="4" ry="7" />
    <ellipse cx="16" cy="12" rx="4" ry="7" />
  </svg>
);

function KidneyForm() {
  const [formData, setFormData] = useState({
    age: '',
    hemo: '',
    sg: '',
    al: '',
    htn: '',
    sc: '',
    sod: '',
    bgr: '',
    pcv: '',
    bu: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/predict/kidney', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      navigate('/result', { state: { prediction: data.prediction, tips: data.tips, disease: "Kidney Disease" } });
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
          <KidneyIcon />
          Kidney Disease Prediction
        </h2>
        <div className="grid grid-cols-1 gap-5">
          {/* Age */}
          <label className="block">
            <span className="font-medium text-blue-900">
              <UserIcon />Age
              <Tooltip text="Age is a risk factor for kidney disease. Older adults are more likely to develop chronic kidney problems." />
            </span>
            <input
              name="age"
              type="number"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              min="0"
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 text-lg"
              required
            />
          </label>
          {/* Hemoglobin */}
          <label className="block">
            <span className="font-medium text-blue-900">
              Hemoglobin (g/dL)
              <Tooltip text="Low hemoglobin (anemia) is common in kidney disease due to reduced production of erythropoietin." />
            </span>
            <input
              name="hemo"
              type="number"
              step="0.1"
              placeholder="e.g. 13.5"
              value={formData.hemo}
              onChange={handleChange}
              min="0"
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 text-lg"
              required
            />
          </label>
          {/* Specific Gravity */}
          <label className="block">
            <span className="font-medium text-blue-900">
              Specific Gravity (sg)
              <Tooltip text="Urine specific gravity reflects the kidney’s ability to concentrate urine, which is impaired in kidney disease." />
            </span>
            <input
              name="sg"
              type="number"
              step="0.001"
              placeholder="e.g. 1.020"
              value={formData.sg}
              onChange={handleChange}
              min="1"
              max="1.03"
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 text-lg"
              required
            />
          </label>
          {/* Albumin */}
          <label className="block">
            <span className="font-medium text-blue-900">
              Albumin (al)
              <Tooltip text="Albumin in urine (albuminuria) is a marker of kidney damage and disease progression." />
            </span>
            <input
              name="al"
              type="number"
              placeholder="e.g. 3"
              value={formData.al}
              onChange={handleChange}
              min="0"
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 text-lg"
              required
            />
          </label>
          {/* Hypertension */}
          <label className="block">
            <span className="font-medium text-blue-900">
              Hypertension
              <Tooltip text="High blood pressure is both a cause and a consequence of chronic kidney disease." />
            </span>
            <select
              name="htn"
              value={formData.htn}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 text-lg bg-white"
              required
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </label>
          {/* Serum Creatinine */}
          <label className="block">
            <span className="font-medium text-blue-900">
              Serum Creatinine (mg/dL)
              <Tooltip text="Elevated serum creatinine indicates reduced kidney filtration function." />
            </span>
            <input
              name="sc"
              type="number"
              step="0.01"
              placeholder="e.g. 1.2"
              value={formData.sc}
              onChange={handleChange}
              min="0"
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 text-lg"
              required
            />
          </label>
          {/* Sodium */}
          <label className="block">
            <span className="font-medium text-blue-900">
              Sodium (mEq/L)
              <Tooltip text="Abnormal sodium levels can occur in kidney disease due to impaired regulation of electrolytes." />
            </span>
            <input
              name="sod"
              type="number"
              placeholder="e.g. 140"
              value={formData.sod}
              onChange={handleChange}
              min="0"
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 text-lg"
              required
            />
          </label>
          {/* Blood Glucose Random */}
          <label className="block">
            <span className="font-medium text-blue-900">
              Blood Glucose Random (mg/dL)
              <Tooltip text="High blood glucose can damage kidney blood vessels and is a risk factor for kidney disease." />
            </span>
            <input
              name="bgr"
              type="number"
              placeholder="e.g. 110"
              value={formData.bgr}
              onChange={handleChange}
              min="0"
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 text-lg"
              required
            />
          </label>
          {/* Packed Cell Volume */}
          <label className="block">
            <span className="font-medium text-blue-900">
              Packed Cell Volume (%)
              <Tooltip text="Low packed cell volume (hematocrit) may indicate anemia, which is common in chronic kidney disease." />
            </span>
            <input
              name="pcv"
              type="number"
              placeholder="e.g. 40"
              value={formData.pcv}
              onChange={handleChange}
              min="0"
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 text-lg"
              required
            />
          </label>
          {/* Blood Urea */}
          <label className="block">
            <span className="font-medium text-blue-900">
              Blood Urea (mg/dL)
              <Tooltip text="Elevated blood urea is a sign of impaired kidney function and waste accumulation." />
            </span>
            <input
              name="bu"
              type="number"
              placeholder="e.g. 30"
              value={formData.bu}
              onChange={handleChange}
              min="0"
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 text-lg"
              required
            />
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

export default KidneyForm;
