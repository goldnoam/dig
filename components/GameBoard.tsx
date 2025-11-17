import React, { useState } from 'react';
import { CubeType, Effect } from '../types';
import { Cube } from './Cube';
import EffectComponent from './Effect';

interface GameBoardProps {
  cubes: CubeType[];
  digCube: (id: string) => void;
  finalizeDig: (id: string) => void;
  effects: Effect[];
  removeEffect: (id: string) => void;
  hitCubeInfo: { id: string; wasDestroyed: boolean } | null;
  toyShape: string;
  isPaused: boolean;
}

const GameBoard: React.FC<GameBoardProps> = ({ cubes, digCube, finalizeDig, effects, removeEffect, hitCubeInfo, toyShape, isPaused }) => {
  const [rotation, setRotation] = useState({ x: -25, y: 35 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isPaused) return;
    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || isPaused) return;
    const dx = e.clientX - lastMousePos.x;
    const dy = e.clientY - lastMousePos.y;
    setRotation(r => ({ x: r.x - dy * 0.5, y: r.y + dx * 0.5 }));
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  if (cubes.length === 0) return null;
  
  const gridSize = Math.cbrt(cubes.length);
  const CUBE_SIZE = 50;
  const gridCenter = (gridSize - 1) / 2;

  const containerStyle: React.CSSProperties = {
    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
    pointerEvents: isPaused ? 'none' : 'auto',
  };
  
  const gameBoardSize = gridSize * CUBE_SIZE * 1.5;

  return (
    <div
      className={`flex items-center justify-center select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      style={{ perspective: '2000px', width: `${gameBoardSize}px`, height: `${gameBoardSize}px` }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        className="relative transition-transform duration-150 ease-out"
        style={{ ...containerStyle, transformStyle: 'preserve-3d' }}
      >
        {cubes.map((cube) => (
          <Cube
            key={cube.id}
            cube={cube}
            size={CUBE_SIZE}
            gridCenter={gridCenter}
            digCube={digCube}
            finalizeDig={finalizeDig}
            toyShape={toyShape}
            hitCubeInfo={hitCubeInfo}
          />
        ))}
        {effects.map((effect) => (
          <EffectComponent
            key={effect.id}
            effect={effect}
            onComplete={removeEffect}
            size={CUBE_SIZE}
            gridCenter={gridCenter}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;