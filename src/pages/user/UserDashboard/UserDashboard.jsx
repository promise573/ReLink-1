import React from 'react';
import Sidebar from '../../../components/SideBar/Sidebar.jsx';
import TopBar from '../../../components/TopBar/TopBar.jsx';

import StatsCard from '../../../components/StatsCard/StatsCard.jsx';
import ProfileCompletionCard from '../../../components/ProfileCompletionCard/ProfileCompletionCard.jsx';
import RecentActivitiesCard from '../../../components/RecentActivitiesCard/RecentActivitiesCard.jsx';
import JobRecommendationsCard from '../../../components/JobRecommendationCard/JobRecommendationCard.jsx';
import QuickActionsPane from '../../../components/QuickActionPane/QuickActionPane.jsx';

import { FaStar, FaEye, FaHandshake, FaFileAlt, FaArrowUp } from 'react-icons/fa';
import './UserDashboard.css';

const UserDashboard = () => {
  const statsData = [
    {
      id: 1,
      title: 'Credibility Score',
      value: '75%',
      description: 'Based on verified referrals',
      icon: <FaStar size={20} color="#111827" />,
      trend: { type: 'up', icon: <FaArrowUp size={14} />, value: '+5% this month' }
    },
    {
      id: 2,
      title: 'Profile Views',
      value: '128',
      description: 'Last 30 days',
      icon: <FaEye size={20} color="#111827" />,
      trend: { type: 'up', icon: <FaArrowUp size={14} />, value: '+12% this month' }
    },
    {
      id: 3,
      title: 'Referrals',
      value: '8',
      description: 'Total verified referrals',
      icon: <FaHandshake size={20} color="#111827" />,
      trend: { type: 'up', icon: <FaArrowUp size={14} />, value: '+3 this month' }
    },
    {
      id: 4,
      title: 'Job Applications',
      value: '12',
      description: 'Pending applications',
      icon: <FaFileAlt size={20} color="#111827" />,
      trend: { type: 'up', icon: <FaArrowUp size={14} />, value: '+5 this month' }
    }
  ];

  return (
    <div>
      {/* Sidebar fixed on the left */}
      <Sidebar />

      {/* Content wrapper for topbar + dashboard */}
      <div className="user-dashboard-wrapper" style={{ marginLeft: '200px' }}>
        {/* TopBar sticky on top */}
        <TopBar />

        {/* Actual dashboard content */}
        <div className="user-dashboard">
          <div className="user-dashboard-header">
            <h1 className="user-dashboard-title">Dashboard</h1>
            <p className="user-dashboard-subtitle">
              Welcome back! Here's your overview.
            </p>
          </div>

          <div className="stats-row">
            {statsData.map(stat => (
              <StatsCard
                key={stat.id}
                title={stat.title}
                value={stat.value}
                description={stat.description}
                icon={stat.icon}
                trend={stat.trend}
              />
            ))}
          </div>

          <div className="user-dashboard-content">
            <div className="content-left">
              <ProfileCompletionCard />
              <div className="spacer"></div>
              <RecentActivitiesCard />
              <div className="spacer"></div>
              <QuickActionsPane /> {/* Moved below Recent Activities */}
            </div>

            <div className="content-right">
              <JobRecommendationsCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
