import React, { useState } from 'react';
import { TeamMember, Department, Task, Sprint } from '../models/TeamMember';
import HierarchicalTeamView from '../components/organization/HierarchicalTeamView';

const Organization: React.FC = () => {
  // Sample data for team members with hierarchical structure
  const [teamMembers] = useState<TeamMember[]>([
    // Senior Leadership
    {
      id: 'user',
      name: 'You',
      role: 'VP of Engineering',
      department: 'Engineering',
      managerId: null,
      isManager: true,
      avatar: 'YO',
      directReports: ['m1', 'm2', 'm3', 'ic1'],
      currentTasks: [
        { id: 't1', name: 'Quarterly Planning', priority: 'high', dueDate: '2025-04-20', status: 'in-progress' },
        { id: 't2', name: 'Budget Review', priority: 'medium', dueDate: '2025-04-25', status: 'not-started' },
      ],
      workload: 70,
      skills: ['Leadership', 'Strategy', 'Engineering Management'],
      currentSprint: {
        id: 's1',
        name: 'Q2 Planning',
        startDate: '2025-04-01',
        endDate: '2025-04-14',
        commitedPoints: 40,
        completedPoints: 25,
        remainingPoints: 15,
        status: 'on-track'
      },
      flaggedItems: [
        {
          id: 'f1',
          type: 'risk',
          description: 'Potential delay in Q2 roadmap',
          severity: 'medium',
          createdDate: '2025-04-10'
        }
      ]
    },
    
    // Managers (direct reports to you)
    {
      id: 'm1',
      name: 'Alex Johnson',
      role: 'Engineering Manager',
      department: 'Engineering',
      managerId: 'user',
      isManager: true,
      avatar: 'AJ',
      directReports: ['dev1', 'dev2', 'dev3'],
      currentTasks: [
        { id: 't3', name: 'Team Performance Reviews', priority: 'high', dueDate: '2025-04-15', status: 'in-progress' },
        { id: 't4', name: 'Architecture Planning', priority: 'medium', dueDate: '2025-04-18', status: 'not-started' },
      ],
      workload: 85,
      skills: ['Leadership', 'Project Management', 'Software Architecture'],
      currentSprint: {
        id: 's2',
        name: 'Backend Sprint 12',
        startDate: '2025-04-01',
        endDate: '2025-04-14',
        commitedPoints: 60,
        completedPoints: 40,
        remainingPoints: 20,
        status: 'at-risk'
      },
      flaggedItems: [
        {
          id: 'f2',
          type: 'blocker',
          description: 'API integration blocked by external dependency',
          severity: 'high',
          createdDate: '2025-04-09'
        }
      ]
    },
    {
      id: 'm2',
      name: 'Emily Rodriguez',
      role: 'Design Manager',
      department: 'Design',
      managerId: 'user',
      isManager: true,
      avatar: 'ER',
      directReports: ['des1', 'des2'],
      currentTasks: [
        { id: 't5', name: 'Design System Update', priority: 'high', dueDate: '2025-04-17', status: 'in-progress' },
        { id: 't6', name: 'User Research Planning', priority: 'medium', dueDate: '2025-04-22', status: 'not-started' },
      ],
      workload: 75,
      skills: ['UI/UX', 'Design Leadership', 'User Research'],
      currentSprint: {
        id: 's3',
        name: 'Design Sprint 8',
        startDate: '2025-04-01',
        endDate: '2025-04-14',
        commitedPoints: 45,
        completedPoints: 30,
        remainingPoints: 15,
        status: 'on-track'
      }
    },
    {
      id: 'm3',
      name: 'David Chen',
      role: 'Product Manager',
      department: 'Product',
      managerId: 'user',
      isManager: true,
      avatar: 'DC',
      directReports: ['pm1'],
      currentTasks: [
        { id: 't7', name: 'Q2 Roadmap Finalization', priority: 'high', dueDate: '2025-04-16', status: 'in-progress' },
        { id: 't8', name: 'Stakeholder Presentations', priority: 'medium', dueDate: '2025-04-20', status: 'not-started' },
      ],
      workload: 80,
      skills: ['Product Strategy', 'User Research', 'Agile'],
      currentSprint: {
        id: 's4',
        name: 'Product Planning',
        startDate: '2025-04-01',
        endDate: '2025-04-14',
        commitedPoints: 50,
        completedPoints: 35,
        remainingPoints: 15,
        status: 'on-track'
      }
    },
    
    // Individual Contributor (direct report to you)
    {
      id: 'ic1',
      name: 'Michael Wong',
      role: 'Senior Architect',
      department: 'Engineering',
      managerId: 'user',
      isManager: false,
      avatar: 'MW',
      directReports: [],
      currentTasks: [
        { id: 't9', name: 'System Architecture Review', priority: 'high', dueDate: '2025-04-18', status: 'in-progress' },
        { id: 't10', name: 'Tech Debt Assessment', priority: 'medium', dueDate: '2025-04-22', status: 'not-started' },
      ],
      workload: 70,
      skills: ['System Architecture', 'Cloud Infrastructure', 'Technical Leadership'],
      currentSprint: {
        id: 's5',
        name: 'Architecture Sprint',
        startDate: '2025-04-01',
        endDate: '2025-04-14',
        commitedPoints: 30,
        completedPoints: 20,
        remainingPoints: 10,
        status: 'on-track'
      }
    },
    
    // Team members under Alex Johnson
    {
      id: 'dev1',
      name: 'Sarah Miller',
      role: 'Senior Developer',
      department: 'Engineering',
      managerId: 'm1',
      isManager: false,
      avatar: 'SM',
      directReports: [],
      currentTasks: [
        { id: 't11', name: 'API Integration', priority: 'high', dueDate: '2025-04-14', status: 'in-progress', flagged: true, blockers: ['Waiting for external API documentation'] },
        { id: 't12', name: 'Code Review', priority: 'medium', dueDate: '2025-04-13', status: 'in-progress' },
      ],
      workload: 90,
      skills: ['React', 'Node.js', 'TypeScript'],
      currentSprint: {
        id: 's6',
        name: 'Backend Sprint 12',
        startDate: '2025-04-01',
        endDate: '2025-04-14',
        commitedPoints: 20,
        completedPoints: 12,
        remainingPoints: 8,
        status: 'at-risk'
      },
      flaggedItems: [
        {
          id: 'f3',
          type: 'blocker',
          description: 'Missing API documentation from partner team',
          severity: 'high',
          createdDate: '2025-04-08'
        }
      ]
    },
    {
      id: 'dev2',
      name: 'James Wilson',
      role: 'Backend Developer',
      department: 'Engineering',
      managerId: 'm1',
      isManager: false,
      avatar: 'JW',
      directReports: [],
      currentTasks: [
        { id: 't13', name: 'Database Optimization', priority: 'high', dueDate: '2025-04-15', status: 'in-progress' },
        { id: 't14', name: 'API Endpoint Implementation', priority: 'medium', dueDate: '2025-04-14', status: 'in-progress' },
      ],
      workload: 75,
      skills: ['Node.js', 'MongoDB', 'SQL'],
      currentSprint: {
        id: 's7',
        name: 'Backend Sprint 12',
        startDate: '2025-04-01',
        endDate: '2025-04-14',
        commitedPoints: 18,
        completedPoints: 12,
        remainingPoints: 6,
        status: 'on-track'
      }
    },
    {
      id: 'dev3',
      name: 'Lisa Park',
      role: 'Frontend Developer',
      department: 'Engineering',
      managerId: 'm1',
      isManager: false,
      avatar: 'LP',
      directReports: [],
      currentTasks: [
        { id: 't15', name: 'Dashboard Components', priority: 'high', dueDate: '2025-04-16', status: 'in-progress' },
        { id: 't16', name: 'UI Testing', priority: 'medium', dueDate: '2025-04-15', status: 'not-started' },
      ],
      workload: 80,
      skills: ['React', 'TypeScript', 'CSS'],
      currentSprint: {
        id: 's8',
        name: 'Backend Sprint 12',
        startDate: '2025-04-01',
        endDate: '2025-04-14',
        commitedPoints: 22,
        completedPoints: 16,
        remainingPoints: 6,
        status: 'on-track'
      }
    },
    
    // Team members under Emily Rodriguez
    {
      id: 'des1',
      name: 'Ryan Thompson',
      role: 'Senior Designer',
      department: 'Design',
      managerId: 'm2',
      isManager: false,
      avatar: 'RT',
      directReports: [],
      currentTasks: [
        { id: 't17', name: 'Design System Components', priority: 'high', dueDate: '2025-04-15', status: 'in-progress' },
        { id: 't18', name: 'User Flow Diagrams', priority: 'medium', dueDate: '2025-04-17', status: 'not-started' },
      ],
      workload: 85,
      skills: ['UI Design', 'Design Systems', 'Figma'],
      currentSprint: {
        id: 's9',
        name: 'Design Sprint 8',
        startDate: '2025-04-01',
        endDate: '2025-04-14',
        commitedPoints: 25,
        completedPoints: 18,
        remainingPoints: 7,
        status: 'on-track'
      }
    },
    {
      id: 'des2',
      name: 'Olivia Martinez',
      role: 'UX Researcher',
      department: 'Design',
      managerId: 'm2',
      isManager: false,
      avatar: 'OM',
      directReports: [],
      currentTasks: [
        { id: 't19', name: 'User Interviews', priority: 'high', dueDate: '2025-04-18', status: 'in-progress' },
        { id: 't20', name: 'Usability Testing', priority: 'medium', dueDate: '2025-04-20', status: 'not-started' },
      ],
      workload: 65,
      skills: ['User Research', 'Usability Testing', 'Data Analysis'],
      currentSprint: {
        id: 's10',
        name: 'Design Sprint 8',
        startDate: '2025-04-01',
        endDate: '2025-04-14',
        commitedPoints: 20,
        completedPoints: 12,
        remainingPoints: 8,
        status: 'on-track'
      }
    },
    
    // Team member under David Chen
    {
      id: 'pm1',
      name: 'Sophia Lee',
      role: 'Associate Product Manager',
      department: 'Product',
      managerId: 'm3',
      isManager: false,
      avatar: 'SL',
      directReports: [],
      currentTasks: [
        { id: 't21', name: 'Feature Specifications', priority: 'high', dueDate: '2025-04-15', status: 'in-progress' },
        { id: 't22', name: 'Competitive Analysis', priority: 'medium', dueDate: '2025-04-19', status: 'not-started' },
      ],
      workload: 70,
      skills: ['Product Management', 'Market Research', 'Data Analysis'],
      currentSprint: {
        id: 's11',
        name: 'Product Planning',
        startDate: '2025-04-01',
        endDate: '2025-04-14',
        commitedPoints: 18,
        completedPoints: 12,
        remainingPoints: 6,
        status: 'on-track'
      }
    }
  ]);

  // Sample data for departments
  const [departments] = useState<Department[]>([
    { id: 'd1', name: 'Engineering', headId: 'user', headCount: 8, projects: 3 },
    { id: 'd2', name: 'Product', headId: 'm3', headCount: 4, projects: 2 },
    { id: 'd3', name: 'Design', headId: 'm2', headCount: 3, projects: 3 },
    { id: 'd4', name: 'Marketing', headId: 'jw1', headCount: 5, projects: 2 },
    { id: 'd5', name: 'Operations', headId: 'rt1', headCount: 6, projects: 1 },
  ]);

  // Get department head name by ID
  const getDepartmentHeadName = (headId: string) => {
    const head = teamMembers.find(member => member.id === headId);
    return head ? head.name : 'Unknown';
  };

  return (
    <div style={{ background: '#f3f4f6', minHeight: '100vh', padding: '20px' }}>
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>Organization</h1>
        
        {/* Department Overview */}
        <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.12)', padding: '24px', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Department Overview</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
            {departments.map(dept => (
              <div key={dept.id} style={{ 
                border: '1px solid #e5e7eb', 
                borderRadius: '8px', 
                padding: '16px',
                backgroundColor: dept.id === 'd1' ? '#f0f9ff' : 'white' // Highlight Engineering department
              }}>
                <h3 style={{ fontWeight: '600', fontSize: '16px' }}>{dept.name}</h3>
                <div style={{ fontSize: '14px', color: '#4b5563', marginTop: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span>Head:</span>
                    <span style={{ fontWeight: '500' }}>{getDepartmentHeadName(dept.headId)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span>Team Size:</span>
                    <span style={{ fontWeight: '500' }}>{dept.headCount}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Active Projects:</span>
                    <span style={{ fontWeight: '500' }}>{dept.projects}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Hierarchical Team View */}
        <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.12)', padding: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Team Structure</h2>
          <HierarchicalTeamView teamMembers={teamMembers} currentManagerId={null} />
        </div>
      </div>
    </div>
  );
};

export default Organization;
