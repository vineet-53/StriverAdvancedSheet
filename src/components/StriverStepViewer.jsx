import React, { useEffect, useState } from "react";
import { Youtube, Star } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

export default function StriverStepViewer({ sheetId, sheetData }) {
  const { theme } = useTheme();
  const [done, setDone] = useState({});
  const [data ,setData] = useState([])
  const [favorites, setFavorites] = useState({});
  
  const storageKey = `done_questions_${sheetId}`;

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(storageKey)) || {};
    setDone(stored);
    setData(sheetData)
  }, [sheetId]);

  const toggleDone = (id) => {
    const updated = { ...done, [id]: !done[id] };
    setDone(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  const updateFavorite = (id) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const DifficultyBadge = ({ difficulty }) => {
    const labels = ["Easy", "Medium", "Hard"];
    const colors = ["bg-green-600", "bg-yellow-500", "bg-red-600"];
    return (
      <span
        className={`px-3 py-1 text-sm text-white rounded-full ${colors[difficulty]}`}
      >
        {labels[difficulty]}
      </span>
    );
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.colors.primary} text-white`}>
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={`text-4xl font-bold mb-3`}>
            📚 
            <span className={`bg-gradient-to-r ${theme.colors.secondary} bg-clip-text text-transparent`}>
              {sheetId.toUpperCase()} Progress Tracker
            </span>
          </h1>
          <p className={`${theme.colors.textSecondary} text-lg`}>
            Track your progress through each topic
          </p>
        </div>

        {/* Steps */}
        {data.map((step) => (
          <div key={step.step_no} className="mb-8">
            <h2 className={`text-2xl font-semibold mb-4 ${theme.colors.text}`}>
              Step {step.step_no}: {step.head_step_no}
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left rounded-xl border border-gray-600 bg-opacity-10">
                <thead className={`${theme.colors.card} border-b ${theme.colors.border}`}>
                  <tr>
                    <th className={`p-4 ${theme.colors.textSecondary} font-semibold`}>Status</th>
                    <th className={`p-4 ${theme.colors.textSecondary} font-semibold`}>Problem</th>
                    <th className={`p-4 ${theme.colors.textSecondary} font-semibold`}>Post</th>
                    <th className={`p-4 ${theme.colors.textSecondary} font-semibold`}>YouTube</th>
                    <th className={`p-4 ${theme.colors.textSecondary} font-semibold`}>Coding Ninjas</th>
                    <th className={`p-4 ${theme.colors.textSecondary} font-semibold`}>GFG</th>
                    <th className={`p-4 ${theme.colors.textSecondary} font-semibold`}>LeetCode</th>
                    <th className={`p-4 ${theme.colors.textSecondary} font-semibold`}>Fav</th>
                    <th className={`p-4 ${theme.colors.textSecondary} font-semibold`}>Difficulty</th>
                  </tr>
                </thead>
                <tbody>
                  {step.topics.map((topic) => (
                    <tr key={topic.id} className={`border-b ${theme.colors.border} transition-colors duration-200`}>
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={!!done[topic.id]}
                          onChange={() => toggleDone(topic.id)}
                          className={`w-5 h-5 ${theme.colors.checkbox} bg-gray-700 border-gray-600 rounded ${theme.colors.checkboxFocus} focus:ring-2`}
                        />
                      </td>
                      <td className="p-4">
                        <span className={`${theme.colors.link} cursor-pointer hover:${theme.colors.linkHover} transition-colors duration-200 font-medium`}>
                          {topic.title}
                        </span>
                      </td>
                      <td className="p-4">
                        {topic.post_link ? (
                          <a
                            href={topic.post_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center px-3 py-1 ${theme.colors.solve} rounded-lg hover:${theme.colors.solveHover} transition-all duration-200 border hover:${theme.colors.solveHover}`}
                          >
                            Solve
                          </a>
                        ) : (
                          <span className="text-slate-500">-</span>
                        )}
                      </td>
                      <td className="p-4">
                        {topic.yt_link ? (
                          <a
                            href={topic.yt_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center justify-center w-8 h-8 ${theme.colors.youtube} rounded-lg hover:${theme.colors.youtubeHover} transition-all duration-200 border hover:${theme.colors.youtubeHover}`}
                          >
                            <Youtube size={16} />
                          </a>
                        ) : (
                          <span className="text-slate-500">-</span>
                        )}
                      </td>
                      <td className="p-4">
                        {topic.cs_link ? (
                          <a
                            href={topic.cs_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center w-8 h-8 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-all duration-200 border border-blue-500/30 hover:border-blue-500/50"
                            title="Practice on Coding Ninjas"
                          >
                            <span className="text-xs font-bold">CN</span>
                          </a>
                        ) : (
                          <span className="text-slate-500">-</span>
                        )}
                      </td>
                      <td className="p-4">
                        {topic.gfg_link ? (
                          <a
                            href={topic.gfg_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center w-8 h-8 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-all duration-200 border border-green-500/30 hover:border-green-500/50"
                            title="Practice on GeeksforGeeks"
                          >
                            <span className="text-xs font-bold">GFG</span>
                          </a>
                        ) : (
                          <span className="text-slate-500">-</span>
                        )}
                      </td>
                      <td className="p-4">
                        {topic.lc_link ? (
                          <a
                            href={topic.lc_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center w-8 h-8 bg-orange-500/20 text-orange-400 rounded-lg hover:bg-orange-500/30 transition-all duration-200 border border-orange-500/30 hover:border-orange-500/50"
                            title="Practice on LeetCode"
                          >
                            <span className="text-xs font-bold">LC</span>
                          </a>
                        ) : (
                          <span className="text-slate-500">-</span>
                        )}
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => updateFavorite(topic.id)}
                          className="focus:outline-none transition-transform duration-200 hover:scale-110"
                        >
                          <Star
                            size={22}
                            className={
                              favorites[topic.id]
                                ? `${theme.colors.star} fill-current drop-shadow-lg`
                                : `text-slate-500 hover:${theme.colors.starHover}`
                            }
                          />
                        </button>
                      </td>
                      <td className="p-4">
                        <DifficultyBadge difficulty={topic.difficulty} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Badge component for difficulties
const DifficultyBadge = ({ difficulty }) => {
  const labels = ["Easy", "Medium", "Hard"];
  const colors = ["bg-green-600", "bg-yellow-500", "bg-red-600"];
  return (
    <span className={`px-3 py-1 text-sm text-white rounded-full ${colors[difficulty]}`}>
      {labels[difficulty]}
    </span>
  );
};
