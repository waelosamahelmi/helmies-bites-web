import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Features } from './pages/Features';
import { Pricing } from './pages/Pricing';
import { StartWizard } from './pages/StartWizard';
import { Success } from './pages/Success';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { FAQ } from './pages/FAQ';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { GDPR } from './pages/GDPR';
import { Cookies } from './pages/Cookies';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0D0907]">
      <ScrollToTop />
      <Navbar />
      <main className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/get-started" element={<StartWizard />} />
          <Route path="/success" element={<Success />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/gdpr" element={<GDPR />} />
          <Route path="/cookies" element={<Cookies />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
