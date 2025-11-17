import React from 'react';
import * as AudioPlayer from '../utils/audio';

interface InfoPanelProps {
  level: number;
  timer: number;
  highScore: number | null;
  remainingCubes: number;
  autoDiscover: () => void;
  isAutoDiscovering: boolean;
  isGameWon: boolean;
  isPaused: boolean;
  togglePause: () => void;
  undoLastDig: () => void;
  canUndo: boolean;
}

const InfoItem: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
  <div className="flex flex-col items-center justify-center bg-gray-200 dark:bg-gray-800/50 p-4 rounded-lg min-w-[120px] transition-colors">
    <span className="text-sm font-medium text-cyan-600 dark:text-cyan-400">{label}</span>
    <span className="text-3xl font-bold tracking-tighter">{value}</span>
  </div>
);

const ActionButton: React.FC<{ onClick: () => void, disabled: boolean, children: React.ReactNode, className?: string }> = 
({ onClick, disabled, children, className = 'bg-purple-600 hover:bg-purple-700' }) => {
  const handleClick = () => {
    if(!disabled) {
      AudioPlayer.playButtonClickSound();
      onClick();
    }
  }
  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`px-5 py-2 text-white font-bold rounded-lg shadow-md transition-all transform hover:scale-105 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:scale-100 ${className}`}
    >
      {children}
    </button>
  );
};


const InfoPanel: React.FC<InfoPanelProps> = ({
  level,
  timer,
  highScore,
  remainingCubes,
  autoDiscover,
  isAutoDiscovering,
  isGameWon,
  isPaused,
  togglePause,
  undoLastDig,
  canUndo,
}) => {
  return (
    <div className="flex flex-col items-center gap-4 md:gap-6 mb-6">
      <div className="flex flex-wrap gap-2 md:gap-4 justify-center">
        <InfoItem label="Level" value={level} />
        <InfoItem label="Time" value={timer.toFixed(1)} />
        <InfoItem label="Best Time" value={highScore ? highScore.toFixed(1) : '-'} />
        <InfoItem label="Cubes Left" value={remainingCubes} />
      </div>
      <div className="flex flex-wrap gap-2 md:gap-4 justify-center">
        <ActionButton
          onClick={togglePause}
          disabled={isGameWon}
          className="bg-yellow-500 hover:bg-yellow-600"
        >
          {isPaused ? 'Resume' : 'Pause'}
        </ActionButton>
        <ActionButton
          onClick={undoLastDig}
          disabled={!canUndo || isPaused}
          className="bg-blue-500 hover:bg-blue-600"
        >
          Undo
        </ActionButton>
         <ActionButton
          onClick={autoDiscover}
          disabled={isAutoDiscovering || isGameWon || isPaused}
        >
          {isAutoDiscovering ? 'Discovering...' : 'Auto Discover'}
        </ActionButton>
      </div>
    </div>
  );
};

export default InfoPanel;