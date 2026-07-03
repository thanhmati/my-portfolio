import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CourseDetail from './pages/CourseDetail';
import ProjectDetail from './pages/ProjectDetail';
import MainLayout from './layouts/MainLayout';

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
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/course/:courseId" element={<CourseDetail />} />
              <Route path="/project/:projectId" element={<ProjectDetail />} />
            </Routes>
          </MainLayout>
        </div>
      </div>
    </Router>
  );
}

export default App;
