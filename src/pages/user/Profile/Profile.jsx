import React, { useState } from 'react';
import Sidebar from '../../../components/SideBar/Sidebar.jsx';
import TopBar from '../../../components/TopBar/TopBar.jsx';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { FaCertificate } from 'react-icons/fa';
import './Profile.css';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Marcus Johnson',
    email: 'marcus.j@example.com',
    location: 'Chicago, IL',
    phone: '(555) 123-4567',
    about: 'Passionate software developer with experience in front-end technologies. Looking for opportunities to grow and contribute to meaningful projects.',
    skills: ['React', 'JavaScript', 'HTML/CSS', 'Node.js', 'Git'],
    certifications: ['JavaScript Basics', 'React Fundamentals', 'Web Development Bootcamp'],
    badges: ['Profile Complete', '5+ Referrals', 'Skill Verified'],
    profilePicture: null,
  });

  const [newSkill, setNewSkill] = useState('');
  const [newCertification, setNewCertification] = useState('');

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => setIsEditing(false);
  const handleCancel = () => setIsEditing(false);

  const handlePictureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileData(prev => ({ ...prev, profilePicture: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setProfileData(prev => ({ ...prev, skills: [...prev.skills, newSkill.trim()] }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setProfileData(prev => ({ ...prev, skills: prev.skills.filter(skill => skill !== skillToRemove) }));
  };

  const addCertification = () => {
    if (newCertification.trim()) {
      setProfileData(prev => ({ ...prev, certifications: [...prev.certifications, newCertification.trim()] }));
      setNewCertification('');
    }
  };

  const removeCertification = (certToRemove) => {
    setProfileData(prev => ({ ...prev, certifications: prev.certifications.filter(cert => cert !== certToRemove) }));
  };

  return (
    <div>
      {/* Sidebar fixed */}
      <Sidebar />

      {/* Page wrapper for TopBar + content */}
      <div className="profile-page-wrapper" style={{ marginLeft: '200px' }}>
        <TopBar />

        <div className="profile-page">
          <div className="profile-header">
            <h1 className="profile-title">My Profile</h1>
            <div className="profile-actions">
              {isEditing ? (
                <>
                  <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                  <button className="btn btn-primary" onClick={handleSave}>Save Changes</button>
                </>
              ) : (
                <button className="btn btn-primary" onClick={() => setIsEditing(true)}>Edit Profile</button>
              )}
            </div>
          </div>

          <div className="profile-content">
            <div className="profile-sidebar">
              <div className="profile-picture-section">
                {profileData.profilePicture ? (
                  <img src={profileData.profilePicture} alt="Profile" className="profile-picture" />
                ) : (
                  <div className="profile-picture-placeholder">
                    <AiOutlineCheckCircle size={60} color="#9ca3af" />
                  </div>
                )}

                {isEditing && (
                  <div className="upload-section">
                    <label htmlFor="picture-upload" className="upload-button">Upload Picture</label>
                    <input id="picture-upload" type="file" accept="image/*" onChange={handlePictureUpload} className="upload-input" />
                  </div>
                )}
              </div>

              <div className="badges-section">
                <h3 className="section-title">Badges</h3>
                <div className="badges-grid">
                  {profileData.badges.map((badge, idx) => (
                    <div key={idx} className="badge">
                      <AiOutlineCheckCircle className="badge-icon" />
                      <span className="badge-text">{badge}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="profile-main">
              {/* Basic Info */}
              <div className="profile-section">
                <h3 className="section-title">Basic Information</h3>
                <div className="info-grid">
                  {['name', 'email', 'location', 'phone'].map(field => (
                    <div key={field} className="info-item">
                      <label className="info-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                      {isEditing ? (
                        <input
                          type={field==='email'?'email':field==='phone'?'tel':'text'}
                          value={profileData[field]}
                          onChange={e => handleInputChange(field, e.target.value)}
                          className="info-input"
                        />
                      ) : (
                        <div className="info-value">{profileData[field]}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* About */}
              <div className="profile-section">
                <h3 className="section-title">About Me</h3>
                {isEditing ? (
                  <textarea
                    value={profileData.about}
                    onChange={e => handleInputChange('about', e.target.value)}
                    className="about-textarea"
                    rows="4"
                  />
                ) : (
                  <div className="about-content">{profileData.about}</div>
                )}
              </div>

              {/* Skills */}
              <div className="profile-section">
                <div className="section-header">
                  <h3 className="section-title">Skills</h3>
                  {isEditing && (
                    <div className="add-item-form">
                      <input type="text" value={newSkill} onChange={e=>setNewSkill(e.target.value)} placeholder="Add new skill" className="add-input" />
                      <button className="add-button" onClick={addSkill}>Add</button>
                    </div>
                  )}
                </div>
                <div className="skills-grid">
                  {profileData.skills.map((skill, idx) => (
                    <div key={idx} className="skill-tag">
                      {skill}
                      {isEditing && <button className="remove-button" onClick={()=>removeSkill(skill)}>×</button>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div className="profile-section">
                <div className="section-header">
                  <h3 className="section-title">Certifications</h3>
                  {isEditing && (
                    <div className="add-item-form">
                      <input type="text" value={newCertification} onChange={e=>setNewCertification(e.target.value)} placeholder="Add new certification" className="add-input" />
                      <button className="add-button" onClick={addCertification}>Add</button>
                    </div>
                  )}
                </div>
                <div className="certifications-list">
                  {profileData.certifications.map((cert, idx) => (
                    <div key={idx} className="certification-item">
                      <FaCertificate className="cert-icon" />
                      <span className="cert-text">{cert}</span>
                      {isEditing && <button className="remove-button" onClick={()=>removeCertification(cert)}>×</button>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
