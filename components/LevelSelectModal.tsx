import React from 'react';
import { useLocalization } from '../contexts/LocalizationContext';

interface LevelSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLevel: (levelIndex: number) => void;
  totalLevels: number;
  currentLevel: number;
}

const LevelSelectModal: React.FC<LevelSelectModalProps> = ({ isOpen, onClose, onSelectLevel, totalLevels, currentLevel }) => {
  const { t } = useLocalization();

  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-2xl shadow-2xl p-8 w-full max-w-lg relative"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
          aria-label={t.closeLevelSelect}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-3xl font-bold text-center mb-6">{t.selectLevel}</h2>
        <div className="grid grid-cols-4 md:grid-cols-5 gap-4 max-h-[60vh] overflow-y-auto p-1">
          {Array.from({ length: totalLevels }).map((_, i) => (
            <button
              key={i}
              onClick={() => onSelectLevel(i)}
              className={`p-4 rounded-lg font-bold text-xl transition-transform transform hover:scale-110 aspect-square flex items-center justify-center ${
                (i + 1) === currentLevel
                  ? 'bg-cyan-500 text-white ring-2 ring-offset-2 ring-offset-gray-100 dark:ring-offset-gray-800 ring-cyan-500'
                  : 'bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LevelSelectModal;