import React from 'react';

const FIREWORK_COUNT = 15;
const PARTICLE_COUNT = 30;

const Firework: React.FC<{ delay: number }> = ({ delay }) => {
  const colors = ['#ff4500', '#ff8c00', '#ffd700', '#adff2f', '#00ff00', '#00ced1', '#1e90ff', '#c71585'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const xEnd = `${Math.random() * 100}vw`;
  const yEnd = `${Math.random() * 50 + 10}vh`;

  const rocketStyle: React.CSSProperties = {
    position: 'fixed',
    left: `${Math.random() * 80 + 10}vw`,
    width: '3px',
    height: '3px',
    borderRadius: '50%',
    backgroundColor: 'white',
    animation: `firework-rocket 1s ease-in ${delay}s forwards`,
    '--y-end': yEnd,
  };

  return (
    <div>
      <div style={rocketStyle} />
      <div style={{ position: 'fixed', left: xEnd, top: yEnd, opacity: 0, animation: `1s linear ${delay + 1}s forwards` }}>
        {Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
          const angle = (i / PARTICLE_COUNT) * 360;
          const distance = Math.random() * 80 + 20;
          const particleStyle: React.CSSProperties = {
            position: 'absolute',
            width: '3px',
            height: '3px',
            backgroundColor: color,
            borderRadius: '50%',
            opacity: 0,
            animation: `firework-particle 0.8s ease-out ${delay + 1}s forwards`,
            '--x-end': `${Math.cos(angle * Math.PI / 180) * distance}px`,
            '--y-end': `${Math.sin(angle * Math.PI / 180) * distance}px`,
          };
          return <div key={i} style={particleStyle} />;
        })}
      </div>
    </div>
  );
};


const Fireworks: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {Array.from({ length: FIREWORK_COUNT }).map((_, i) => (
        <Firework key={i} delay={i * 0.2 + Math.random() * 0.3} />
      ))}
    </div>
  );
};

export default React.memo(Fireworks);