
import React from 'react';
import { CubeType } from '../types';

interface CubeProps {
  cube: CubeType;
  size: number;
  gridCenter: number;
  digCube: (id: string) => void;
}

const CubeComponent: React.FC<CubeProps> = ({ cube, size, gridCenter, digCube }) => {
  const { x, y, z, color, isVisible, isToy, id } = cube;

  if (!isVisible) {
    return null;
  }

  const posX = (x - gridCenter) * size;
  const posY = (y - gridCenter) * size;
  const posZ = (z - gridCenter) * size;

  const style: React.CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    position: 'absolute',
    transform: `translate3d(${posX}px, ${posY}px, ${posZ}px)`,
    transformStyle: 'preserve-3d',
  };

  const handleClick = () => {
    if (!isToy) {
      digCube(id);
    }
  };

  // The toy is a special, glowing sphere
  if (isToy) {
    const toySize = size * 1.2;
    return (
      <div style={style}>
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
          }}
          className="animate-pulse"
        />
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
      style={style}
      onClick={handleClick}
      className="cursor-pointer group"
    >
      <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
        {faces.map((face, i) => (
          <div
            key={i}
            className="group-hover:brightness-125 transition-all duration-100"
            style={{ ...faceStyle, transform: face.transform, filter: `brightness(${face.brightness})` }}
          />
        ))}
      </div>
    </div>
  );
};

export const Cube = React.memo(CubeComponent);