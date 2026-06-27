import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../services/api";

function LandlordDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    loadProperties();
  }, []);

  function loadProperties() {
    API.get("/properties/my-listings")
      .then((res) => setProperties(res.data.properties))
      .catch((err) => console.log("Failed to load your properties"));
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
        <h1 className="text-2xl font-bold">
          RentSure<span className="text-orange-400">AI</span>
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-white/60">Landlord: {user?.name}</span>
          <button
            onClick={() => navigate("/add-property")}
            className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg text-sm border border-green-500/30"
          >
            + Add Property
          </button>
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
        <h2 className="text-xl font-semibold mb-6">
          My Properties ({properties.length})
        </h2>

        {properties.length === 0 ? (
          <p className="text-white/40 text-center py-20">
            No properties yet. Click "+ Add Property" to list your first rental.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((p) => (
              <div
                key={p._id}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
              >
                <div className="h-1 bg-gradient-to-r from-orange-500 to-yellow-500" />
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
                  <p className="text-white/40 text-sm mt-1">
                    {p.address?.full}
                  </p>
                  <p className="text-2xl font-bold mt-3">
                    ₹{p.price?.monthly}/mo
                  </p>
                  <div className="flex gap-2 mt-3">
                    <span className="px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full text-xs text-green-400">
                      Safety: {p.safetyScore}
                    </span>
                    <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-xs text-blue-400">
                      Trust: {p.trustScore}
                    </span>
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

export default LandlordDashboard;
