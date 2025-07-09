import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// SVG Heartbeat line for background
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

// Icon components for form labels
const UserIcon = () => (
  <svg className="inline-block w-5 h-5 text-blue-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="8" r="4" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 20c0-4 8-4 8-4s8 0 8 4" />
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

const DropletIcon = () => (
  <svg className="inline-block w-5 h-5 text-sky-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.1S7 8.14 7 13a5 5 0 0010 0c0-4.86-5-9.9-5-9.9z" />
  </svg>
);
const ActivityIcon = () => (
  <svg className="inline-block w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 014-4h4" />
    <circle cx="9" cy="7" r="4" />
    <circle cx="17" cy="17" r="4" />
  </svg>
);

function DiabetesForm() {
  const [formData, setFormData] = useState({
    age: '',
    sex: '',
    height: '',
    weight: '',
    highBP: '',
    highChol: '',
    smoker: '',
    exercise: '',
    fruits: '',
    veggies: '',
    genHealth: '',
    education: '',
    income: '',
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
      const res = await fetch('http://localhost:5000/predict/diabetes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      navigate('/result', {
        state: {
          prediction: data.prediction,
          tips: data.tips,
          disease: data.disease // Add this line
        }
      });
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
          <DropletIcon />
          Diabetes Prediction
        </h2>
        <div className="grid grid-cols-1 gap-5">
          <label className="block">
            <span className="font-medium text-blue-900"><UserIcon />Age<Tooltip text="Your age in years. Must be between 1 and 120." /></span>
            <input
              name="age"
              type="number"
              placeholder="Age (years)"
              value={formData.age}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
              required
            />
          </label>
          <label className="block">
            <span className="font-medium text-blue-900"><UserIcon />Sex<Tooltip text="Select your biological sex." /></span>
            <select
              name="sex"
              value={formData.sex}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 text-lg bg-white"
              required
            >
              <option value="">Select Sex</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>
          <label className="block">
            <span className="font-medium text-blue-900"><DropletIcon />Height (cm)<Tooltip text="Your height in centimeters (cm)." /></span>
            <input
              name="height"
              type="number"
              placeholder="Height in cm"
              value={formData.height}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
              required
            />
          </label>
          <label className="block">
            <span className="font-medium text-blue-900"><DropletIcon />Weight (kg)<Tooltip text="Your weight in kilograms (kg)." />
</span>
            <input
              name="weight"
              type="number"
              placeholder="Weight in kg"
              value={formData.weight}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
              required
            />
          </label>
          <label className="block">
            <span className="font-medium text-blue-900"><DropletIcon />Do you have high blood pressure?<Tooltip text="Have you been diagnosed with high blood pressure?" /></span>
            <select
              name="highBP"
              value={formData.highBP}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 text-lg bg-white"
              required
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </label>
          <label className="block">
            <span className="font-medium text-blue-900"><DropletIcon />Do you have high cholesterol?<Tooltip text="Have you been diagnosed with high cholesterol?" /></span>
            <select
              name="highChol"
              value={formData.highChol}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 text-lg bg-white"
              required
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </label>
          <label className="block">
            <span className="font-medium text-blue-900"><DropletIcon />Do you smoke?<Tooltip text="Do you currently smoke tobacco?" /></span>
            <select
              name="smoker"
              value={formData.smoker}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 text-lg bg-white"
              required
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </label>
          <label className="block">
            <span className="font-medium text-blue-900"><ActivityIcon />Do you exercise regularly?<Tooltip text="Select 'Yes' if you exercise at least 3 times a week." /></span>
            <select
              name="exercise"
              value={formData.exercise}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 text-lg bg-white"
              required
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </label>
          <label className="block">
            <span className="font-medium text-blue-900"><DropletIcon />Do you eat fruits regularly?<Tooltip text="Do you eat fruits regularly (most days)?" /></span>
            <select
              name="fruits"
              value={formData.fruits}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 text-lg bg-white"
              required
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </label>
          <label className="block">
            <span className="font-medium text-blue-900"><DropletIcon />Do you eat vegetables regularly?<Tooltip text="Do you eat vegetables regularly (most days)?" /></span>
            <select
              name="veggies"
              value={formData.veggies}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 text-lg bg-white"
              required
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </label>
          <label className="block">
            <span className="font-medium text-blue-900">How would you rate your general health?<Tooltip text="How would you rate your overall health?" /></span>
            <select
              name="genHealth"
              value={formData.genHealth}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 text-lg bg-white"
              required
            >
              <option value="">Select</option>
              <option value="excellent">Excellent</option>
              <option value="very good">Very good</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="poor">Poor</option>
            </select>
          </label>
          <label className="block">
            <span className="font-medium text-blue-900">Education level<Tooltip text="Highest level of education you have completed." /></span>
            <select
              name="education"
              value={formData.education}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 text-lg bg-white"
              required
            >
              <option value="">Select</option>
              <option value="less than high school">Less than high school</option>
              <option value="high school">High school</option>
              <option value="some college">Some college</option>
              <option value="college grad">College grad</option>
              <option value="post-grad">Post-grad</option>
            </select>
          </label>
          <label className="block">
            <span className="font-medium text-blue-900">Income level<Tooltip text="Your general household income level." /></span>
            <select
              name="income"
              value={formData.income}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 text-lg bg-white"
              required
            >
              <option value="">Select</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
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

export default DiabetesForm;
