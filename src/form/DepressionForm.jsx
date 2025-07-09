import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// SVG Heartbeat line for subtle background decoration
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

function DepressionForm() {
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    self_employed: '',
    family_history: '',
    work_interfere: '',
    no_employees: '',
    remote_work: '',
    tech_company: '',
    benefits: '',
    care_options: '',
    wellness_program: '',
    seek_help: '',
    anonymity: '',
    leave: '',
    mental_health_consequence: '',
    supervisor: '',
    mental_health_interview: '',
    mental_vs_physical: '',
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
      const res = await fetch('http://localhost:5000/predict/depression', {
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
      {/* Subtle SVG background */}
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
          Depression Prediction
        </h2>
        <div className="grid grid-cols-1 gap-5">
          {/* Age */}
          <label className="block">
            <span className="font-medium text-blue-900">
              <UserIcon />Age
              <Tooltip text="Enter your age in years. Must be a positive number." />
            </span>
            <input
              name="age"
              type="number"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 text-lg"
              required
            />
          </label>
          {/* Gender */}
          <label className="block">
            <span className="font-medium text-blue-900"><UserIcon />Gender<Tooltip text="Select your gender identity. This helps understand demographic trends." /></span>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 text-lg bg-white"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>
          {/* Self Employed */}
          <label className="block">
            <span className="font-medium text-blue-900">Are you self-employed?<Tooltip text="Are you currently working as a freelancer or running your own business?" />
</span>
            <select
              name="self_employed"
              value={formData.self_employed}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 text-lg bg-white"
              required
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </label>
          {/* Family History */}
          <label className="block">
            <span className="font-medium text-blue-900">Family history of mental illness?<Tooltip text="Have any of your close family members been diagnosed with mental illness?" /></span>
            <select
              name="family_history"
              value={formData.family_history}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 text-lg bg-white"
              required
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </label>
          {/* Work Interfere */}
          <label className="block">
            <span className="font-medium text-blue-900">Does your mental health interfere with work?<Tooltip text="How often does your mental health affect your performance at work?" /></span>
            <select
              name="work_interfere"
              value={formData.work_interfere}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 text-lg bg-white"
              required
            >
              <option value="">Select</option>
              <option value="never">Never</option>
              <option value="rarely">Rarely</option>
              <option value="sometimes">Sometimes</option>
              <option value="often">Often</option>
            </select>
          </label>
          {/* No Employees */}
          <label className="block">
            <span className="font-medium text-blue-900">Number of employees at your company<Tooltip text="Select the approximate number of employees in your organization." /></span>
            <select
              name="no_employees"
              value={formData.no_employees}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 text-lg bg-white"
              required
            >
              <option value="">Select</option>
              <option value="1-5">1-5</option>
              <option value="6-25">6-25</option>
              <option value="26-100">26-100</option>
              <option value="100-500">100-500</option>
              <option value="500-1000">500-1000</option>
              <option value="More than 1000">More than 1000</option>
            </select>
          </label>
          {/* Remote Work */}
          <label className="block">
            <span className="font-medium text-blue-900">Do you work remotely?<Tooltip text="Do you work from home or outside your employer’s physical office?" /></span>
            <select
              name="remote_work"
              value={formData.remote_work}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 text-lg bg-white"
              required
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </label>
          {/* Tech Company */}
          <label className="block">
            <span className="font-medium text-blue-900">Do you work in a tech company?<Tooltip text="Is your primary employer a technology-focused company?" /></span>
            <select
              name="tech_company"
              value={formData.tech_company}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 text-lg bg-white"
              required
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </label>
          {/* Benefits */}
          <label className="block">
            <span className="font-medium text-blue-900">Does your employer provide mental health benefits?<Tooltip text="Does your employer offer mental health benefits as part of your job?" /></span>
            <select
              name="benefits"
              value={formData.benefits}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 text-lg bg-white"
              required
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
              <option value="don't know">Don't know</option>
            </select>
          </label>
          {/* Care Options */}
          <label className="block">
            <span className="font-medium text-blue-900">Does your employer offer care options?<Tooltip text="Are you aware of any mental health care resources provided by your employer?" /></span>
            <select
              name="care_options"
              value={formData.care_options}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 text-lg bg-white"
              required
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
              <option value="not sure">Not sure</option>
            </select>
          </label>
          {/* Wellness Program */}
          <label className="block">
            <span className="font-medium text-blue-900">Does your employer have a wellness program?<Tooltip text="Does your workplace offer wellness initiatives like fitness or stress relief programs?" /></span>
            <select
              name="wellness_program"
              value={formData.wellness_program}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 text-lg bg-white"
              required
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
              <option value="don't know">Don't know</option>
            </select>
          </label>
          {/* Seek Help */}
          <label className="block">
            <span className="font-medium text-blue-900">Does your employer encourage seeking help?<Tooltip text="Does your employer encourage employees to seek help for mental health issues?" /></span>
            <select
              name="seek_help"
              value={formData.seek_help}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 text-lg bg-white"
              required
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
              <option value="don't know">Don't know</option>
            </select>
          </label>
          {/* Anonymity */}
          <label className="block">
            <span className="font-medium text-blue-900">Is anonymity protected if you disclose?<Tooltip text="Can you disclose mental health concerns anonymously at work?" /></span>
            <select
              name="anonymity"
              value={formData.anonymity}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 text-lg bg-white"
              required
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
              <option value="don't know">Don't know</option>
            </select>
          </label>
          {/* Leave */}
          <label className="block">
            <span className="font-medium text-blue-900">How easy is it to take medical leave?<Tooltip text="How easy is it for you to take medical leave for mental health reasons?" /></span>
            <select
              name="leave"
              value={formData.leave}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 text-lg bg-white"
              required
            >
              <option value="">Select</option>
              <option value="very easy">Very easy</option>
              <option value="somewhat easy">Somewhat easy</option>
              <option value="don't know">Don't know</option>
              <option value="somewhat difficult">Somewhat difficult</option>
              <option value="very difficult">Very difficult</option>
            </select>
          </label>
          {/* Mental Health Consequence */}
          <label className="block">
            <span className="font-medium text-blue-900">Are you concerned about consequences of seeking help?<Tooltip text="Are you concerned that seeking help might negatively affect your career?" /></span>
            <select
              name="mental_health_consequence"
              value={formData.mental_health_consequence}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 text-lg bg-white"
              required
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
              <option value="maybe">Maybe</option>
            </select>
          </label>
          {/* Supervisor */}
          <label className="block">
            <span className="font-medium text-blue-900">Do you trust your supervisor with mental health issues?<Tooltip text="Do you feel comfortable discussing mental health with your direct manager?" /></span>
            <select
              name="supervisor"
              value={formData.supervisor}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 text-lg bg-white"
              required
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
              <option value="some of them">Some of them</option>
            </select>
          </label>
          {/* Mental Health Interview */}
          <label className="block">
            <span className="font-medium text-blue-900">Comfortable discussing mental health in interview?<Tooltip text="Would you be open to discussing mental health during job interviews?" /></span>
            <select
              name="mental_health_interview"
              value={formData.mental_health_interview}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 text-lg bg-white"
              required
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
              <option value="maybe">Maybe</option>
            </select>
          </label>
          {/* Mental vs Physical */}
          <label className="block">
            <span className="font-medium text-blue-900">Do you think mental health is as important as physical health?<Tooltip text="Do you think mental health is treated as seriously as physical health in your workplace?" /></span>
            <select
              name="mental_vs_physical"
              value={formData.mental_vs_physical}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 text-lg bg-white"
              required
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
              <option value="don't know">Don't know</option>
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

export default DepressionForm;
