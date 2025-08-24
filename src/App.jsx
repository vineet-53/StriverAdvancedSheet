import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import A2ZStepViewer from "./components/A2ZStepViewer.jsx";
import Import from "./components/Import.jsx";
import ThemeToggle from "./components/ThemeToggle.jsx";
import { sheet as a2zSheet } from "./sheets/a2z.js";
import { ThemeProvider, useTheme } from "./hooks/useTheme";

const sheets = [
  { id: "a2z", name: "A2Z Sheet", file: `../sheets/a2z.js` },
];

// need to make different component to render these files
// { id: "sde", name: "SDE Sheet", file: "../sheets/sde_sheet.json" },
// { id: "striver79", name: "Striver 79 sheet", file: "../sheets/striver79.json" },
// { id: "blind75", name: "Blind 75 Sheet", file: "../sheets/blind75.json" },

const Home = () => {
  return (
    <HomeContent />
  );
};

const App = () => {
  return (
    <ThemeProvider>
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
                <A2ZStepViewer
                  sheetId={sheet.id}
                  jsonPath={sheet.file}
                  sheetData={a2zSheet}
                />
              }
            />
          ))}

          {sheets.map((sheet) => (
            <>
              <Route
                key={sheet.id + "_import"}
                path={`/sheet/${sheet.id}/import`}
                element={<Import sheetId={sheet.id} />}
              />
            </>
          ))}
        </Routes>
      </div>
    </ThemeProvider>
  );
};

// HomeContent component that uses the theme hook (properly wrapped by ThemeProvider)
const HomeContent = () => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.colors.primary} text-white`}>
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold  mb-3`}>
            📑
            <span className={`bg-gradient-to-r ${theme.colors.secondary} bg-clip-text text-transparent`}>
              Select a Sheet
            </span>
          </h1>
          <p className={`${theme.colors.textSecondary} text-lg max-w-2xl mx-auto`}>
            Choose from our curated collection of competitive programming sheets to enhance your skills
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {sheets.map((sheet) => (
            <div key={sheet.id} className={`${theme.colors.card} backdrop-blur-sm rounded-2xl p-6 border ${theme.colors.border} transition-all duration-300 hover:shadow-2xl`}>
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="text-center sm:text-left">
                  <h3 className={`text-xl font-semibold ${theme.colors.text} mb-2`}>{sheet.name}</h3>
                  <p className={`${theme.colors.textSecondary} text-sm`}>Practice problems and track your progress</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to={`/sheet/${sheet.id}`}
                    className={`px-8 py-3 bg-gradient-to-r ${theme.colors.button} rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center min-w-[140px]`}
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

export default App;
