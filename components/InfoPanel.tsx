
import React from 'react';

interface InfoPanelProps {
  level: number;
  timer: number;
  highScore: number | null;
  remainingCubes: number;
}

const InfoItem: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
  <div className="flex flex-col items-center justify-center bg-gray-800/50 p-4 rounded-lg min-w-[120px]">
    <span className="text-sm font-medium text-cyan-400">{label}</span>
    <span className="text-3xl font-bold tracking-tighter">{value}</span>
  </div>
);

const InfoPanel: React.FC<InfoPanelProps> = ({
  level,
  timer,
  highScore,
  remainingCubes,
}) => {
  return (
    <div className="flex flex-wrap gap-2 md:gap-4 mb-8 justify-center">
      <InfoItem label="Level" value={level} />
      <InfoItem label="Time" value={timer.toFixed(1)} />
      <InfoItem label="Best Time" value={highScore ? highScore.toFixed(1) : '-'} />
      <InfoItem label="Cubes Left" value={remainingCubes} />
    </div>
  );
};

export default InfoPanel;