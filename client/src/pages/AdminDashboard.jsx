import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../services/api";

function AdminDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    loadProperties();
  }, []);

  function loadProperties() {
    API.get("/properties")
      .then((res) => setProperties(res.data.properties))
      .catch((err) => console.log("Failed to load properties"));
  }

  async function handleDelete(id) {
    const confirmed = confirm("Delete this property?");
    if (confirmed) {
      try {
        await API.delete(`/properties/${id}`);
        setProperties(properties.filter((p) => p._id !== id));
      } catch (err) {
        alert("Delete failed");
      }
    }
  }

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <header className="border-b border-white/10 px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-red-400">Admin Panel</h1>
        <div className="flex items-center gap-4">
          <span className="text-white/60">Admin: {user?.name}</span>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg text-sm"
          >
            Student View
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-white/5 text-white/60 rounded-lg text-sm"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6">
            <p className="text-white/60 text-sm">Total Properties</p>
            <p className="text-3xl font-bold mt-2">{properties.length}</p>
          </div>
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-6">
            <p className="text-white/60 text-sm">All Users</p>
            <p className="text-3xl font-bold mt-2">—</p>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-6">All Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((p) => (
            <div
              key={p._id}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
            >
              <div className="h-1 bg-gradient-to-r from-red-500 to-orange-500" />
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="text-red-400 hover:text-red-300 text-lg"
                  >
                    🗑️
                  </button>
                </div>
                <p className="text-white/40 text-sm mt-1">{p.address?.full}</p>
                <p className="text-xl font-bold mt-2">₹{p.price?.monthly}/mo</p>
                <div className="flex gap-2 mt-3">
                  <span className="text-xs text-green-400">
                    Safety: {p.safetyScore}
                  </span>
                  <span className="text-xs text-blue-400">
                    Trust: {p.trustScore}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
