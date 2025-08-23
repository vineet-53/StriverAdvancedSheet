import React, { useState } from "react";
import { Upload } from "lucide-react";

// ✅ Modular import component
export default function ImportDoneQuestions({ sheetId }) {
  const [inputData, setInputData] = useState("");
  const [status, setStatus] = useState(null);

  const storageKey = `done_questions_${sheetId}`;

  const importDoneQuestions = (data) => {
    try {
      const existing = JSON.parse(localStorage.getItem(storageKey)) || {};
      const updated = { ...existing, ...data.result };
      localStorage.setItem(storageKey, JSON.stringify(updated));
      setStatus("✅ Done questions imported successfully!");
    } catch (err) {
      console.error("❌ Invalid JSON:", err);
      setStatus("❌ Failed to import. Check your JSON.");
    }
  };

  const handleSave = () => {
    try {
      const parsed = JSON.parse(inputData);
      importDoneQuestions(parsed);
    } catch (err) {
      setStatus("❌ Invalid JSON. Please paste valid JSON.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex justify-center items-center p-6">
      <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 shadow-2xl shadow-orange-500/20 w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent mb-3">
            📥 Import {sheetId.toUpperCase()} Done Questions
          </h1>
          <p className="text-gray-300 text-lg">
            Paste your JSON data to import your progress
          </p>
        </div>

        {/* Textarea */}
        <div className="mb-6">
          <label className="block text-gray-300 font-medium mb-3">
            JSON Data
          </label>
          <textarea
            className="w-full h-48 p-4 rounded-xl bg-gray-700/80 border border-gray-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 resize-none"
            placeholder="Paste your JSON here... (e.g., {'result': {'question_id': true}})"
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
          />
        </div>

        {/* Button */}
        <button
          onClick={handleSave}
          className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-orange-500/30"
        >
          <Upload size={20} />
          Save & Import
        </button>

        {/* Status Message */}
        {status && (
          <div className={`mt-6 p-4 rounded-xl text-center font-medium transition-all duration-300 ${
            status.startsWith("✅") 
              ? "bg-green-500/20 text-green-300 border-green-500/30" 
              : "bg-red-500/20 text-red-300 border-red-500/30"
          }`}>
            {status}
          </div>
        )}

        {/* Help Text */}
        <div className="mt-6 p-4 bg-gray-700/80 rounded-xl border border-gray-700">
          <h3 className="text-gray-300 font-medium mb-2">💡 Format Example:</h3>
          <p className="text-gray-400 text-sm">
            {"{'result': {'question_id_1': true, 'question_id_2': false}}"}
          </p>
        </div>
      </div>
    </div>
  );
}
