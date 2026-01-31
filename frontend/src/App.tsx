import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import Home from './pages/Home';
import ResumeCheckerModern from './pages/ResumeCheckerModern';
import MockInterviewModern from './pages/MockInterviewModern';
import SkillGapModern from './pages/SkillGapModern';
import JobRecommendations from './pages/JobRecommendations';
import History from './pages/History';

function App() {
  return (
    <Router>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1e293b',
            color: '#fff',
            padding: '16px',
            borderRadius: '12px',
          },
        }}
      />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resume" element={<ResumeCheckerModern />} />
          <Route path="/interview" element={<MockInterviewModern />} />
          <Route path="/skill-gap" element={<SkillGapModern />} />
          <Route path="/jobs" element={<JobRecommendations />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
