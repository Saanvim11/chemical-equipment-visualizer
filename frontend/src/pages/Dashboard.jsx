import { useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, Package, Droplet, Thermometer } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard({ history = [] }) {
  const latest = history && history.length > 0 ? history[0]?.summary : null;

  if (!latest) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 via-indigo-50 to-purple-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center p-12 bg-white rounded-3xl shadow-2xl max-w-lg border border-purple-100"
        >
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
            <Package className="text-white" size={48} />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Welcome to ChemViz</h2>
          <p className="text-lg text-gray-600">Upload a CSV file to view your equipment dashboard and insights</p>
        </motion.div>
      </div>
    );
  }

  // Prepare data for charts
  const barChartData = Object.entries(latest.type_distribution).map(([name, value]) => ({
    name,
    count: value
  }));

  const pieChartData = Object.entries(latest.type_distribution).map(([name, value]) => ({
    name,
    value
  }));

  const COLORS = ['#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899', '#f59e0b', '#10b981'];

  const downloadPDF = () => {
    alert('PDF download functionality would require jsPDF library. The dashboard can be printed using browser print (Ctrl/Cmd + P)');
  };

  return (
    <div id="dashboard" className="min-h-screen bg-gradient-to-br from-violet-50 via-indigo-50 to-purple-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header Section - Centered and Enhanced */}
        <motion.div
          initial={{ x: 450, opacity: 0 }}
          animate={{ x: 500, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Equipment Dashboard
            </span>
          </h1>
          <p className="text-xl text-gray-700 font-medium">Real-time Chemical Equipment Analytics & Insights</p>
          
          {/* PDF Download Button - Centered below header */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={downloadPDF}
            className="mt-6 inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all"
          >
            <Download size={24} /> Download PDF Report
          </motion.button>
        </motion.div>
<br />
<br />
        {/* Stats Cards - Centered with Better Spacing */}
        <div className="flex justify-center mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl w-full">
            {/* Total Equipment */}
            <motion.div
              initial={{ opacity: 0, x: 500 }}
              animate={{ opacity: 1, x: 500 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05, y: -8 }}
              className="text-center bg-white rounded-3xl p-8 shadow-xl border border-indigo-100"
            >
              <div className="w-28 h-28 mx-auto mb-5 bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-700 rounded-full shadow-2xl flex items-center justify-center text-white transform hover:rotate-6 transition-transform">
                <Package size={56} />
              </div>
              <p className="text-sm font-bold text-indigo-600 uppercase tracking-wide mb-2">Total Equipment</p>
              <p className="text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {latest.total_count}
              </p>
            </motion.div>

            {/* Avg Flowrate */}
            <motion.div
              initial={{ opacity: 0, x: 500 }}
              animate={{ opacity: 1, x: 500 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05, y: -8 }}
              className="text-center bg-white rounded-3xl p-8 shadow-xl border border-emerald-100"
            >
              <div className="w-28 h-28 mx-auto mb-5 bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 rounded-full shadow-2xl flex items-center justify-center text-white transform hover:rotate-6 transition-transform">
                <Droplet size={56} />
              </div>
              <p className="text-sm font-bold text-emerald-600 uppercase tracking-wide mb-2">Avg Flowrate</p>
              <p className="text-5xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                {latest.avg_flowrate.toFixed(1)}
              </p>
              <p className="text-sm text-gray-500 font-medium mt-1">units/min</p>
            </motion.div>

            {/* Avg Temperature */}
            <motion.div
              initial={{ opacity: 0, x: 500 }}
              animate={{ opacity: 1, x: 500 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05, y: -8 }}
              className="text-center bg-white rounded-3xl p-8 shadow-xl border border-pink-100"
            >
              <div className="w-28 h-28 mx-auto mb-5 bg-gradient-to-br from-pink-500 via-rose-600 to-red-700 rounded-full shadow-2xl flex items-center justify-center text-white transform hover:rotate-6 transition-transform">
                <Thermometer size={56} />
              </div>
              <p className="text-sm font-bold text-pink-600 uppercase tracking-wide mb-2">Avg Temperature</p>
              <p className="text-5xl font-extrabold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                {latest.avg_temperature.toFixed(1)}°C
              </p>
            </motion.div>
          </div>
        </div>

        {/* Charts - Centered with Better Layout */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-3xl p-8 shadow-xl border border-indigo-100"
            >
              <h3 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Equipment by Type
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" tick={{ fill: '#6366f1', fontSize: 12, fontWeight: 600 }} />
                  <YAxis tick={{ fill: '#6366f1', fontSize: 12, fontWeight: 600 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                      border: 'none', 
                      borderRadius: 8,
                      color: 'white'
                    }}
                  />
                  <Bar dataKey="count" fill="#6366f1" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-3xl p-8 shadow-xl border border-purple-100"
            >
              <h3 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Distribution Overview
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 254, 254, 0.8)', 
                      border: 'none', 
                      borderRadius: 8,
                      color: 'white'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </div>

        {/* Type Breakdown - Centered */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 20, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="max-w-6xl mx-auto bg-white rounded-3xl p-10 shadow-xl border border-purple-100"
        >
          <h3 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Equipment Type Breakdown
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Object.entries(latest.type_distribution).map(([type, count], index) => (
              <motion.div
                key={type}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.08, x: 50, y:-5}}
                className="text-center p-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl shadow-lg border-2 border-white hover:border-purple-200 transition-all"
              >
                <p className="font-bold text-gray-700 text-base mb-2 uppercase tracking-wide">{type} - {count}</p>
                {/* <p className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {count}
                </p> */}
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}