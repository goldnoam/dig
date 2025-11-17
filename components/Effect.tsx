
import React, { useEffect } from 'react';
import { Effect } from '../types';

interface EffectProps {
  effect: Effect;
  onComplete: (id: string) => void;
  size: number;
  gridCenter: number;
}

const PARTICLE_COUNT = 15;
const DURATION = 800;

const EffectComponent: React.FC<EffectProps> = ({ effect, onComplete, size, gridCenter }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete(effect.id);
    }, DURATION);
    return () => clearTimeout(timer);
  }, [effect.id, onComplete]);

  const posX = (effect.x - gridCenter) * size;
  const posY = (effect.y - gridCenter) * size;
  const posZ = (effect.z - gridCenter) * size;
  
  const containerStyle: React.CSSProperties = {
    position: 'absolute',
    transform: `translate3d(${posX}px, ${posY}px, ${posZ}px)`,
    transformStyle: 'preserve-3d',
    pointerEvents: 'none',
  };
  
  const isWin = effect.type === 'win';
  const particleCount = isWin ? PARTICLE_COUNT * 5 : PARTICLE_COUNT;
  
  return (
    <div style={containerStyle}>
      {Array.from({ length: particleCount }).map((_, i) => {
        const particleSize = Math.random() * (isWin ? 15 : 8) + 2;
        const angle = Math.random() * 2 * Math.PI;
        const theta = Math.acos(2 * Math.random() - 1);
        const radius = (Math.random() * (isWin ? 2.5 : 1.5) + 0.5) * size;

        const particleStyle: React.CSSProperties = {
          position: 'absolute',
          width: `${particleSize}px`,
          height: `${particleSize}px`,
          backgroundColor: isWin && effect.colors ? effect.colors[i % effect.colors.length] : effect.color,
          borderRadius: '50%',
          animation: `explode ${DURATION}ms ease-out forwards`,
          '--tx': `${Math.sin(theta) * Math.cos(angle) * radius}px`,
          '--ty': `${Math.sin(theta) * Math.sin(angle) * radius}px`,
          '--tz': `${Math.cos(theta) * radius}px`,
          '--s-start': `${Math.random() * 0.5 + 0.8}`,
          '--s-end': '0',
          '--r': `${Math.random() * 360}deg`,
        };
        return <div key={i} style={particleStyle}></div>;
      })}
    </div>
  );
};

export default React.memo(EffectComponent);