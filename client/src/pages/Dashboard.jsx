import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../services/api";

function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterByDistance, setFilterByDistance] = useState(false);
  const [distance, setDistance] = useState(5);
  const [lat, setLat] = useState(26.8625);
  const [lng, setLng] = useState(75.809);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    loadProperties();
  }, []);

  async function loadProperties() {
    setLoading(true);
    try {
      const { data } = await API.get("/properties");
      setProperties(data.properties);
    } catch (err) {
      console.log("Failed to load properties");
    } finally {
      setLoading(false);
    }
  }

  async function searchNearby() {
    setLoading(true);
    try {
      const url = `/properties/nearby?lat=${lat}&lng=${lng}&maxDistance=${distance * 1000}`;
      const { data } = await API.get(url);
      setProperties(data.properties);
    } catch (err) {
      console.log("Search failed");
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    logout();
    navigate("/login");
  }

  const avgSafety = properties.length
    ? Math.round(
        properties.reduce((s, p) => s + p.safetyScore, 0) / properties.length,
      )
    : 0;

  const avgTrust = properties.length
    ? Math.round(
        properties.reduce((s, p) => s + p.trustScore, 0) / properties.length,
      )
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-white/10 px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          RentSure<span className="text-orange-400">AI</span>
        </h1>

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/add-property")}
            className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg text-sm border border-green-500/30"
          >
            + Add Property
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2 text-white/60 hover:text-white"
            >
              <span className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center text-orange-400 text-sm font-bold">
                {user?.name?.charAt(0)}
              </span>
              {user?.name}
            </button>

            {showProfile && (
              <div className="absolute right-0 top-12 bg-slate-800 border border-white/10 rounded-xl p-4 w-64 shadow-2xl z-50">
                <p className="text-white font-medium text-lg">{user?.name}</p>
                <p className="text-white/50 text-sm mt-1">{user?.email}</p>
                <p className="text-orange-400 text-xs mt-2 bg-orange-500/10 px-2 py-1 rounded-full inline-block">
                  {user?.role}
                </p>
                <button
                  onClick={() => setShowProfile(false)}
                  className="absolute top-2 right-3 text-white/40 hover:text-white"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-white/5 text-white/60 rounded-lg text-sm"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-6">
            <p className="text-white/60 text-sm">Properties</p>
            <p className="text-3xl font-bold mt-2">{properties.length}</p>
          </div>
          <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6">
            <p className="text-white/60 text-sm">Avg Safety</p>
            <p className="text-3xl font-bold text-green-400 mt-2">
              {avgSafety}
            </p>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6">
            <p className="text-white/60 text-sm">Avg Trust</p>
            <p className="text-3xl font-bold text-blue-400 mt-2">{avgTrust}</p>
          </div>
        </div>

        {/* Distance Filter */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-8">
          <label className="flex items-center gap-2 text-white/60 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={filterByDistance}
              onChange={(e) => setFilterByDistance(e.target.checked)}
            />
            Filter by distance
          </label>

          {filterByDistance && (
            <div className="flex items-center gap-3 mt-3 flex-wrap">
              <input
                type="number"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                placeholder="Lat"
                className="w-24 px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-sm"
              />
              <input
                type="number"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
                placeholder="Lng"
                className="w-24 px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-sm"
              />
              <input
                type="range"
                min="1"
                max="20"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                className="w-32"
              />
              <span className="text-orange-400 font-medium text-sm">
                {distance} km
              </span>
              <button
                onClick={searchNearby}
                className="px-4 py-1 bg-orange-500 text-white rounded-lg text-sm"
              >
                Search
              </button>
            </div>
          )}
        </div>

        {/* Properties */}
        <h2 className="text-xl font-semibold mb-6">
          {filterByDistance ? `Within ${distance}km` : "All Properties"}
          <span className="text-white/40 text-sm ml-2">
            ({properties.length})
          </span>
        </h2>

        {loading && (
          <p className="text-center text-white/40 py-20">Loading...</p>
        )}

        {!loading && properties.length === 0 && (
          <p className="text-center text-white/40 py-20">No properties found</p>
        )}

        {!loading && properties.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((p) => (
              <div
                key={p._id}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
              >
                <div className="h-1 bg-gradient-to-r from-orange-500 to-yellow-500" />
                <div className="p-5">
                  <div className="flex gap-2 mb-3">
                    <span className="px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full text-xs text-green-400">
                      Safety: {p.safetyScore}
                    </span>
                    <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-xs text-blue-400">
                      Trust: {p.trustScore}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <p className="text-white/40 text-sm mt-1">
                    {p.address?.full}
                  </p>
                  <p className="text-2xl font-bold mt-3">
                    ₹{p.price?.monthly}/mo
                  </p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {p.amenities?.map((a, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-xs text-white/50"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center pt-3 mt-3 border-t border-white/10">
                    <span className="text-white/30 text-xs">
                      {new Date(p.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <button
                      onClick={() =>
                        alert(
                          `${p.title}\n${p.address?.full}\n₹${p.price?.monthly}/mo\nSafety: ${p.safetyScore}\nTrust: ${p.trustScore}`,
                        )
                      }
                      className="text-orange-400 text-sm"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
