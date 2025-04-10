import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Import components
import SimpleNavigation from './components/layout/SimpleNavigation';

// Import pages
import Dashboard from './pages/Dashboard';
import Organization from './pages/Organization';
import Monitoring from './pages/Monitoring';
import Automation from './pages/Automation';
import Integrations from './pages/Integrations';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <SimpleNavigation />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/organization" element={<Organization />} />
            <Route path="/monitoring" element={<Monitoring />} />
            <Route path="/automation" element={<Automation />} />
            <Route path="/integrations" element={<Integrations />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
