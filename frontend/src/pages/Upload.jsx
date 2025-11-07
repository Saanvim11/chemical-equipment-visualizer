import { useState } from 'react';
import { uploadCSV } from '../services/api';
import { FiUpload, FiFile, FiCheckCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function Upload({ onUpload }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.name.endsWith('.csv')) {
      setFile(droppedFile);
      setError('');
    } else {
      setError('Please upload a .csv file');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.name.endsWith('.csv')) {
      setFile(selectedFile);
      setError('');
      setResult(null);
    } else {
      setError('Please upload a .csv file');
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const res = await uploadCSV(file);
      setResult(res.data);
      onUpload();
    } catch (err) {
      setError('Upload failed. Please check your file and try again.');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 100 }}
          className="bg-white rounded-3xl shadow-2xl p-10 border border-purple-100"
        >
          <h2 className="text-4xl font-bold text-center mb-3">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Upload CSV File
            </span>
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Upload your chemical equipment data for instant analysis
          </p>

          {/* Drop Zone */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`border-4 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer ${
              isDragging 
                ? 'border-indigo-600 bg-indigo-50 scale-105' 
                : 'border-indigo-300 bg-gradient-to-br from-indigo-50 to-purple-50 hover:border-indigo-500'
            }`}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <FiUpload className="mx-auto text-7xl text-indigo-500 mb-4" />
            </motion.div>
            
            <p className="text-2xl font-bold text-gray-800 mb-2">
              {isDragging ? 'Drop it here!' : 'Drag & Drop your CSV'}
            </p>
            <p className="text-gray-500 mb-6">or click below to browse</p>

            <input
              type="file"
              accept=".csv"
              onChange={handleFileSelect}
              className="hidden"
              id="file-input"
            />
            <label
              htmlFor="file-input"
              className="inline-block px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-bold text-lg hover:shadow-xl transform hover:scale-105 transition cursor-pointer"
            >
              Browse Files
            </label>

            {file && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 p-4 bg-white rounded-xl border-2 border-indigo-200 inline-flex items-center gap-3"
              >
                <FiFile className="text-2xl text-indigo-600" />
                <div className="text-left">
                  <p className="font-bold text-gray-800">{file.name}</p>
                  <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mt-6 p-4 bg-red-50 border-2 border-red-200 text-red-700 rounded-xl flex items-center gap-3"
            >
              <span className="text-xl">⚠️</span>
              <span className="font-medium">{error}</span>
            </motion.div>
          )}

          {/* Upload Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleUpload}
            disabled={!file || uploading}
            className="mt-8 w-full py-5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xl font-bold rounded-2xl hover:shadow-2xl transform transition disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
          >
            {uploading ? (
              <>
                <div className="animate-spin h-6 w-6 border-3 border-white border-t-transparent rounded-full"></div>
                Uploading & Analyzing...
              </>
            ) : (
              <>
                <FiUpload className="text-2xl" /> Upload & Analyze Data
              </>
            )}
          </motion.button>

          {/* Success Message */}
          {result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border-2 border-emerald-200"
            >
              <div className="flex items-center justify-center gap-3 mb-3">
                <FiCheckCircle className="text-3xl text-emerald-600" />
                <h3 className="text-2xl font-bold text-emerald-800">Upload Successful!</h3>
              </div>
              <p className="text-center text-emerald-700 font-medium">
                Your data has been processed and is now live on the dashboard
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}