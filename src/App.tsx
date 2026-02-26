import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Features } from './pages/Features';
import { Pricing } from './pages/Pricing';
import { StartWizard } from './pages/StartWizard';
import { Success } from './pages/Success';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/get-started" element={<StartWizard />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
