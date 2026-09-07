import React, { useState } from 'react';
import Sidebar from '../../../components/SideBar/Sidebar.jsx';
import TopBar from '../../../components/TopBar/TopBar.jsx';
import { FaBriefcase, FaGraduationCap, FaHandsHelping, FaStar } from 'react-icons/fa';
import './Timeline.css';

const Timeline = () => {
  const [events, setEvents] = useState({
    preSentence: [
      { id: 1, title: 'Software Developer', date: '2015-2018', description: 'Worked as a frontend developer at TechCorp', type: 'work' },
      { id: 2, title: 'Bachelor\'s Degree', date: '2011-2015', description: 'Computer Science from State University', type: 'education' },
    ],
    duringIncarceration: [
      { id: 3, title: 'IT Certification', date: '2019', description: 'Completed programming fundamentals course', type: 'education' },
      { id: 4, title: 'Peer Tutor', date: '2020', description: 'Helped others learn basic computer skills', type: 'volunteer' },
    ],
    postIncarceration: [
      { id: 5, title: 'Job Training Program', date: '2023', description: 'Completed re-entry job training', type: 'education' },
      { id: 6, title: 'First Interview', date: '2023', description: 'Technical interview for developer position', type: 'milestone' },
    ],
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    description: '',
    type: 'work',
    period: 'preSentence',
  });

  const handleAddEvent = () => {
    setEditingEvent(null);
    setNewEvent({ title: '', date: '', description: '', type: 'work', period: 'preSentence' });
    setIsModalOpen(true);
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setNewEvent(event);
    setIsModalOpen(true);
  };

  const handleDeleteEvent = (eventId, period) => {
    setEvents(prev => ({
      ...prev,
      [period]: prev[period].filter(event => event.id !== eventId)
    }));
  };

  const handleSaveEvent = () => {
    if (editingEvent) {
      setEvents(prev => ({
        ...prev,
        [editingEvent.period]: prev[editingEvent.period].map(event =>
          event.id === editingEvent.id ? { ...newEvent, id: editingEvent.id } : event
        )
      }));
    } else {
      const newId = Date.now();
      setEvents(prev => ({
        ...prev,
        [newEvent.period]: [...prev[newEvent.period], { ...newEvent, id: newId }]
      }));
    }
    setIsModalOpen(false);
  };

  const getPeriodTitle = (period) => {
    switch (period) {
      case 'preSentence': return 'Pre-sentence';
      case 'duringIncarceration': return 'During Incarceration';
      case 'postIncarceration': return 'Post-incarceration';
      default: return period;
    }
  };

  const getEventIcon = (type) => {
    switch (type) {
      case 'work': return <FaBriefcase className="icon" />;
      case 'education': return <FaGraduationCap className="icon" />;
      case 'volunteer': return <FaHandsHelping className="icon" />;
      case 'milestone': return <FaStar className="icon" />;
      default: return null;
    }
  };

  return (
    <div>
      {/* Sidebar fixed */}
      <Sidebar />

      <div className="timeline-page-wrapper" style={{ marginLeft: '200px' }}>
        {/* TopBar */}
        <TopBar />

        <div className="timeline-page">
          <div className="timeline-header">
            <h1 className="timeline-title">Life Timeline</h1>
            <button className="add-event-button" onClick={handleAddEvent}>+ Add Event</button>
          </div>

          <div className="timeline-container">
            {Object.keys(events).map(period => (
              <div key={period} className="timeline-period">
                <h2 className="period-title">{getPeriodTitle(period)}</h2>
                <div className="events-grid">
                  {events[period].map(event => (
                    <div key={event.id} className="event-card">
                      <div className="timeline-dot"></div>
                      <div className="event-header">
                        <span className="event-icon">{getEventIcon(event.type)}</span>
                        <div className="event-title">{event.title}</div>
                        <div className="event-actions">
                          <button className="action-button edit-button" onClick={() => handleEditEvent({ ...event, period })}>✏️</button>
                          <button className="action-button delete-button" onClick={() => handleDeleteEvent(event.id, period)}>🗑️</button>
                        </div>
                      </div>
                      <div className="event-date">{event.date}</div>
                      <div className="event-description">{event.description}</div>
                      <div className={`event-type ${event.type}`}>
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {isModalOpen && (
            <div className="modal-overlay">
              <div className="modal">
                <h3 className="modal-title">{editingEvent ? 'Edit Event' : 'Add New Event'}</h3>
                <div className="modal-form">
                  <div className="form-group">
                    <label className="form-label">Title</label>
                    <input type="text" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} className="form-input" placeholder="Enter event title" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Date/Period</label>
                    <input type="text" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} className="form-input" placeholder="e.g., 2023, or 2018-2020" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} className="form-textarea" placeholder="Describe the event" rows="3" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Event Type</label>
                    <select value={newEvent.type} onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })} className="form-select">
                      <option value="work">Work</option>
                      <option value="education">Education</option>
                      <option value="volunteer">Volunteer</option>
                      <option value="milestone">Milestone</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Time Period</label>
                    <select value={newEvent.period} onChange={(e) => setNewEvent({ ...newEvent, period: e.target.value })} className="form-select">
                      <option value="preSentence">Pre-sentence</option>
                      <option value="duringIncarceration">During Incarceration</option>
                      <option value="postIncarceration">Post-incarceration</option>
                    </select>
                  </div>
                </div>
                <div className="modal-actions">
                  <button className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                  <button className="btn btn-primary" onClick={handleSaveEvent}>{editingEvent ? 'Update' : 'Add'} Event</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
