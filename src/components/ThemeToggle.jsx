import React, { useState } from "react";
import { ChevronDown, Palette } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

export default function ThemeToggle() {
  const { currentTheme, theme, changeTheme, themeNames, themesObject } =
    useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleThemeChange = (themeKey) => {
    console.log("YES I AM WORKING:", themeKey); // ✅ always logs
    changeTheme(themeKey);
    setIsOpen(false);
  };

  return (
    <div className="fixed top-6 right-6 z-50">
      <div className="relative">
        {/* Toggle button */}
        <button
          onClick={toggleDropdown}
          className={`flex items-center gap-2 px-4 py-3 rounded-full transition-all duration-300 transform hover:scale-105
            ${theme.colors.card} ${theme.colors.border} border backdrop-blur-sm`}
          title={`Current Theme: ${theme.name}`}
        >
          <Palette size={18} className={theme.colors.accentColor} />
          <span className={`${theme.colors.textSecondary} font-medium`}>
            {theme.name}
          </span>
          <ChevronDown
            size={16}
            className={`${theme.colors.textSecondary} transition-transform duration-200 ${isOpen ? "rotate-180" : ""
              }`}
          />
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div
            className={`absolute right-0 mt-2 w-48 ${theme.colors.card} backdrop-blur-sm rounded-xl border ${theme.colors.border} shadow-2xl ${theme.colors.shadow} overflow-hidden z-50`}
          >
            {themeNames.map((themeName, index) => {
              const themeKey = Object.keys(themesObject)[index];
              return (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation(); 
                    handleThemeChange(themeKey);
                  }}
                  className={`cursor-pointer w-full text-left px-4 py-3 transition-colors duration-200
                    ${currentTheme === themeKey
                      ? `${theme.colors.accentColor} font-semibold`
                      : theme.colors.textSecondary
                    }`}
                >
                  {themeName}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Click outside overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
