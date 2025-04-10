import React from 'react';
import SimpleDashboard from '../components/dashboard/SimpleDashboard';

const Dashboard: React.FC = () => {
  return (
    <div style={{ background: '#f3f4f6', minHeight: '100vh' }}>
      <SimpleDashboard />
    </div>
  );
};

export default Dashboard;
