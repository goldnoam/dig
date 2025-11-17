import React, { useEffect } from 'react';
import GameBoard from './components/GameBoard';
import Header from './components/Header';
import Footer from './components/Footer';
import InfoPanel from './components/InfoPanel';
import useGameLogic from './hooks/useGameLogic';
import { useTheme } from './contexts/ThemeContext';
import Fireworks from './components/Fireworks';

export default function App(): React.JSX.Element {
  const { theme } = useTheme();
  const {
    cubes,
    level,
    timer,
    highScore,
    remainingCubes,
    isWon,
    isRecoiling,
    isAutoDiscovering,
    effects,
    digCube,
    finalizeDig,
    nextLevel,
    resetGame,
    removeEffect,
    autoDiscover,
    currentLevelConfig,
  } = useGameLogic();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 items-center justify-between p-4 selection:bg-cyan-500/30 transition-colors duration-300">
      <Header />
      
      <main className="flex flex-col items-center justify-center flex-grow w-full relative">
        <InfoPanel
          level={level}
          timer={timer}
          highScore={highScore}
          remainingCubes={remainingCubes}
          autoDiscover={autoDiscover}
          isAutoDiscovering={isAutoDiscovering}
          isGameWon={isWon}
        />
        <GameBoard
          cubes={cubes}
          digCube={digCube}
          finalizeDig={finalizeDig}
          effects={effects}
          removeEffect={removeEffect}
          isRecoiling={isRecoiling}
          toyShape={currentLevelConfig.toyShape}
        />
        {isWon && (
          <>
            <Fireworks />
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 w-full max-w-md">
                <div className="bg-gray-800/80 dark:bg-gray-900/90 backdrop-blur-md rounded-2xl shadow-2xl p-6 text-center text-white">
                  <h2 className="text-4xl font-bold text-yellow-400 animate-pulse">You found the toy!</h2>
                  <p className="text-lg mt-2">Your time: {timer.toFixed(1)}s</p>
                  <div className="flex justify-center space-x-4 mt-6">
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
            </div>
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
