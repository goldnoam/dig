import React from 'react';
import { useSettings } from '../contexts/SettingsContext';

const SettingsModal = (): React.JSX.Element | null => {
  const { isSettingsOpen, toggleSettings, musicVolume, setMusicVolume, effectsVolume, setEffectsVolume } = useSettings();

  if (!isSettingsOpen) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
      onClick={toggleSettings}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-2xl shadow-2xl p-8 w-full max-w-md relative"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={toggleSettings}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
          aria-label="Close settings"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-3xl font-bold text-center mb-6">Settings</h2>
        <div className="space-y-6">
          <div className="flex flex-col">
            <label htmlFor="music-volume" className="text-lg mb-2">Music Volume</label>
            <input
              id="music-volume"
              type="range"
              min="0"
              max="0.5"
              step="0.01"
              value={musicVolume}
              onChange={(e) => setMusicVolume(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-300 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="effects-volume" className="text-lg mb-2">Effects Volume</label>
            <input
              id="effects-volume"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={effectsVolume}
              onChange={(e) => setEffectsVolume(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-300 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;