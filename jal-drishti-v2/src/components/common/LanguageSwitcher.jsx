import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { Globe } from 'lucide-react';

const LANGUAGES = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'as', name: 'Assamese', native: 'অসমীয়া' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം' }
];

export function LanguageSwitcher() {
  const { language, setLanguage } = useAppState();

  return (
    <div className="flex items-center gap-1.5 bg-hydro-900/90 border border-slate-700/60 rounded-lg px-2.5 py-1 text-xs text-slate-300">
      <Globe size={14} className="text-cyan-400" />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="bg-transparent text-slate-200 font-medium focus:outline-none cursor-pointer text-xs"
      >
        {LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code} className="bg-hydro-900 text-slate-100">
            {lang.native} ({lang.name})
          </option>
        ))}
      </select>
    </div>
  );
}
