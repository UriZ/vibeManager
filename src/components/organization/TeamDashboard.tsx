import React, { useState } from 'react';
import { TeamMember } from '../../models/TeamMember';

interface TeamDashboardProps {
  teamMembers: TeamMember[];
  currentUser: TeamMember;
  onViewTeam: (managerId: string) => void;
  isTeamView?: boolean;
}

const TeamDashboard: React.FC<TeamDashboardProps> = ({ 
  teamMembers, 
  currentUser,
  onViewTeam,
  isTeamView = false
}) => {
  // Get direct reports for the current user
  const directReports = teamMembers.filter(member => 
    member.managerId === currentUser.id
  );
  
  // Get status color based on workload and flagged items
  const getStatusColor = (member: TeamMember) => {
    // Check for flagged items first
    if (member.flaggedItems && member.flaggedItems.length > 0) {
      return '#ef4444'; // red
    }
    
    // Check for flagged tasks
    const hasFlaggedTasks = member.currentTasks.some(task => task.flagged);
    if (hasFlaggedTasks) {
      return '#ef4444'; // red
    }
    
    // Check sprint status if available
    if (member.currentSprint) {
      if (member.currentSprint.status === 'behind') {
        return '#ef4444'; // red
      }
      if (member.currentSprint.status === 'at-risk') {
        return '#f59e0b'; // amber
      }
    }
    
    // Default to workload
    if (member.workload >= 80) {
      return '#f59e0b'; // amber
    }
    
    return '#10b981'; // green
  };
  
  // Get team size for a manager
  const getTeamSize = (managerId: string) => {
    return teamMembers.filter(member => member.managerId === managerId).length;
  };
  
  // Get top skill for a team member
  const getTopSkill = (member: TeamMember) => {
    return member.skills.length > 0 ? member.skills[0] : 'N/A';
  };
  
  // Get project count (using tasks as proxy)
  const getProjectCount = (member: TeamMember) => {
    // Count unique projects from tasks (simplified)
    return Math.max(1, Math.ceil(member.currentTasks.length / 2));
  };

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>Team Dashboard</h1>
        <p style={{ color: '#6b7280' }}>{isTeamView ? `${currentUser.name}'s Team` : 'Your Direct Reports'} ({directReports.length})</p>
      </div>
      
      {/* Only show the manager card at the top if we're not in team view */}
      {!isTeamView && (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
          <div style={{ 
            width: '240px',
            padding: '20px', 
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              backgroundColor: '#f97316',
              color: 'white',
              borderRadius: '4px',
              padding: '2px 6px',
              fontSize: '12px',
              fontWeight: 'bold'
            }}>
              YOU
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ 
                width: '50px', 
                height: '50px', 
                borderRadius: '50%', 
                backgroundColor: '#e5e7eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '12px'
              }}>
                {currentUser.avatar}
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '4px' }}>You</h3>
                <p style={{ fontSize: '14px', color: '#6b7280' }}>{currentUser.role}</p>
              </div>
            </div>
            <p style={{ 
              color: '#3b82f6', 
              fontSize: '14px',
              fontWeight: '500',
              textAlign: 'center',
              padding: '8px',
              backgroundColor: '#f0f9ff',
              borderRadius: '4px'
            }}>
              {directReports.length} direct reports
            </p>
          </div>
        </div>
      )}
      
      {/* Direct Reports Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '20px',
        marginBottom: '40px'
      }}>
        {directReports.map(member => (
          <div key={member.id} style={{ 
            padding: '20px', 
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            position: 'relative'
          }}>
            {member.isManager && (
              <div style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                backgroundColor: '#3b82f6',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '14px',
                cursor: 'pointer'
              }}
              onClick={() => onViewTeam(member.id)}
              >
                →
              </div>
            )}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ 
                width: '50px', 
                height: '50px', 
                borderRadius: '50%', 
                backgroundColor: '#e5e7eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '12px',
                position: 'relative'
              }}>
                {member.avatar}
                <div style={{
                  position: 'absolute',
                  bottom: '0',
                  right: '0',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: getStatusColor(member),
                  border: '2px solid white'
                }} />
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '4px' }}>{member.name}</h3>
                <p style={{ fontSize: '14px', color: '#6b7280' }}>{member.role}</p>
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              {member.isManager && (
                <div>
                  <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Team Size</p>
                  <p style={{ fontSize: '16px', fontWeight: '600' }}>{getTeamSize(member.id)}</p>
                </div>
              )}
              <div>
                <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Projects</p>
                <p style={{ fontSize: '16px', fontWeight: '600' }}>{getProjectCount(member)}</p>
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Skills</p>
                <p style={{ fontSize: '16px', fontWeight: '600' }}>{getTopSkill(member)}</p>
              </div>
            </div>
            
            <div>
              <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Department</p>
              <p style={{ 
                fontSize: '14px', 
                fontWeight: '500',
                display: 'inline-block',
                padding: '4px 8px',
                backgroundColor: '#f3f4f6',
                borderRadius: '4px'
              }}>
                {member.department}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamDashboard;
