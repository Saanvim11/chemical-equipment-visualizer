import { useState } from 'react';
import { login } from '../services/api';
import { motion } from 'framer-motion';
import { FaFlask, FaSignInAlt, FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await login(username, password);
      onLogin(res.data.access);
    } catch (err) {
      setError('Invalid username or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/4 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, x: 500 }}
        animate={{ opacity: 1, x: 500 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10 flex justify-center"
      >
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/30 w-full text-center">
          
          {/* Logo/Icon */}
          <div className="flex justify-center mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="p-5 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-full shadow-2xl"
            >
              <FaFlask className="text-6xl text-white" />
            </motion.div>
          </div>

          {/* Header */}
          <h2 className="text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              ChemViz Pro
            </span>
          </h2>
          <br />
          <p className="text-gray-600 mb-8 text-lg">
            Chemical Equipment Visualizer
          </p>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-50 border-2 border-red-200 text-red-700 p-4 rounded-xl flex items-center gap-3"
              >
                <span className="text-xl">❌</span>
                <span className="font-medium text-sm">{error}</span>
              </motion.div>
            )}

            {/* Username Input */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Username
              </label>
              <br />
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500 text-lg transition outline-none"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Password
              </label>
              <br />
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500 text-lg transition outline-none"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-xl" />
                  ) : (
                    <FaEye className="text-xl" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98}}
              disabled={loading || !username || !password}
              className="w-full py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold text-xl rounded-xl shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <>
                  <div className="animate-spin h-6 w-6 border-3 border-white border-t-transparent rounded-full"></div>
                  Signing in...
                </>
              ) : (
                <>
                  <FaSignInAlt className="text-xl" /> Sign In
                </>
              )}
            </motion.button>
          </form>

          {/* Demo Credentials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border-2 border-indigo-100 text-center"
          >
            <p className="text-sm text-gray-700 font-semibold mb-2">
              Demo Credentials
            </p>
            <div>
              <p className="text-sm text-gray-600">
                Username:{' '}
                <span className="font-mono font-bold text-indigo-700">
                  saanviii
                </span>
              </p>
              <p className="text-sm text-gray-600">
                Password:{' '}
                <span className="font-mono font-bold text-indigo-700">
                  your_password
                </span>
              </p>
            </div>
          </motion.div>

          {/* Footer */}
          <p className="text-center text-xs text-gray-500 mt-6">
            Secure login powered by JWT authentication
          </p>
        </div>
      </motion.div>
    </div>
  );
}
