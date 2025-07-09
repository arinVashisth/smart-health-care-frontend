import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import CardioForm from './form/CardioForm';
import DiabetesForm from './form/DiabetesForm';
import CopdForm from './form/CopdForm';
import DepressionForm from './form/DepressionForm';
import KidneyForm from './form/KidneyForm';
import ResultPage from './ResultPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/form/cardiovascular" element={<CardioForm />} />
      <Route path="/form/diabetes" element={<DiabetesForm />} />
      <Route path="/form/copd" element={<CopdForm />} />
      <Route path="/form/depression" element={<DepressionForm />} />
      <Route path="/form/kidney" element={<KidneyForm />} />
      <Route path="/result" element={<ResultPage />} />
    </Routes>
  </BrowserRouter>
);
