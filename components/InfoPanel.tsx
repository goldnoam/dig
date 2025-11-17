import React from 'react';
import * as AudioPlayer from '../utils/audio';
import { useLocalization } from '../contexts/LocalizationContext';

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
  nextLevel: () => void;
  resetGame: () => void;
  onLevelSelectClick: () => void;
}

const InfoItem: React.FC<{ label: string; value: string | number; isButton?: boolean; onClick?: () => void; ariaLabel?: string }> = ({ label, value, isButton, onClick, ariaLabel }) => {
  const content = (
    <>
      <span className="text-sm font-medium text-cyan-600 dark:text-cyan-400">{label}</span>
      <span className="text-3xl font-bold tracking-tighter">{value}</span>
    </>
  );

  const commonClasses = "flex flex-col items-center justify-center bg-gray-200 dark:bg-gray-800/50 p-4 rounded-lg min-w-[120px] transition-colors";
  
  if (isButton && onClick) {
    return (
      <button 
        onClick={onClick} 
        className={`${commonClasses} hover:bg-gray-300 dark:hover:bg-gray-700/80 cursor-pointer`}
        aria-label={ariaLabel}
        >
        {content}
      </button>
    );
  }

  return (
    <div className={commonClasses}>
      {content}
    </div>
  );
};

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
  nextLevel,
  resetGame,
  onLevelSelectClick,
}) => {
  const { t } = useLocalization();
  return (
    <div className="flex flex-col items-center gap-4 md:gap-6 mb-6">
      <div className="flex flex-wrap gap-2 md:gap-4 justify-center">
        <InfoItem label={t.level} value={level} isButton onClick={onLevelSelectClick} ariaLabel={t.selectLevelAria.replace('{level}', String(level))} />
        <InfoItem label={t.time} value={timer.toFixed(1)} />
        <InfoItem label={t.bestTime} value={highScore ? highScore.toFixed(1) : '-'} />
        <InfoItem label={t.cubesLeft} value={remainingCubes} />
      </div>
      <div className="flex flex-wrap gap-2 md:gap-4 justify-center">
        {isGameWon ? (
          <>
            <ActionButton
              onClick={nextLevel}
              disabled={false}
              className="bg-green-500 hover:bg-green-600"
            >
              {t.nextLevel}
            </ActionButton>
            <ActionButton
              onClick={resetGame}
              disabled={false}
              className="bg-blue-500 hover:bg-blue-600"
            >
              {t.playAgain}
            </ActionButton>
          </>
        ) : (
          <>
            <ActionButton
              onClick={togglePause}
              disabled={isGameWon}
              className="bg-yellow-500 hover:bg-yellow-600"
            >
              {isPaused ? t.resume : t.pause}
            </ActionButton>
            <ActionButton
              onClick={undoLastDig}
              disabled={!canUndo || isPaused}
              className="bg-blue-500 hover:bg-blue-600"
            >
              {t.undo}
            </ActionButton>
             <ActionButton
              onClick={autoDiscover}
              disabled={isAutoDiscovering || isGameWon || isPaused}
            >
              {isAutoDiscovering ? t.discovering : t.autoDiscover}
            </ActionButton>
             <ActionButton
              onClick={nextLevel}
              disabled={isAutoDiscovering}
              className="bg-orange-500 hover:bg-orange-600"
            >
              {t.nextLevel}
            </ActionButton>
          </>
        )}
      </div>
    </div>
  );
};

export default InfoPanel;