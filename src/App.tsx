import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import MainLayout from './layouts/MainLayout';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/project/:projectId" element={<ProjectDetail />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-bg-dark text-slate-200 selection:bg-accent-violet/30 selection:text-slate-100">
        {/* Retro Grid Background */}
        <div className="fixed inset-0 bg-grid-pattern opacity-30 pointer-events-none z-0" />
        
        {/* Scanlines Effect */}
        <div className="fixed inset-0 scanline pointer-events-none z-50 opacity-5" />

        <div className="relative z-10">
          <MainLayout>
            <AnimatedRoutes />
          </MainLayout>
        </div>
      </div>
    </Router>
  );
}

export default App;

