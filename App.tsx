import React, { useEffect, useState } from 'react';
import GameBoard from './components/GameBoard';
import Header from './components/Header';
import Footer from './components/Footer';
import InfoPanel from './components/InfoPanel';
import useGameLogic from './hooks/useGameLogic';
import { useSettings } from './contexts/SettingsContext';
import Fireworks from './components/Fireworks';
import SettingsModal from './components/SettingsModal';
import LevelSelectModal from './components/LevelSelectModal';
import { LEVELS } from './constants';
import * as AudioPlayer from './utils/audio';
import { GoogleGenAI } from "@google/genai";


export default function App(): React.JSX.Element {
  const { isSettingsOpen } = useSettings();
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
    isPaused,
    togglePause,
    undoLastDig,
    digHistory,
    winStats,
    goToLevel,
  } = useGameLogic();
  
  const [isWinModalOpen, setIsWinModalOpen] = useState(false);
  const [isLevelSelectOpen, setIsLevelSelectOpen] = useState(false);
  const [winModalView, setWinModalView] = useState<'stats' | 'story'>('stats');
  const [storyContent, setStoryContent] = useState('');
  const [isGeneratingStory, setIsGeneratingStory] = useState(false);

  useEffect(() => {
    if (isWon) {
      setIsWinModalOpen(true);
      setWinModalView('stats');
    }
  }, [isWon]);

  const handleNextLevel = () => {
    AudioPlayer.playButtonClickSound();
    nextLevel();
  }

  const handleResetGame = () => {
    AudioPlayer.playButtonClickSound();
    resetGame();
  }

  const handleSelectLevel = (levelIndex: number) => {
    AudioPlayer.playButtonClickSound();
    goToLevel(levelIndex);
    setIsLevelSelectOpen(false);
  }

  const handleCreateStory = async () => {
    AudioPlayer.playButtonClickSound();
    if (!currentLevelConfig.toyShape) return;
    setWinModalView('story');
    setIsGeneratingStory(true);
    setStoryContent('');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      const prompt = `Write a short, whimsical story for a child about a ${currentLevelConfig.toyShape}. The story should be about 100 words and have a happy ending.`;
      const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
      });
      setStoryContent(response.text);
    } catch (error) {
      console.error("Error generating story:", error);
      setStoryContent("Oops! I couldn't think of a story right now. Maybe we can try again later!");
    } finally {
      setIsGeneratingStory(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 items-center justify-between p-4 selection:bg-cyan-500/30 transition-colors duration-300">
      {isSettingsOpen && <SettingsModal />}
      <LevelSelectModal 
        isOpen={isLevelSelectOpen}
        onClose={() => setIsLevelSelectOpen(false)}
        onSelectLevel={handleSelectLevel}
        totalLevels={LEVELS.length}
        currentLevel={level}
      />
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
          isPaused={isPaused}
          togglePause={togglePause}
          undoLastDig={undoLastDig}
          canUndo={digHistory.length > 0 && !isAutoDiscovering && !isWon}
          nextLevel={handleNextLevel}
          resetGame={handleResetGame}
          onLevelSelectClick={() => setIsLevelSelectOpen(true)}
        />
        <div className="relative" id="game-board-container">
            <GameBoard
              cubes={cubes}
              digCube={digCube}
              finalizeDig={finalizeDig}
              effects={effects}
              removeEffect={removeEffect}
              isRecoiling={isRecoiling}
              toyShape={currentLevelConfig.toyShape}
              isPaused={isPaused}
            />
             {isPaused && (
              <div className="absolute inset-0 bg-black/50 z-40 flex items-center justify-center rounded-2xl">
                <h2 className="text-6xl font-bold text-white animate-pulse">Paused</h2>
              </div>
            )}
        </div>
        {isWon && (
          <>
            <Fireworks />
            {isWinModalOpen && (
              <div className="absolute bottom-1/2 translate-y-1/2 left-1/2 -translate-x-1/2 z-50 w-full max-w-md">
                  <div className="bg-gray-800/70 dark:bg-gray-900/80 backdrop-blur-lg rounded-2xl shadow-2xl p-6 text-white relative min-h-[300px]">
                    <button
                        onClick={() => setIsWinModalOpen(false)}
                        className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors"
                        aria-label="Close win screen"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    
                    {winModalView === 'stats' && (
                      <>
                        <h2 className="text-4xl font-bold text-yellow-400 animate-pulse">You found the toy!</h2>
                        <div className="grid grid-cols-2 gap-4 my-4 text-left">
                          <div className="bg-white/10 p-3 rounded-lg">
                              <p className="text-sm text-gray-300">Time</p>
                              <p className="text-2xl font-bold">{timer.toFixed(1)}s</p>
                          </div>
                          <div className="bg-white/10 p-3 rounded-lg">
                              <p className="text-sm text-gray-300">Best Time</p>
                              <p className="text-2xl font-bold">{highScore ? highScore.toFixed(1) + 's' : '-'}</p>
                          </div>
                          <div className="bg-white/10 p-3 rounded-lg">
                              <p className="text-sm text-gray-300">Cubes Dug</p>
                              <p className="text-2xl font-bold">{winStats.digs}</p>
                          </div>
                          <div className="bg-white/10 p-3 rounded-lg">
                              <p className="text-sm text-gray-300">Efficiency</p>
                              <p className="text-2xl font-bold">{winStats.efficiency.toFixed(0)}%</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap justify-center gap-4 mt-6">
                          <button onClick={handleNextLevel} className="px-5 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg shadow-lg transition-transform transform hover:scale-105">Next Level</button>
                          <button onClick={handleResetGame} className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg shadow-lg transition-transform transform hover:scale-105">Play Again</button>
                           <button onClick={handleCreateStory} className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg shadow-lg transition-transform transform hover:scale-105">Create Story</button>
                        </div>
                      </>
                    )}
                    
                    {winModalView === 'story' && (
                      <div>
                        <h3 className="text-3xl font-bold text-cyan-400 mb-4">A story about a {currentLevelConfig.toyShape}</h3>
                        {isGeneratingStory ? (
                          <div className="flex items-center justify-center h-32">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                          </div>
                        ) : (
                          <p className="text-left whitespace-pre-wrap bg-white/5 p-4 rounded-lg h-40 overflow-y-auto">{storyContent}</p>
                        )}
                        <div className="flex justify-center mt-6">
                           <button onClick={() => setWinModalView('stats')} className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-lg shadow-lg transition-transform transform hover:scale-105">Back to Stats</button>
                        </div>
                      </div>
                    )}

                  </div>
              </div>
            )}
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
}