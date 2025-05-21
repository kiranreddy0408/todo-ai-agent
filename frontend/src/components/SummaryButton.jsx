import React, { useState } from 'react';
import api from '../api/axios';
import ReactMarkdown from 'react-markdown';

export default function SummaryButton() {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState('');
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGenerateSummary = async () => {
    setLoading(true);
    setMessage('');
    try {
      const response = await api.post('/todos/send-summary');
      setSummary(response.data.summary || 'No summary available.');
      setMessage('Summary sent to Slack');
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error generating summary:', error);
      setMessage('Failed to send summary to Slack.');
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-4 text-white">✨ AI Insights </h3>
      <button
        onClick={handleGenerateSummary}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 disabled:bg-gray-500"
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate Summary'}
      </button>
      {message && (
        <div className="mt-2 text-sm text-green-400">
          {message}
        </div>
      )}

    
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-[80%] max-w-[50%] max-h-[80vh] overflow-y-auto">
            <h4 className="text-xl font-bold text-white mb-4">Summary</h4>
            <div className="text-gray-300 mb-4 prose prose-invert max-w-none">
              <ReactMarkdown>{summary}</ReactMarkdown>
            </div>
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
