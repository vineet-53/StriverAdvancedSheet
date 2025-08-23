import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronRight, Youtube, Star } from "lucide-react";

// ✅ StepsViewer is now modular
export default function StepsViewer({ sheetId, jsonPath }) {
  const [data, setData] = useState([]);
  const [openSteps, setOpenSteps] = useState({});
  const [openSubs, setOpenSubs] = useState({});
  const [favorites, setFavorites] = useState({});
  const [done, setDone] = useState({});

  // ✅ Each sheet gets its own localStorage key
  const storageKey = `done_questions_${sheetId}`;

  useEffect(() => {
    // load sheet json dynamically
    /* @vite-ignore */
    import(`${jsonPath}`).then((module) => setData(module.default));

    // load progress
    const stored = JSON.parse(localStorage.getItem(storageKey)) || {};
    setDone(stored);
  }, [sheetId, jsonPath]);

  const toggleStep = (id) =>
    setOpenSteps((prev) => ({ ...prev, [id]: !prev[id] }));

  const toggleSubStep = (id) =>
    setOpenSubs((prev) => ({ ...prev, [id]: !prev[id] }));

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
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent mb-3">
            📚 {sheetId.toUpperCase()} Progress Tracker
          </h1>
          <p className="text-gray-300 text-lg">
            Track your progress through each step and sub-step
          </p>
        </div>

        {data.map((step) => (
          <div key={step.step_no} className="mb-6">
            {/* Step */}
            <div
              className="flex items-center justify-between bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 hover:border-orange-500/50 transition-all duration-300 cursor-pointer hover:shadow-xl hover:shadow-orange-500/20"
              onClick={() => toggleStep(step.step_no)}
            >
              <h2 className="text-xl font-semibold text-white">
                Step {step.step_no}: {step.step_title}
              </h2>
              <div className="flex items-center gap-3">
                <span className="text-gray-300 text-sm">Click to expand</span>
                {openSteps[step.step_no] ? (
                  <ChevronDown className="text-orange-400" size={24} />
                ) : (
                  <ChevronRight className="text-orange-400" size={24} />
                )}
              </div>
            </div>

            {/* Sub-Steps */}
            {openSteps[step.step_no] &&
              step.sub_steps.map((sub) => (
                <div key={sub.sub_step_no} className="ml-8 mt-4">
                  <div
                    className="flex items-center justify-between bg-gray-700/80 backdrop-blur-sm p-4 rounded-xl border border-gray-700 hover:border-orange-500/50 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-orange-500/20"
                    onClick={() => toggleSubStep(sub.sub_step_no)}
                  >
                    <h3 className="text-lg font-medium text-white">
                      Lec {sub.sub_step_no}: {sub.sub_step_title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 text-sm">Expand topics</span>
                      {openSubs[sub.sub_step_no] ? (
                        <ChevronDown className="text-blue-400" size={20} />
                      ) : (
                        <ChevronRight className="text-blue-400" size={20} />
                      )}
                    </div>
                  </div>

                                     {/* Topics */}
                   {openSubs[sub.sub_step_no] && (
                     <div className="mt-4 ml-4 bg-gray-700/80 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
                       <div className="overflow-x-auto">
                         <table className="w-full text-left">
                           <thead className="bg-gray-800/80 border-b border-gray-700">
                             <tr>
                               <th className="p-4 text-gray-300 font-semibold">Status</th>
                               <th className="p-4 text-gray-300 font-semibold">Problem</th>
                               <th className="p-4 text-gray-300 font-semibold">Post</th>
                               <th className="p-4 text-gray-300 font-semibold">YouTube</th>
                               <th className="p-4 text-gray-300 font-semibold">GFG</th>
                               <th className="p-4 text-gray-300 font-semibold">LeetCode</th>
                               <th className="p-4 text-gray-300 font-semibold">Coding Ninjas</th>
                               <th className="p-4 text-gray-300 font-semibold">Fav</th>
                               <th className="p-4 text-gray-300 font-semibold">Difficulty</th>
                             </tr>
                           </thead>
                           <tbody>
                             {sub.topics.map((topic) => (
                               <tr key={topic.id} className="border-b border-gray-700 hover:bg-gray-700/80 transition-colors duration-200">
                                                                 <td className="p-4">
                                   <input
                                     type="checkbox"
                                     checked={!!done[topic.id]}
                                     onChange={() => toggleDone(topic.id)}
                                     className="w-5 h-5 text-orange-500 bg-gray-700 border-gray-600 rounded focus:ring-orange-500 focus:ring-2"
                                   />
                                 </td>
                                 <td className="p-4">
                                   <span className="text-orange-300 cursor-pointer hover:text-orange-200 transition-colors duration-200 font-medium">
                                     {topic.question_title}
                                   </span>
                                 </td>
                                 <td className="p-4">
                                   {topic.post_link ? (
                                     <a
                                       href={topic.post_link}
                                       target="_blank"
                                       rel="noopener noreferrer"
                                       className="inline-flex items-center px-3 py-1 bg-blue-500/20 text-blue-300 border-blue-500/30 rounded-lg hover:bg-blue-500/30 hover:border-blue-500/50 transition-all duration-200 border"
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
                                       className="inline-flex items-center justify-center w-8 h-8 bg-red-500/20 text-red-400 border-red-500/30 rounded-lg hover:bg-red-500/30 hover:border-red-500/50 transition-all duration-200 border"
                                     >
                                       <Youtube size={16} />
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
                                   <button
                                     onClick={() => updateFavorite(topic.id)}
                                     className="focus:outline-none transition-transform duration-200 hover:scale-110"
                                   >
                                     <Star
                                       size={22}
                                       className={
                                         favorites[topic.id]
                                           ? "text-yellow-400 fill-current drop-shadow-lg"
                                           : "text-slate-500 hover:text-yellow-300"
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
                  )}
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
