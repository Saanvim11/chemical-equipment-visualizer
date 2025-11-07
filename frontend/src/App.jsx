import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Upload from './pages/Upload';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import { getHistory } from './services/api';
import { motion } from 'framer-motion';
import { FaUpload, FaChartBar, FaHistory, FaSignOutAlt } from 'react-icons/fa';

function App() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('login');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setUser({ token });
      setCurrentPage('upload');
      loadHistory();
    }
  }, []);

  const loadHistory = async () => {
    try {
      const res = await getHistory();
      setHistory(res.data);
    } catch (err) {
      console.error('Failed to load history');
    }
  };

  const handleLogin = (token) => {
    localStorage.setItem('access_token', token);
    setUser({ token });
    setCurrentPage('upload');
    loadHistory();
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setUser(null);
    setCurrentPage('login');
    setHistory([]);
  };

  if (!user) return <Login onLogin={handleLogin} />;

  const navItems = [
    { id: 'upload', label: 'Upload', icon: FaUpload },
    { id: 'dashboard', label: 'Dashboard', icon: FaChartBar },
    { id: 'history', label: 'History', icon: FaHistory },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Glass Nav */}
      <nav className="backdrop-blur-xl bg-white/70 shadow-lg border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            <motion.h1
              initial={{ x: -50 }}
              animate={{ x: 0 }}
              className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
            >
              ChemViz Pro
            </motion.h1>

            <div className="flex items-center gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentPage(item.id)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-full font-medium transition ${
                      currentPage === item.id
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-white/50'
                    }`}
                  >
                    <Icon className="text-lg" />
                    {item.label}
                  </motion.button>
                );
              })}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full shadow-lg"
            >
              <FaSignOutAlt /> Logout
            </motion.button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-6">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {currentPage === 'upload' && <Upload onUpload={loadHistory} />}
          {currentPage === 'dashboard' && <Dashboard history={history} />}
          {currentPage === 'history' && <History data={history} />}
        </motion.div>
      </main>
    </div>
  );
}

export default App;