import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../services/api";
import { motion, AnimatePresence } from "framer-motion";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const { data } = await API.get("/properties");
      setProperties(data.properties);
    } catch (err) {
      console.error("Failed to fetch properties");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center text-xl shadow-lg shadow-orange-500/20">
              🏠
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              RentSure<span className="text-orange-400">AI</span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => (window.location.href = "/contracts")}
              className="px-4 py-2 bg-orange-500/20 text-orange-400 rounded-lg text-sm hover:bg-orange-500/30 transition border border-orange-500/30"
            >
              📄 Scan Contract
            </button>
            <div className="flex items-center gap-2 text-white/60">
              <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center text-sm font-medium text-orange-400">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <span className="text-sm">{user?.name || "User"}</span>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 bg-white/5 text-white/60 rounded-lg text-sm hover:bg-white/10 hover:text-white transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            {
              label: "Properties",
              value: properties.length,
              icon: "🏘️",
              color: "from-orange-500/20 to-orange-600/20 border-orange-500/30",
            },
            {
              label: "Avg Safety",
              value: properties.length
                ? Math.round(
                    properties.reduce((s, p) => s + p.safetyScore, 0) /
                      properties.length,
                  )
                : 0,
              icon: "🛡️",
              color: "from-green-500/20 to-green-600/20 border-green-500/30",
            },
            {
              label: "Avg Trust",
              value: properties.length
                ? Math.round(
                    properties.reduce((s, p) => s + p.trustScore, 0) /
                      properties.length,
                  )
                : 0,
              icon: "⭐",
              color: "from-blue-500/20 to-blue-600/20 border-blue-500/30",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-gradient-to-br ${stat.color} border rounded-2xl p-6 backdrop-blur-sm`}
            >
              <div className="flex items-center justify-between">
                <p className="text-white/60 text-sm">{stat.label}</p>
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Properties */}
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <span>Available Properties</span>
          <span className="text-sm text-white/40 font-normal">
            ({properties.length})
          </span>
        </h2>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="w-12 h-12 border-2 border-orange-500 border-t-transparent rounded-full"
            />
            <p className="text-white/40 mt-4">Loading properties...</p>
          </div>
        ) : properties.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-6xl mb-4">🔍</p>
            <p className="text-white/60 text-lg">No properties yet</p>
            <p className="text-white/30 text-sm mt-2">
              Use the API to add properties
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {properties.map((property, index) => (
                <motion.div
                  key={property._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-orange-500/30 transition-colors group"
                >
                  <div className="h-2 bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-500" />
                  <div className="p-5">
                    <div className="flex gap-2 mb-4">
                      <span className="px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full text-xs text-green-400 font-medium">
                        🛡️ {property.safetyScore}
                      </span>
                      <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-xs text-blue-400 font-medium">
                        ⭐ {property.trustScore}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-orange-400 transition-colors">
                      {property.title}
                    </h3>
                    <p className="text-white/40 text-sm mb-4 flex items-center gap-1">
                      📍 {property.address?.full || "N/A"}
                    </p>
                    <div className="flex items-baseline gap-1 mb-4">
                      <span className="text-2xl font-bold text-white">
                        ₹{property.price?.monthly?.toLocaleString()}
                      </span>
                      <span className="text-white/40 text-sm">/month</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {property.amenities?.map((amenity, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-xs text-white/50"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-white/10">
                      <span className="text-white/30 text-xs">
                        {new Date(property.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                          },
                        )}
                      </span>
                      <button className="text-orange-400 text-sm font-medium hover:text-orange-300 transition">
                        View Details →
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
