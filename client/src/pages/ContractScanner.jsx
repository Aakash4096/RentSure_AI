import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../services/api";

const ContractScanner = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("contract", file);

      const { data } = await API.post("/contracts/scan", formData);
      setResult(data);
    } catch (err) {
      setError("Failed to scan contract");
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (level) => {
    if (level === "High") return "text-red-400 bg-red-500/10 border-red-500/30";
    if (level === "Medium")
      return "text-yellow-400 bg-yellow-500/10 border-yellow-500/30";
    return "text-green-400 bg-green-500/10 border-green-500/30";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-white mb-2">
            📄 Contract Scanner
          </h1>
          <p className="text-white/40 mb-8">
            Upload your rental agreement for AI analysis
          </p>

          {/* Upload Area */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8">
            <input
              type="file"
              accept=".pdf,.txt"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full text-white/60 file:mr-4 file:py-2 file:px-6 file:rounded-xl file:border-0 file:bg-orange-500 file:text-white file:font-medium hover:file:bg-orange-600 cursor-pointer"
            />
            <button
              onClick={handleUpload}
              disabled={!file || loading}
              className="mt-4 w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:from-orange-600 hover:to-orange-700 transition"
            >
              {loading ? "Scanning..." : "Scan Contract"}
            </button>
          </div>

          {/* Results */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Overall Score */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-white">
                      Risk Assessment
                    </h2>
                    <span
                      className={`px-4 py-1 rounded-full text-sm font-medium border ${getRiskColor(result.riskLevel)}`}
                    >
                      {result.riskLevel} Risk
                    </span>
                  </div>
                  <div className="bg-white/10 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${result.riskScore}%` }}
                      transition={{ duration: 1 }}
                      className={`h-full rounded-full ${
                        result.riskScore > 50
                          ? "bg-red-500"
                          : result.riskScore > 25
                            ? "bg-yellow-500"
                            : "bg-green-500"
                      }`}
                    />
                  </div>
                  <p className="text-white/60 mt-2">
                    Risk Score: {result.riskScore}/100
                  </p>
                </div>

                {/* Flagged Clauses */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <h2 className="text-xl font-semibold text-white mb-4">
                    Flagged Clauses ({result.flaggedClauses.length})
                  </h2>
                  <div className="space-y-3">
                    {result.flaggedClauses.map((clause, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-red-500/5 border border-red-500/20 rounded-xl p-4"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-red-400 font-medium">
                              {clause.category}
                            </h3>
                            <p className="text-white/50 text-sm mt-1">
                              {clause.description}
                            </p>
                          </div>
                          <span className="text-red-400 text-sm font-medium">
                            {clause.severity}%
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-3">
                          {clause.keywords.map((kw, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-red-500/10 text-red-400 text-xs rounded-md"
                            >
                              "{kw}"
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default ContractScanner;
