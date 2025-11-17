
import React from 'react';
import GameBoard from './components/GameBoard';
import Header from './components/Header';
import Footer from './components/Footer';
import InfoPanel from './components/InfoPanel';
import useGameLogic from './hooks/useGameLogic';

export default function App(): React.JSX.Element {
  const {
    cubes,
    level,
    timer,
    highScore,
    remainingCubes,
    isWon,
    effects,
    digCube,
    nextLevel,
    resetGame,
    removeEffect,
  } = useGameLogic();

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-900 text-gray-100 items-center justify-between p-4 selection:bg-cyan-500/30">
      <Header />
      
      <main className="flex flex-col items-center justify-center flex-grow w-full relative">
        <InfoPanel
          level={level}
          timer={timer}
          highScore={highScore}
          remainingCubes={remainingCubes}
        />
        <GameBoard
          cubes={cubes}
          digCube={digCube}
          effects={effects}
          removeEffect={removeEffect}
        />
        {isWon && (
          <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-50 backdrop-blur-sm">
            <h2 className="text-5xl font-bold text-yellow-400 animate-pulse">You found the toy!</h2>
            <p className="text-xl mt-4">Your time: {timer.toFixed(1)}s</p>
            <div className="flex space-x-4 mt-8">
              <button
                onClick={nextLevel}
                className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg shadow-lg transition-transform transform hover:scale-105"
              >
                Next Level
              </button>
               <button
                onClick={resetGame}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg shadow-lg transition-transform transform hover:scale-105"
              >
                Play Again
              </button>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}