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
const SmokingIcon = () => (
  <svg className="inline-block w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect x="2" y="17" width="14" height="2" rx="1" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 17v-1a3 3 0 00-3-3" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 19a2 2 0 002-2" />
  </svg>
);
const LungsIcon = () => (
  <svg className="inline-block w-5 h-5 text-pink-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M12 12V3m0 9c-4 0-7 3-7 7v2m7-9c4 0 7 3 7 7v2" />
    <circle cx="12" cy="17" r="1.5" />
  </svg>
);


function CopdForm() {
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    height: '',
    weight: '', // <-- new field
    heartFailure: false,
    workingPlace: '',
    mMRC: '',
    smokingStatus: '',
    packHistory: '',
    vaccination: false,
    depression: false,
    dependent: false,
    temperature: '',
    respiratoryRate: '',
    heartRate: '',
    bloodPressure: '',
    oxygenSaturation: '',
    sputum: '',
    fev1: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('https://smart-health-care-tracker-backend.onrender.com/predict/copd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      navigate('/result', { state: { prediction: data.prediction, tips: data.tips, disease: data.disease } });
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
          <LungsIcon />
          COPD Prediction
        </h2>
        <div className="grid grid-cols-1 gap-5">
          {/* Age */}
          <label className="block">
            <span className="font-medium text-blue-900"><UserIcon />Age<Tooltip text="Enter your age in years. Must be a positive number." /></span>
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
          {/* Gender */}
          <label className="block">
            <span className="font-medium text-blue-900"><UserIcon />Gender<Tooltip text="Select your gender. This is used to analyze demographic patterns." /></span>
            <div className="flex space-x-6 mt-1">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="0"
                  checked={formData.gender === '0'}
                  onChange={handleChange}
                  className="mr-2"
                  required
                />
                Male
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="1"
                  checked={formData.gender === '1'}
                  onChange={handleChange}
                  className="mr-2"
                  required
                />
                Female
              </label>
            </div>
          </label>
          
          {/* Height */}
            <label className="block">
              <span className="font-medium text-blue-900">Height (cm)<Tooltip text="Enter your height in centimeters. Used to calculate BMI and assess physical health." /></span>
              <input
                name="height"
                type="number"
                step="1"
                placeholder="e.g. 170"
                value={formData.height}
                onChange={handleChange}
                min="0"
                className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 text-lg"
                required
              />
            </label>
          {/* Weight */}
          <label className="block">
            <span className="font-medium text-blue-900">Weight (kg)<Tooltip text="Enter your weight in kilograms. Used along with height to assess health metrics." /></span>
            <input
              name="weight"
              type="number"
              step="0.1"
              placeholder="e.g. 70"
              value={formData.weight}
              onChange={handleChange}
              min="0"
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 text-lg"
              required
            />
          </label>
          {/* History of Heart Failure */}
          <label className="block items-center">
            <input
              type="checkbox"
              name="heartFailure"
              checked={formData.heartFailure}
              onChange={handleChange}
              className="mr-2"
            />
            <span className="font-medium text-blue-900">History of Heart Failure<Tooltip text="Check if you've ever been diagnosed with heart failure." /></span>
          </label>
          {/* Working Place */}
          <label className="block">
            <span className="font-medium text-blue-900">Working Place<Tooltip text="Select the environment where you primarily work. Outdoor and industrial settings may affect respiratory health." /></span>
            <select
              name="workingPlace"
              value={formData.workingPlace}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 text-lg bg-white"
              required
            >
              <option value="">Select</option>
              <option value="0">Office</option>
              <option value="1">Factory</option>
              <option value="2">Outdoor</option>
              <option value="3">Home</option>
              <option value="4">Other</option>
            </select>
          </label>
          {/* mMRC */}
          <label className="block">
            <span className="font-medium text-blue-900">mMRC Dyspnea Scale<Tooltip text="The Modified Medical Research Council scale assesses breathlessness severity." /></span>
            <select
              name="mMRC"
              value={formData.mMRC}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 text-lg bg-white"
              required
            >
              <option value="">Select</option>
              <option value="0">0 - No breathlessness</option>
              <option value="1">1 - Slight</option>
              <option value="2">2 - Moderate</option>
              <option value="3">3 - Severe</option>
              <option value="4">4 - Very severe</option>
            </select>
          </label>
          {/* Smoking Status */}
          <label className="block">
            <span className="font-medium text-blue-900">Status of Smoking<Tooltip text="Indicates your current or past smoking habits. A major risk factor for COPD." />
            </span>
            <select
              name="smokingStatus"
              value={formData.smokingStatus}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 text-lg bg-white"
              required
            >
              <option value="">Select</option>
              <option value="0">Never</option>
              <option value="1">Past</option>
              <option value="2">Current Light</option>
              <option value="3">Current Moderate</option>
              <option value="4">Current Heavy</option>
            </select>
          </label>
          {/* Pack History */}
          <label className="block">
            <span className="font-medium text-blue-900"><SmokingIcon />Pack History (years or packs/year)<Tooltip text="Total smoking exposure calculated in pack-years (packs/day × years smoked)." /></span>
            <input
              name="packHistory"
              type="number"
              placeholder="e.g. 20"
              value={formData.packHistory}
              onChange={handleChange}
              min="0"
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 text-lg"
              required
            />
          </label>
          {/* Vaccination */}
          <label className="block items-center">
            <input
              type="checkbox"
              name="vaccination"
              checked={formData.vaccination}
              onChange={handleChange}
              className="mr-2"
            />
            <span className="font-medium text-blue-900">Vaccination (influenza/pneumonia)<Tooltip text="Indicate if you've received influenza or pneumonia vaccinations." /></span>
          </label>
          {/* Depression */}
          <label className="block items-center">
            <input
              type="checkbox"
              name="depression"
              checked={formData.depression}
              onChange={handleChange}
              className="mr-2"
            />
            <span className="font-medium text-blue-900">Depression<Tooltip text="Check this box if you have been diagnosed with depression." /></span>
          </label>
          {/* Dependent */}
          <label className="block items-center">
            <input
              type="checkbox"
              name="dependent"
              checked={formData.dependent}
              onChange={handleChange}
              className="mr-2"
            />
            <span className="font-medium text-blue-900">Dependent<Tooltip text="Check this if you are dependent on someone else for daily activities." /></span>
          </label>
          {/* Temperature */}
          <label className="block">
            <span className="font-medium text-blue-900">Temperature<Tooltip text="Select your current body temperature status. Fever may indicate infection." /></span>
            <select
              name="temperature"
              value={formData.temperature}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 text-lg bg-white"
              required
            >
              <option value="">Select</option>
              <option value="0">Normal</option>
              <option value="1">Mild fever</option>
              <option value="2">Moderate fever</option>
              <option value="3">High fever</option>
              <option value="4">Very high fever</option>
            </select>
          </label>
          {/* Respiratory Rate */}
          <label className="block">
            <span className="font-medium text-blue-900">Respiratory Rate<Tooltip text="Number of breaths you take per minute. A key indicator of lung function." /></span>
            <input
              name="respiratoryRate"
              type="number"
              placeholder="e.g. 18"
              value={formData.respiratoryRate}
              onChange={handleChange}
              min="0"
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 text-lg"
              required
            />
          </label>
          {/* Heart Rate */}
          <label className="block">
            <span className="font-medium text-blue-900">Heart Rate<Tooltip text="Select your resting heart rate. Abnormal rates may signal cardiovascular issues." /></span>
            <select
              name="heartRate"
              value={formData.heartRate}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 text-lg bg-white"
              required
            >
              <option value="">Select</option>
              <option value="0">&lt;60</option>
              <option value="1">60–100</option>
              <option value="2">&gt;100</option>
            </select>
          </label>
          {/* Blood Pressure */}
          <label className="block">
            <span className="font-medium text-blue-900">Blood Pressure<Tooltip text="Select your current blood pressure status. High or low BP can impact overall health." /></span>
            <select
              name="bloodPressure"
              value={formData.bloodPressure}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 text-lg bg-white"
              required
            >
              <option value="">Select</option>
              <option value="0">Low</option>
              <option value="1">Normal</option>
              <option value="2">High</option>
            </select>
          </label>
          {/* Oxygen Saturation */}
          <label className="block">
            <span className="font-medium text-blue-900">Oxygen Saturation (0–1)<Tooltip text="Percentage of oxygen in your blood. Normal values are usually above 0.95." />
</span>
            <input
              name="oxygenSaturation"
              type="number"
              step="0.01"
              min="0"
              max="1"
              placeholder="e.g. 0.94"
              value={formData.oxygenSaturation}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 text-lg"
              required
            />
          </label>
          {/* Sputum */}
          <label className="block">
            <span className="font-medium text-blue-900">Sputum<Tooltip text="Select the type of mucus you're producing. Purulent sputum may indicate infection." /></span>
            <select
              name="sputum"
              value={formData.sputum}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 text-lg bg-white"
              required
            >
              <option value="">Select</option>
              <option value="0">Normal</option>
              <option value="1">Purulent</option>
            </select>
          </label>
          {/* FEV1 */}
          <label className="block">
            <span className="font-medium text-blue-900">FEV1 (%)<Tooltip text="Forced Expiratory Volume in 1 second. Measures lung capacity. Used to classify COPD severity." /></span>
            <select
              name="fev1"
              value={formData.fev1}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 text-lg bg-white"
              required
            >
              <option value="">Select</option>
              <option value="0">&lt;30%</option>
              <option value="1">30–50%</option>
              <option value="2">51–70%</option>
              <option value="3">71–80%</option>
              <option value="4">&gt;80%</option>
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

export default CopdForm;
