import React from 'react';

interface InfoPanelProps {
  level: number;
  timer: number;
  highScore: number | null;
  remainingCubes: number;
  autoDiscover: () => void;
  isAutoDiscovering: boolean;
  isGameWon: boolean;
}

const InfoItem: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
  <div className="flex flex-col items-center justify-center bg-gray-200 dark:bg-gray-800/50 p-4 rounded-lg min-w-[120px] transition-colors">
    <span className="text-sm font-medium text-cyan-600 dark:text-cyan-400">{label}</span>
    <span className="text-3xl font-bold tracking-tighter">{value}</span>
  </div>
);

const InfoPanel: React.FC<InfoPanelProps> = ({
  level,
  timer,
  highScore,
  remainingCubes,
  autoDiscover,
  isAutoDiscovering,
  isGameWon
}) => {
  return (
    <div className="flex flex-col items-center gap-4 md:gap-8 mb-8">
      <div className="flex flex-wrap gap-2 md:gap-4 justify-center">
        <InfoItem label="Level" value={level} />
        <InfoItem label="Time" value={timer.toFixed(1)} />
        <InfoItem label="Best Time" value={highScore ? highScore.toFixed(1) : '-'} />
        <InfoItem label="Cubes Left" value={remainingCubes} />
      </div>
      <button
        onClick={autoDiscover}
        disabled={isAutoDiscovering || isGameWon}
        className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg shadow-md transition-all transform hover:scale-105 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:scale-100"
      >
        {isAutoDiscovering ? 'Discovering...' : 'Auto Discover'}
      </button>
    </div>
  );
};

export default InfoPanel;