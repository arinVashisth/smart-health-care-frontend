import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { prediction, tips, disease } = location.state || {};

  useEffect(() => {
    if (prediction === null || prediction === undefined) {
      navigate('/');
    }
  }, [prediction, navigate]);

  if (prediction === null || prediction === undefined) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-50 to-blue-100 px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/90 p-10 rounded-3xl shadow-2xl w-full max-w-2xl text-center"
      >
        <h1 className="text-4xl font-extrabold text-blue-900 mb-2">Your Health Prediction</h1>
        {disease && (
          <h2 className="text-xl font-semibold text-blue-500 mb-4">
            Disease: {disease}
          </h2>
        )}
        <h2 className={`text-2xl font-bold mb-4 ${prediction === 1 ? 'text-red-700' : 'text-green-700'}`}>
          {prediction === 1 ? 'At Risk' : 'No Risk'}
        </h2>

        <h3 className="text-xl font-semibold text-blue-800 mt-8 mb-2">Personalized Health Tips</h3>
        <ul className="list-disc pl-6 text-lg text-gray-700 text-left space-y-2">
          {tips && tips.map((tip, idx) => (
            <li key={idx}>{tip}</li>
          ))}
        </ul>
        <button
          onClick={() => navigate('/')}
          className="mt-8 px-6 py-3 bg-blue-700 cursor-pointer text-white rounded-xl hover:bg-blue-800 transition font-semibold shadow"
        >
          Back to Home
        </button>
      </motion.div>
    </div>
  );
}

export default ResultPage;
