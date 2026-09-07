// For their page

import React from 'react';
import Sidebar from '../../../components/SideBar/Sidebar.jsx';
import TopBar from '../../../components/TopBar/TopBar.jsx';
import './Referrals.css';

const Referrals = () => {
  const verifiedReferrals = [
    { id: 1, name: 'John Smith', position: 'Senior Developer', date: '2024-01-15', status: 'Verified' },
    { id: 2, name: 'Sarah Johnson', position: 'Team Lead', date: '2024-01-10', status: 'Verified' },
    { id: 3, name: 'Mike Wilson', position: 'CTO', date: '2024-01-05', status: 'Verified' },
    { id: 4, name: 'Emily Brown', position: 'HR Manager', date: '2023-12-20', status: 'Verified' },
  ];

  const pendingReferrals = [
    { id: 5, name: 'David Lee', position: 'Product Manager', date: '2024-01-18', status: 'Pending' },
    { id: 6, name: 'Lisa Wang', position: 'Director of Engineering', date: '2024-01-16', status: 'Pending' },
  ];

  const credibilityPoints = [
    { id: 1, action: 'Verified Referral', points: '+20', date: '2024-01-15' },
    { id: 2, action: 'Completed Program', points: '+10', date: '2024-01-10' },
    { id: 3, action: 'Profile Completion', points: '+10', date: '2024-01-05' },
    { id: 4, action: 'Skill Verification', points: '+15', date: '2023-12-20' },
    { id: 5, action: 'Mentorship Session', points: '+5', date: '2023-12-15' },
  ];

  const totalPoints = credibilityPoints.reduce((sum, point) => sum + parseInt(point.points), 0);

  const handleRequestReferral = () => console.log('Requesting new referral');
  const handleManageReferral = (id, action) => console.log(`${action} referral ${id}`);

  return (
    <div>
      {/* Sidebar fixed */}
      <Sidebar />

      <div className="referrals-page-wrapper" style={{ marginLeft: '200px' }}>
        {/* TopBar */}
        <TopBar />

        <div className="referrals-page">
          {/* Header */}
          <div className="referrals-header">
            <h1 className="referrals-title">Referrals</h1>
            <button className="request-referral-button" onClick={handleRequestReferral}>
              + Request Referral
            </button>
          </div>

          {/* Stats */}
          <div className="referrals-stats">
            <div className="stats-card">
              <div className="stats-header">
                <span className="stats-icon">🏢</span>
                <h3 className="stats-title">Verified Referrals</h3>
              </div>
              <div className="stats-value">{verifiedReferrals.length}</div>
            </div>

            <div className="stats-card">
              <div className="stats-header">
                <span className="stats-icon">⏱️</span>
                <h3 className="stats-title">Pending Referrals</h3>
              </div>
              <div className="stats-value">{pendingReferrals.length}</div>
            </div>

            <div className="stats-card">
              <div className="stats-header">
                <span className="stats-icon">📊</span>
                <h3 className="stats-title">Credibility Points</h3>
              </div>
              <div className="stats-value">{totalPoints}</div>
            </div>
          </div>

          {/* Verified Referrals */}
          <div className="referrals-section">
            <div className="section-header">
              <h2 className="section-title">Verified Referrals</h2>
              <span className="section-badge">{verifiedReferrals.length} referrals</span>
            </div>
            <div className="referrals-list">
              {verifiedReferrals.map(ref => (
                <div key={ref.id} className="referral-card verified">
                  <div className="referral-header">
                    <div className="referral-info">
                      <div className="referral-name">{ref.name}</div>
                      <div className="referral-position">{ref.position}</div>
                    </div>
                    <span className="status-badge verified">{ref.status}</span>
                  </div>
                  <div className="referral-date">Referred on: {ref.date}</div>
                  <div className="referral-actions">
                    <button className="action-button view-button" onClick={() => handleManageReferral(ref.id, 'view')}>
                      🔍 View
                    </button>
                    <button className="action-button contact-button" onClick={() => handleManageReferral(ref.id, 'contact')}>
                      📞 Contact
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Referrals */}
          <div className="referrals-section">
            <div className="section-header">
              <h2 className="section-title">Pending Referrals</h2>
              <span className="section-badge">{pendingReferrals.length} pending</span>
            </div>
            <div className="referrals-list">
              {pendingReferrals.map(ref => (
                <div key={ref.id} className="referral-card pending">
                  <div className="referral-header">
                    <div className="referral-info">
                      <div className="referral-name">{ref.name}</div>
                      <div className="referral-position">{ref.position}</div>
                    </div>
                    <span className="status-badge pending">{ref.status}</span>
                  </div>
                  <div className="referral-date">Requested on: {ref.date}</div>
                  <div className="referral-actions">
                    <button className="action-button remind-button" onClick={() => handleManageReferral(ref.id, 'remind')}>
                      ✉️ Remind
                    </button>
                    <button className="action-button cancel-button" onClick={() => handleManageReferral(ref.id, 'cancel')}>
                      ❌ Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Credibility Points */}
          <div className="referrals-section">
            <div className="section-header">
              <h2 className="section-title">Credibility Points History</h2>
              <span className="section-badge">Total: {totalPoints} points</span>
            </div>
            <div className="points-history">
              {credibilityPoints.map(point => (
                <div key={point.id} className="points-card">
                  <div className="points-header">
                    <div className="points-action">{point.action}</div>
                    <div className={`points-value ${point.points.startsWith('+') ? 'positive' : 'negative'}`}>
                      {point.points}
                    </div>
                  </div>
                  <div className="points-date">{point.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Referrals;
