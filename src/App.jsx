import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import WhyOnline from './pages/WhyOnline';
import Partners from './pages/Partners';
import Work from './pages/Work';
import Internships from './pages/Internships';
import ContactModal from './components/ContactModal';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import ScrollToTop from './components/ScrollToTop';
import NotFound from './pages/NotFound';
import { useState } from 'react';

function AppContent({ isContactModalOpen, setIsContactModalOpen, initialBriefData, setInitialBriefData }) {
  const location = useLocation();

  return (
    <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <ScrollToTop />
      <Navbar setIsContactModalOpen={setIsContactModalOpen} />
      <main style={{ flex: 1 }}>
        <div key={location.pathname} className="route-fade-transition">
          <Routes>
            <Route path="/" element={<Home setIsContactModalOpen={setIsContactModalOpen} />} />
            <Route path="/why-online" element={<WhyOnline setIsContactModalOpen={setIsContactModalOpen} />} />
            <Route path="/partners" element={<Partners setIsContactModalOpen={setIsContactModalOpen} />} />
            <Route path="/work" element={<Work setIsContactModalOpen={setIsContactModalOpen} />} />
            <Route path="/products" element={<Work setIsContactModalOpen={setIsContactModalOpen} />} />
            <Route path="/internships" element={<Internships />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
      <Footer setIsContactModalOpen={setIsContactModalOpen} />
      <FloatingWhatsApp />
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)}
        initialData={initialBriefData}
      />
    </div>
  );
}

function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [initialBriefData, setInitialBriefData] = useState(null);

  return (
    <Router>
      <AppContent 
        isContactModalOpen={isContactModalOpen}
        setIsContactModalOpen={setIsContactModalOpen}
        initialBriefData={initialBriefData}
        setInitialBriefData={setInitialBriefData}
      />
    </Router>
  );
}

export default App;
