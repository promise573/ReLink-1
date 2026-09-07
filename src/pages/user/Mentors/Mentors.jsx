import React, { useState } from 'react';
import Sidebar from '../../../components/SideBar/Sidebar';
import TopBar from '../../../components/TopBar/TopBar';
import './Mentors.css';

const mockMentors = [
  { id: 1, name: 'Alice Johnson', expertise: ['Graphic Design', 'UI/UX'], status: 'Available' },
  { id: 2, name: 'Brian Smith', expertise: ['Photography', 'Editing'], status: 'Busy' },
  { id: 3, name: 'Clara Lee', expertise: ['Animation', 'Illustration'], status: 'Available' },
  { id: 4, name: 'David Kim', expertise: ['Music Production'], status: 'Busy' },
  { id: 5, name: 'Ella Brown', expertise: ['Video Editing', 'Cinematography'], status: 'Available' },
  { id: 6, name: 'Frank White', expertise: ['3D Modeling', 'Graphic Design'], status: 'Available' },
];

const MentorsPage = () => {
  const [requests, setRequests] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [sessionDate, setSessionDate] = useState('');
  const [sessionTime, setSessionTime] = useState('');

  const sendRequest = (mentorId) => {
    if (!requests.includes(mentorId)) {
      setRequests([...requests, mentorId]);
      alert('Mentorship request sent!');
    }
  };

  const openModal = (mentor) => {
    setSelectedMentor(mentor);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMentor(null);
    setSessionDate('');
    setSessionTime('');
    setModalOpen(false);
  };

  const scheduleSession = () => {
    if (!sessionDate || !sessionTime) {
      alert('Please select a date and time.');
      return;
    }
    alert(`Session scheduled with ${selectedMentor.name} on ${sessionDate} at ${sessionTime}`);
    closeModal();
  };

  return (
    <div>
      <Sidebar />
      <TopBar />
      <main className="mentors-page">
        <div className="page-header">
          <h1>Mentors</h1>
          <p>Explore our mentors and request guidance to grow your skills.</p>
        </div>

        <div className="mentors-grid">
          {mockMentors.map((mentor) => (
            <div key={mentor.id} className="mentor-card">
              <div className={`mentor-avatar ${mentor.status === 'Available' ? 'available' : 'busy'}`}>
                <span>{mentor.name[0]}</span>
              </div>
              <h2>{mentor.name}</h2>
              <div className="expertise-tags">
                {mentor.expertise.map((exp, idx) => (
                  <span key={idx} className="expertise-tag">{exp}</span>
                ))}
              </div>
              <span className={`status-badge ${mentor.status === 'Available' ? 'available' : 'busy'}`}>
                {mentor.status}
              </span>
              <div className="card-buttons">
                <button
                  className="request-btn"
                  onClick={() => sendRequest(mentor.id)}
                  disabled={requests.includes(mentor.id)}
                >
                  {requests.includes(mentor.id) ? 'Request Sent' : 'Send Request'}
                </button>
                <button
                  className="schedule-btn"
                  onClick={() => openModal(mentor)}
                  disabled={mentor.status !== 'Available'}
                >
                  Schedule Session
                </button>
              </div>
              <div className="bg-blue-500 text-white p-6">
              </div>

            </div>
          ))}
        </div>

        {/* Modal */}
        {modalOpen && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>Schedule Session with {selectedMentor.name}</h2>
              <div className="modal-form">
                <label>
                  Date:
                  <input type="date" value={sessionDate} onChange={(e) => setSessionDate(e.target.value)} />
                </label>
                <label>
                  Time:
                  <input type="time" value={sessionTime} onChange={(e) => setSessionTime(e.target.value)} />
                </label>
                <div className="modal-buttons">
                  <button className="schedule-confirm-btn" onClick={scheduleSession}>Confirm</button>
                  <button className="schedule-cancel-btn" onClick={closeModal}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default MentorsPage;
