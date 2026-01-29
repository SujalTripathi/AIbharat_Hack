import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ResumeChecker from './pages/ResumeChecker';
import MockInterview from './pages/MockInterview';
import SkillGap from './pages/SkillGap';
import JobRecommendations from './pages/JobRecommendations';
import History from './pages/History';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resume" element={<ResumeChecker />} />
          <Route path="/interview" element={<MockInterview />} />
          <Route path="/skill-gap" element={<SkillGap />} />
          <Route path="/jobs" element={<JobRecommendations />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
