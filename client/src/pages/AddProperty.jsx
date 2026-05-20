import { useState } from "react";
import { motion } from "framer-motion";
import API from "../services/api";

const AddProperty = () => {
  const [form, setForm] = useState({
    title: "",
    full: "",
    city: "",
    state: "",
    lat: "",
    lng: "",
    monthly: "",
    deposit: "",
    amenities: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      await API.post("/properties", {
        title: form.title,
        address: {
          full: form.full,
          city: form.city,
          state: form.state,
          lat: parseFloat(form.lat),
          lng: parseFloat(form.lng),
        },
        price: {
          monthly: parseInt(form.monthly),
          deposit: parseInt(form.deposit) || 0,
        },
        amenities: form.amenities
          .split(",")
          .map((a) => a.trim())
          .filter((a) => a),
      });
      setMessage("✅ Property added successfully!");
      setForm({
        title: "",
        full: "",
        city: "",
        state: "",
        lat: "",
        lng: "",
        monthly: "",
        deposit: "",
        amenities: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add property");
    }
  };

  const inputClass =
    "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-green-500/50 focus:outline-none transition";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 w-full max-w-lg"
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">🏠</span>
          <h1 className="text-2xl font-bold text-white">Add New Property</h1>
        </div>

        {message && (
          <p className="text-green-400 bg-green-500/10 border border-green-500/30 rounded-xl px-4 py-3 mb-4 text-sm">
            {message}
          </p>
        )}
        {error && (
          <p className="text-red-400 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 mb-4 text-sm">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className={inputClass}
            placeholder="Property Title*"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <input
            className={inputClass}
            placeholder="Full Address*"
            value={form.full}
            onChange={(e) => setForm({ ...form, full: e.target.value })}
            required
          />
          <div className="flex gap-3">
            <input
              className={inputClass}
              placeholder="City"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />
            <input
              className={inputClass}
              placeholder="State"
              value={form.state}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
            />
          </div>
          <div className="flex gap-3">
            <input
              className={inputClass}
              placeholder="Latitude*"
              value={form.lat}
              onChange={(e) => setForm({ ...form, lat: e.target.value })}
              required
            />
            <input
              className={inputClass}
              placeholder="Longitude*"
              value={form.lng}
              onChange={(e) => setForm({ ...form, lng: e.target.value })}
              required
            />
          </div>
          <div className="flex gap-3">
            <input
              className={inputClass}
              type="number"
              placeholder="Monthly Rent ₹*"
              value={form.monthly}
              onChange={(e) => setForm({ ...form, monthly: e.target.value })}
              required
            />
            <input
              className={inputClass}
              type="number"
              placeholder="Deposit ₹"
              value={form.deposit}
              onChange={(e) => setForm({ ...form, deposit: e.target.value })}
            />
          </div>
          <input
            className={inputClass}
            placeholder="Amenities (WiFi, AC, CCTV - comma separated)"
            value={form.amenities}
            onChange={(e) => setForm({ ...form, amenities: e.target.value })}
          />
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-medium hover:from-green-600 hover:to-green-700 transition shadow-lg shadow-green-500/20"
          >
            ➕ Add Property
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddProperty;
