import React, { createContext, useContext, useState, useEffect } from 'react';

const themes = {
  // Classic Dark
  dark: {
    name: "Dark",
    colors: {
      primary: "from-black via-gray-900 to-black",
      secondary: "from-orange-400 via-red-500 to-pink-500",
      accent: "orange",
      card: "bg-gray-800/80",
      cardHover: "bg-gray-700/80",
      border: "border-gray-700",
      borderHover: "border-orange-500/50",
      text: "text-white",
      textSecondary: "text-gray-300",
      textMuted: "text-gray-400",
      button: "from-orange-500 to-orange-600",
      buttonHover: "from-orange-600 to-orange-700",
      shadow: "shadow-orange-500/20",
      shadowHover: "shadow-orange-500/30",
      checkbox: "text-orange-500",
      checkboxFocus: "focus:ring-orange-500",
      link: "text-orange-300",
      linkHover: "text-orange-200",
      solve: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      solveHover: "bg-blue-500/30 border-blue-500/50",
      youtube: "bg-red-500/20 text-red-400 border-red-500/30",
      youtubeHover: "bg-red-500/30 border-red-500/50",
      star: "text-yellow-400",
      starHover: "text-yellow-300",
      success: "bg-green-500/20 text-green-300 border-green-500/30",
      error: "bg-red-500/20 text-red-300 border-red-500/30",
      accentColor: "text-orange-400",
      difficulty: { easy: "bg-green-600", medium: "bg-yellow-500", hard: "bg-red-600" },
    },
  },

  // 1. Dracula
  dracula: {
    name: "Dracula",
    colors: {
      primary: "from-gray-900 via-purple-900 to-gray-900",
      secondary: "from-pink-400 via-purple-500 to-cyan-400",
      accent: "pink",
      card: "bg-gray-800/90",
      cardHover: "bg-gray-700/90",
      border: "border-gray-700",
      borderHover: "border-pink-400",
      text: "text-white",
      textSecondary: "text-gray-300",
      textMuted: "text-gray-400",
      button: "from-pink-500 to-purple-600",
      buttonHover: "from-pink-600 to-purple-700",
      shadow: "shadow-pink-500/20",
      accentColor: "text-pink-400",
      difficulty: { easy: "bg-green-500", medium: "bg-yellow-500", hard: "bg-red-600" },
    },
  },

  // 2. Nord
  nord: {
    name: "Nord",
    colors: {
      primary: "from-gray-900 via-blue-900 to-gray-900",
      secondary: "from-cyan-300 via-blue-400 to-indigo-400",
      accent: "cyan",
      card: "bg-gray-800/80",
      cardHover: "bg-gray-700/80",
      border: "border-gray-700",
      borderHover: "border-cyan-400",
      text: "text-gray-100",
      textSecondary: "text-gray-300",
      textMuted: "text-gray-400",
      button: "from-cyan-500 to-blue-500",
      buttonHover: "from-cyan-600 to-blue-600",
      shadow: "shadow-cyan-400/20",
      accentColor: "text-cyan-300",
      difficulty: { easy: "bg-green-500", medium: "bg-yellow-500", hard: "bg-red-600" },
    },
  },

  // 3. Monokai
  monokai: {
    name: "Monokai",
    colors: {
      primary: "from-gray-900 via-gray-800 to-gray-900",
      secondary: "from-green-400 via-yellow-400 to-pink-400",
      accent: "yellow",
      card: "bg-gray-900/85",
      cardHover: "bg-gray-800/85",
      border: "border-gray-700",
      borderHover: "border-yellow-400",
      text: "text-white",
      textSecondary: "text-gray-300",
      textMuted: "text-gray-500",
      button: "from-yellow-400 to-orange-500",
      buttonHover: "from-yellow-500 to-orange-600",
      shadow: "shadow-yellow-400/25",
      accentColor: "text-yellow-300",
      difficulty: { easy: "bg-green-400", medium: "bg-yellow-400", hard: "bg-red-500" },
    },
  },

  // 4. Solarized Dark
  solarized: {
    name: "Solarized",
    colors: {
      primary: "from-gray-900 via-cyan-900 to-gray-900",
      secondary: "from-yellow-400 via-orange-400 to-red-400",
      accent: "cyan",
      card: "bg-gray-900/85",
      cardHover: "bg-gray-800/85",
      border: "border-gray-700",
      borderHover: "border-orange-400",
      text: "text-gray-200",
      textSecondary: "text-gray-400",
      textMuted: "text-gray-500",
      button: "from-cyan-400 to-teal-500",
      buttonHover: "from-cyan-500 to-teal-600",
      shadow: "shadow-cyan-500/25",
      accentColor: "text-cyan-300",
      difficulty: { easy: "bg-green-500", medium: "bg-yellow-500", hard: "bg-red-500" },
    },
  },

  // 5. Material
  material: {
    name: "Material",
    colors: {
      primary: "from-gray-900 via-indigo-900 to-gray-900",
      secondary: "from-indigo-400 via-blue-500 to-cyan-500",
      accent: "indigo",
      card: "bg-gray-800/90",
      cardHover: "bg-gray-700/90",
      border: "border-gray-700",
      borderHover: "border-indigo-400",
      text: "text-white",
      textSecondary: "text-gray-300",
      textMuted: "text-gray-400",
      button: "from-indigo-500 to-blue-600",
      buttonHover: "from-indigo-600 to-blue-700",
      shadow: "shadow-indigo-500/25",
      accentColor: "text-indigo-400",
      difficulty: { easy: "bg-green-500", medium: "bg-yellow-500", hard: "bg-red-600" },
    },
  },

  // 6. Sunset
  sunset: {
    name: "Sunset",
    colors: {
      primary: "from-purple-900 via-pink-900 to-red-900",
      secondary: "from-orange-400 via-pink-500 to-red-500",
      accent: "pink",
      card: "bg-pink-900/80",
      cardHover: "bg-pink-800/80",
      border: "border-pink-700",
      borderHover: "border-orange-400",
      text: "text-white",
      textSecondary: "text-pink-200",
      textMuted: "text-pink-300",
      button: "from-orange-500 to-red-600",
      buttonHover: "from-orange-600 to-red-700",
      shadow: "shadow-orange-500/25",
      accentColor: "text-orange-400",
      difficulty: { easy: "bg-green-500", medium: "bg-yellow-500", hard: "bg-red-600" },
    },
  },

  // 7. Cyberpunk
  cyberpunk: {
    name: "Cyberpunk",
    colors: {
      primary: "from-black via-fuchsia-900 to-black",
      secondary: "from-yellow-400 via-pink-500 to-purple-600",
      accent: "fuchsia",
      card: "bg-black/90",
      cardHover: "bg-gray-900/90",
      border: "border-fuchsia-500/50",
      borderHover: "border-yellow-400",
      text: "text-fuchsia-200",
      textSecondary: "text-gray-400",
      textMuted: "text-gray-500",
      button: "from-fuchsia-500 to-yellow-400",
      buttonHover: "from-fuchsia-600 to-yellow-500",
      shadow: "shadow-fuchsia-500/25",
      accentColor: "text-fuchsia-400",
      difficulty: { easy: "bg-green-500", medium: "bg-yellow-500", hard: "bg-red-600" },
    },
  },

  // 8. Tokyo Night
  tokyo: {
    name: "Tokyo Night",
    colors: {
      primary: "from-gray-900 via-indigo-900 to-gray-900",
      secondary: "from-blue-400 via-purple-500 to-pink-500",
      accent: "indigo",
      card: "bg-gray-900/85",
      cardHover: "bg-gray-800/85",
      border: "border-indigo-500/50",
      borderHover: "border-purple-400",
      text: "text-gray-100",
      textSecondary: "text-gray-400",
      textMuted: "text-gray-500",
      button: "from-indigo-500 to-purple-500",
      buttonHover: "from-indigo-600 to-purple-600",
      shadow: "shadow-indigo-500/25",
      accentColor: "text-indigo-400",
      difficulty: { easy: "bg-green-500", medium: "bg-yellow-500", hard: "bg-red-500" },
    },
  },

  // 9. Rose Pine
  rosepine: {
    name: "Rose Pine",
    colors: {
      primary: "from-rose-900 via-gray-900 to-rose-900",
      secondary: "from-rose-400 via-pink-400 to-purple-400",
      accent: "rose",
      card: "bg-rose-900/85",
      cardHover: "bg-rose-800/85",
      border: "border-rose-700",
      borderHover: "border-pink-400",
      text: "text-rose-100",
      textSecondary: "text-rose-200",
      textMuted: "text-rose-300",
      button: "from-rose-400 to-pink-500",
      buttonHover: "from-rose-500 to-pink-600",
      shadow: "shadow-rose-400/25",
      accentColor: "text-rose-300",
      difficulty: { easy: "bg-green-500", medium: "bg-yellow-500", hard: "bg-red-500" },
    },
  },

  // 10. Gruvbox
  gruvbox: {
    name: "Gruvbox",
    colors: {
      primary: "from-gray-900 via-amber-900 to-gray-900",
      secondary: "from-yellow-400 via-orange-500 to-red-500",
      accent: "amber",
      card: "bg-gray-900/90",
      cardHover: "bg-gray-800/90",
      border: "border-amber-600",
      borderHover: "border-orange-500",
      text: "text-amber-100",
      textSecondary: "text-amber-200",
      textMuted: "text-amber-300",
      button: "from-amber-500 to-orange-600",
      buttonHover: "from-amber-600 to-orange-700",
      shadow: "shadow-amber-500/25",
      accentColor: "text-amber-400",
      difficulty: { easy: "bg-green-500", medium: "bg-yellow-500", hard: "bg-red-600" },
    },
  },
};


// Create context
const ThemeContext = createContext();

// Theme provider component
export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('dark');

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setCurrentTheme(savedTheme);
  }, []);

  // Save theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('theme', currentTheme);
  }, [currentTheme]);

  const getTheme = () => themes[currentTheme];

  const changeTheme = (themeName)  => { 
    if(themes[themeName])
    {
      setCurrentTheme(themeName); 
      localStorage.setItem('theme' , themeName); 
    }
  }
  const value = {
    currentTheme,
    theme: getTheme(),
    changeTheme,
    themes: Object.keys(themes),
    themeNames: Object.values(themes).map(t => t.name),
    themesObject: themes
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 