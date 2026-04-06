import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { CustomPage } from './pages/CustomPage';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/custom" element={<CustomPage />} />
      </Routes>
    </BrowserRouter>
  );
}
