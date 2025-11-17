import React, { useState } from 'react';
import { CubeType } from '../types';

interface CubeProps {
  cube: CubeType;
  size: number;
  gridCenter: number;
  digCube: (id: string) => void;
  finalizeDig: (id: string) => void;
  toyShape: string;
  hitCubeInfo: { id: string; wasDestroyed: boolean } | null;
}

const CubeComponent: React.FC<CubeProps> = ({ cube, size, gridCenter, digCube, toyShape, hitCubeInfo }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { x, y, z, color, isVisible, isToy, id, isDying, cubeType, health, maxHealth } = cube;

  if (!isVisible && !isDying) {
    return null;
  }
  
  const posX = (x - gridCenter) * size;
  const posY = (y - gridCenter) * size;
  const posZ = (z - gridCenter) * size;
  
  const isCurrentlyHit = hitCubeInfo?.id === id;
  const isToughHit = isCurrentlyHit && !hitCubeInfo.wasDestroyed;

  // --- Animation & Interaction Logic ---
  let scale = 1.0;
  if (isHovered && !isCurrentlyHit) {
      scale = 1.1; // Hover
  } else if (isCurrentlyHit) {
      scale = 0.9; // Recoil on any hit
  }
  
  const outerStyle: React.CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    position: 'absolute',
    transform: `translate3d(${posX}px, ${posY}px, ${posZ}px)`,
    transformStyle: 'preserve-3d',
    animation: isDying ? `crumble 300ms ease-out forwards` : undefined,
    pointerEvents: isDying ? 'none' : 'auto',
  };
  
  const recoilStyle: React.CSSProperties = {
      width: '100%',
      height: '100%',
      transform: `scale(${scale})`,
      transition: 'transform 150ms ease-out',
      transformStyle: 'preserve-3d',
  };

  const shakeStyle: React.CSSProperties = {
      width: '100%',
      height: '100%',
      transformStyle: 'preserve-3d',
  };

  if (isToughHit) {
      shakeStyle.animation = 'shake 300ms ease-out';
  }
  // --- End Animation Logic ---

  const handleClick = () => {
    if (!isToy && !isDying) {
      digCube(id);
    }
  };

  // The toy is a special, glowing sphere with an emoji inside
  if (isToy) {
    const toySize = size * 1.2;
    return (
      <div style={outerStyle}>
        <div
          style={{
            width: `${toySize}px`,
            height: `${toySize}px`,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            background: `radial-gradient(circle at 65% 15%, white, ${color} 60%)`,
            boxShadow: `0 0 15px ${color}, 0 0 25px ${color}, 0 0 35px ${color}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: `${toySize * 0.6}px`,
            color: 'white',
            textShadow: '0 0 5px black',
          }}
          className="animate-pulse"
        >
          {toyShape}
        </div>
      </div>
    );
  }

  // A regular cube has 6 faces for a 3D effect
  const faceStyle: React.CSSProperties = {
    position: 'absolute',
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: color,
    border: '1px solid rgba(0,0,0,0.5)',
  };
  
  const healthPercentage = health / maxHealth;
  const toughnessBrightness = cubeType === 'tough' ? 0.8 : 1;
  // Damaged tough cubes get brighter as they are about to break
  const damageBrightness = cubeType === 'tough' ? 1 - (healthPercentage * 0.4) : 1;


  const faces = [
    { transform: `rotateY(0deg) translateZ(${size / 2}px)`, brightness: 1 }, // front
    { transform: `rotateY(180deg) translateZ(${size / 2}px)`, brightness: 0.7 }, // back
    { transform: `rotateY(90deg) translateZ(${size / 2}px)`, brightness: 0.85 }, // right
    { transform: `rotateY(-90deg) translateZ(${size / 2}px)`, brightness: 0.8 }, // left
    { transform: `rotateX(90deg) translateZ(${size / 2}px)`, brightness: 0.95 }, // top
    { transform: `rotateX(-90deg) translateZ(${size / 2}px)`, brightness: 0.9 }, // bottom
  ];

  return (
    <div
      style={outerStyle}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="cursor-pointer"
    >
      <div style={recoilStyle}>
        <div style={shakeStyle}>
          <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
            {faces.map((face, i) => (
              <div
                key={i}
                className="hover:brightness-125 transition-all duration-100"
                style={{ 
                  ...faceStyle, 
                  transform: face.transform, 
                  filter: `brightness(${face.brightness * toughnessBrightness * damageBrightness})` 
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Cube = React.memo(CubeComponent);