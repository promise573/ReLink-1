import { useState, useEffect } from 'react';
import Sidebar from '../../../components/SideBar/Sidebar.jsx';
import TopBar from '../../../components/TopBar/TopBar.jsx';
import { FileText } from 'lucide-react';

import DocumentList from '../../../components/verification/DocumentList';
import DocumentUploadForm from '../../../components/verification/DocumentUploadForm';
import AdminDocumentCard from '../../../components/verification/AdminDocumentCard';
import { verificationAPI } from '../../../services/verificationAPI';

import './verification.css';

const VerificationDashboard = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId] = useState(1);

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const data = await verificationAPI.getUserDocuments(userId);
      setDocuments(data || []); // ensure it's always an array
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  const fetchAllDocuments = async () => {
    setLoading(true);
    try {
      const data = await verificationAPI.getAllDocuments();
      setDocuments(data || []); // ensure it's always an array
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (activeTab === 'user') fetchDocuments();
    else if (activeTab === 'admin') fetchAllDocuments();
  }, [activeTab]);

  const handleDelete = async (docId) => {
    if (!confirm('Delete?')) return;
    try {
      await verificationAPI.deleteDocument(docId);
      alert('Deleted!');
      fetchDocuments();
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="verification-layout">
      {/* Sidebar */}
      <Sidebar className="verification-layout-sidebar" />

      {/* Main content */}
      <div className="verification-layout-main">
        {/* TopBar */}
        <TopBar className="verification-topbar" title="Document Verification" />

        {/* Content */}
        <div className="verification-content">
          {/* Tabs */}
          <div className="verification-tabs">
            {['user', 'upload', 'admin'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`verification-tab ${activeTab === tab ? 'active' : ''}`}
              >
                {tab === 'user' ? 'My Documents' : tab === 'upload' ? 'Upload New' : 'Admin Panel'}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'upload' && (
            <DocumentUploadForm
              userId={userId}
              onSuccess={() => setActiveTab('user')}
            />
          )}

          {activeTab === 'user' && (
            <DocumentList
              documents={documents}
              loading={loading}
              onDelete={handleDelete}
            />
          )}

          {activeTab === 'admin' && (
            <div className="admin-docs-container">
              {loading ? (
                <div className="loading-spinner">
                  <div className="spinner"></div>
                  <p>Loading...</p>
                </div>
              ) : (
                documents.map(doc => (
                  <AdminDocumentCard
                    key={doc.docId}
                    document={doc}
                    onUpdate={fetchAllDocuments}
                  />
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerificationDashboard;
