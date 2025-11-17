import React from 'react';

interface TutorialGuideProps {
  step: number;
  onNext: () => void;
  onClose: () => void;
}

const TutorialGuide: React.FC<TutorialGuideProps> = ({ step, onNext, onClose }) => {
  let content;
  let style: React.CSSProperties = {};

  const baseStyle: React.CSSProperties = {
    position: 'absolute',
    background: 'rgba(255, 255, 255, 0.9)',
    color: '#1f2937',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
    zIndex: 101,
    maxWidth: '300px',
    textAlign: 'center',
    transform: 'translate(-50%, -50%)',
  };
  
  const backdropStyle: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    zIndex: 100,
  };

  switch (step) {
    case 1:
      style = { ...baseStyle, top: '30%', left: '50%', transform: 'translate(-50%, -50%)' };
      content = (
        <>
          <h3 className="text-xl font-bold mb-2">Welcome to Dig It!</h3>
          <p>The goal is simple: dig through all the cubes to find the hidden toy at the center.</p>
        </>
      );
      break;
    case 2:
      style = { ...baseStyle, top: '50%', left: '25%', transform: 'translate(-50%, -50%)' };
       content = (
        <>
          <h3 className="text-xl font-bold mb-2">Dig Cubes</h3>
          <p>Click on any of the outer cubes to break them apart and clear a path to the toy.</p>
        </>
      );
      break;
    case 3:
      style = { ...baseStyle, top: '75%', left: '50%', transform: 'translate(-50%, -50%)' };
      content = (
        <>
          <h3 className="text-xl font-bold mb-2">Rotate the View</h3>
          <p>Click and drag the block of cubes to rotate it and find the best angle to dig from.</p>
        </>
      );
      break;
    case 4:
       style = { ...baseStyle, top: '30%', left: '50%', transform: 'translate(-50%, -50%)' };
       content = (
        <>
          <h3 className="text-xl font-bold mb-2">You're All Set!</h3>
          <p>Keep an eye on your time and have fun digging!</p>
        </>
      );
      break;
    default:
      return null;
  }
  
  const isLastStep = step === 4;

  return (
    <div style={backdropStyle}>
        <div style={style}>
            {content}
            <button
                onClick={isLastStep ? onClose : onNext}
                className="mt-4 px-6 py-2 bg-cyan-500 text-white font-bold rounded-lg shadow-lg hover:bg-cyan-600 transition-colors"
            >
               {isLastStep ? "Let's Go!" : 'Next'}
            </button>
        </div>
    </div>
  );
};

export default TutorialGuide;
