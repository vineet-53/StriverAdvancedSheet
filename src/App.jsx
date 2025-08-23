import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import StepsViewer from "./components/StepsViewer.jsx";
import ImportDoneQuestions from "./components/ImportQuestions.jsx";
import ThemeToggle from "./components/ThemeToggle.jsx";

const sheets = [
  { id: "a2z", name: "A2Z Sheet", file: "../sheets/a2z_sheet.json" },
  { id: "sde", name: "SDE Sheet", file: "../sheets/sde_sheet.json" },
  { id: "striver79", name: "Striver 79 sheet", file: "../sheets/striver79.json" },
  { id: "blind75", name: "Blind 75 Sheet", file: "../sheets/blind75.json" },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent mb-4">
            📑 Select a Sheet
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Choose from our curated collection of competitive programming sheets to enhance your skills
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-6">
          {sheets.map((sheet) => (
            <div key={sheet.id} className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-orange-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/20">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="text-center sm:text-left">
                  <h3 className="text-xl font-semibold text-white mb-2">{sheet.name}</h3>
                  <p className="text-gray-300 text-sm">Practice problems and track your progress</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to={`/sheet/${sheet.id}`}
                    className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25 flex items-center justify-center min-w-[140px]"
                  >
                    <span className="mr-2">🚀</span>
                    View Sheet
                  </Link>
                  <Link
                    to={`/sheet/${sheet.id}/import`}
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 flex items-center justify-center min-w-[140px]"
                  >
                    <span className="mr-2">📥</span>
                    Import
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div className="min-h-screen">
      <ThemeToggle />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* ✅ Generate routes dynamically for each sheet */}
        {sheets.map((sheet) => (
          <Route
            key={sheet.id}
            path={`/sheet/${sheet.id}`}
            element={
              <StepsViewer
                sheetId={sheet.id}
                jsonPath={sheet.file}
              />
            }
          />
        ))}

        {sheets.map((sheet) => (
          <Route
            key={sheet.id + "_import"}
            path={`/sheet/${sheet.id}/import`}
            element={<ImportDoneQuestions sheetId={sheet.id} />}
          />
        ))}
      </Routes>
    </div>
  );
};

export default App;
