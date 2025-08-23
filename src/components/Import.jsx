import React, { useState } from "react";
import { Upload } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

// ✅ Modular import component
export default function Import({ sheetId }) {
  const { theme } = useTheme();
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
    <div className={`gap-x-10 min-h-screen bg-gradient-to-br ${theme.colors.primary} text-white flex justify-center items-center p-6`}>
      <div className={`${theme.colors.card} backdrop-blur-sm p-8 rounded-2xl border ${theme.colors.border} shadow-2xl ${theme.colors.shadow} w-full max-w-2xl`}>
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={`text-3xl font-bold bg-gradient-to-r ${theme.colors.secondary} bg-clip-text text-transparent mb-3`}>
            📥 Import {sheetId.toUpperCase()} Done Questions
          </h1>
          <p className={`${theme.colors.textSecondary} text-lg`}>
            Paste your JSON data to import your progress
          </p>
        </div>

        {/* Textarea */}
        <div className="mb-6">
          <label className={`block ${theme.colors.textSecondary} font-medium mb-3`}>
            JSON Data
          </label>
          <textarea
            className={`w-full h-48 p-4 rounded-xl ${theme.colors.cardHover} border ${theme.colors.border} text-white placeholder-slate-400 focus:outline-none focus:ring-2 ${theme.colors.checkboxFocus} transition-all duration-300 resize-none`}
            placeholder="Paste your JSON here... (e.g., {'result': {'question_id': true}})"
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
          />
        </div>

        {/* Button */}
        <button
          onClick={handleSave}
          className={`w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r ${theme.colors.button} rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl`}
        >
          <Upload size={20} />
          Save & Import
        </button>

        {/* Status Message */}
        {status && (
          <div className={`mt-6 p-4 rounded-xl text-center font-medium transition-all duration-300 ${status.startsWith("✅")
              ? `${theme.colors.success}`
              : `${theme.colors.error}`
            }`}>
            {status}
          </div>
        )}

        {/* Help Text */}
        <div className={`mt-6 p-4 ${theme.colors.cardHover} rounded-xl border ${theme.colors.border}`}>
          <h3 className={`${theme.colors.textSecondary} font-medium mb-2`}>💡 Format Example:</h3>
          <p className={`${theme.colors.textMuted} text-sm`}>
            {"{'result': {'question_id_1': true, 'question_id_2': false}}"}
          </p>
        </div>
      </div>
    </div>
  );
}
