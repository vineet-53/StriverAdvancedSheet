import React from "react";
import { Moon } from "lucide-react";

export default function ThemeToggle() {
  return (
    <div className="fixed top-6 right-6 z-50 p-3 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30 transition-all duration-300" title="Current Theme: Dark">
      <Moon size={20} />
    </div>
  );
} 