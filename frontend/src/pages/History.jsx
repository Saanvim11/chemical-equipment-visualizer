import { motion } from 'framer-motion';
import { FaCalendarAlt, FaChevronDown, FaDatabase, FaClock } from 'react-icons/fa';

export default function History({ data }) {
  if (data.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.0 }}
          animate={{ opacity: 1, scale: 0.1 }}
          className="bg-white rounded-3xl p-12 text-center shadow-2xl max-w-md border border-purple-100"
        >
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center">
            <FaDatabase className="text-white text-5xl" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">No Upload History</h3>
          <p className="text-gray-600 text-lg">Upload a CSV file to see your history here</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-indigo-50 to-purple-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ x:500, opacity: 0 }}
          animate={{ x:500, opacity: 1 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold mb-3">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Upload History
            </span>
          </h2>
          <p className="text-xl text-gray-700">Track all your previous data uploads</p>
        </motion.div>

        {/* History Items */}
        <div className="space-y-6">
          {data.slice(0, 10).map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 150 }}
              animate={{ opacity: 1, x: 150 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="bg-white rounded-2xl p-6 shadow-xl border border-purple-100 hover:shadow-2xl transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  {/* Icon */}
                  {/* <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl text-white flex-shrink-0">
                    <FaCalendarAlt className="text-2xl" />
                  </div> */}
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <FaCalendarAlt className="text-2xl" />                    <FaClock className="text-indigo-500" />
                      <p className="font-bold text-xl text-gray-800">
                        {new Date(item.uploaded_at).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <p className="text-gray-600 mb-3">
                      {new Date(item.uploaded_at).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                      })}
                    </p>
                    
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-3 rounded-lg text-center">
                        <p className="text-sm text-gray-600 font-semibold">Total Items - {item.summary.total_count}</p>
                        {/* <p className="text-2xl font-bold text-indigo-700">{item.summary.total_count}</p> */}
                      </div>
                      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-3 rounded-lg text-center">
                        <p className="text-sm text-gray-600 font-semibold">Avg Flowrate - {item.summary.avg_flowrate?.toFixed(1) || 'N/A'}</p>
                        {/* <p className="text-2xl font-bold text-emerald-700">
                          {item.summary.avg_flowrate?.toFixed(1) || 'N/A'}
                        </p> */}
                      </div>
                      <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-3 rounded-lg text-center">
                        <p className="text-sm text-gray-600 font-semibold">Avg Temp - {item.summary.avg_temperature?.toFixed(1) || 'N/A'}°C</p>
                        {/* <p className="text-2xl font-bold text-pink-700">
                          {item.summary.avg_temperature?.toFixed(1) || 'N/A'}°C
                        </p> */}
                      </div>
                      <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-3 rounded-lg text-center">
                        <p className="text-sm text-gray-600 font-semibold">Types - {Object.keys(item.summary.type_distribution || {}).length}</p>
                        {/* <p className="text-2xl font-bold text-amber-700">
                          {Object.keys(item.summary.type_distribution || {}).length}
                        </p> */}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Details Dropdown */}
                <details className="cursor-pointer flex-shrink-0">
                  <summary className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl flex items-center gap-2 hover:shadow-lg transition list-none">
                    Details <FaChevronDown className="text-sm" />
                  </summary>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 p-4 bg-gray-50 rounded-xl border-2 border-gray-200 max-w-md"
                  >
                    <h4 className="font-bold text-gray-800 mb-2">Equipment Distribution:</h4>
                    <div className="space-y-2">
                      {Object.entries(item.summary.type_distribution || {}).map(([type, count]) => (
                        <div key={type} className="flex justify-between items-center p-2 bg-white rounded-lg">
                          <span className="font-semibold text-gray-700">{type}</span>
                          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full font-bold"> -
                           > {count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </details>
                <br />
                <br />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Show More Message */}
        {data.length > 10 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-8 text-gray-600"
          >
            Showing 10 of {data.length} uploads
          </motion.p>
        )}
      </div>
    </div>
  );
}