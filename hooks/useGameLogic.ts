
import { useState, useEffect, useCallback, useMemo } from 'react';
import { CubeType, Effect } from '../types';
import { LEVELS } from '../constants';

const useGameLogic = () => {
  const [level, setLevel] = useState(0);
  const [cubes, setCubes] = useState<CubeType[]>([]);
  const [isGameActive, setIsGameActive] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [timer, setTimer] = useState(0);
  const [highScore, setHighScore] = useState<number | null>(null);
  const [effects, setEffects] = useState<Effect[]>([]);

  const currentLevelConfig = useMemo(() => LEVELS[level % LEVELS.length], [level]);

  const initializeLevel = useCallback(() => {
    const { gridSize, toySize, colors, toyColor } = currentLevelConfig;
    const newCubes: CubeType[] = [];
    const center = Math.floor(gridSize / 2);
    const toyStart = center - Math.floor(toySize / 2);
    const toyEnd = center + Math.floor(toySize / 2);

    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        for (let z = 0; z < gridSize; z++) {
          const isToy =
            x >= toyStart && x <= toyEnd &&
            y >= toyStart && y <= toyEnd &&
            z >= toyStart && z <= toyEnd;
          
          newCubes.push({
            id: `${x}-${y}-${z}`,
            x, y, z,
            color: isToy ? toyColor : colors[Math.floor(Math.random() * colors.length)],
            isVisible: true,
            isToy,
          });
        }
      }
    }
    setCubes(newCubes);
    setIsGameActive(true);
    setIsWon(false);
    setTimer(0);
    setEffects([]);
    const savedHighScore = localStorage.getItem(`dig-it-highscore-${level}`);
    setHighScore(savedHighScore ? parseFloat(savedHighScore) : null);
  }, [level, currentLevelConfig]);

  useEffect(() => {
    initializeLevel();
  }, [initializeLevel]);

  useEffect(() => {
    let interval: number | undefined;
    if (isGameActive && !isWon) {
      interval = window.setInterval(() => {
        setTimer((prev) => prev + 0.1);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isGameActive, isWon]);

  const digCube = (id: string) => {
    if (isWon) return;
    
    let dugCube: CubeType | undefined;
    const newCubes = cubes.map((cube) => {
      if (cube.id === id && !cube.isToy && cube.isVisible) {
        dugCube = cube;
        return { ...cube, isVisible: false };
      }
      return cube;
    });

    if (dugCube) {
      setCubes(newCubes);
      setEffects(prev => [...prev, {
        id: `${dugCube.id}-${Date.now()}`,
        type: 'dig',
        x: dugCube.x,
        y: dugCube.y,
        z: dugCube.z,
        color: dugCube.color,
      }]);
    }
  };

  const remainingCubes = useMemo(() => {
    return cubes.filter(c => !c.isToy && c.isVisible).length;
  }, [cubes]);

  useEffect(() => {
    if (remainingCubes === 0 && cubes.length > 0 && !isWon) {
      setIsWon(true);
      setIsGameActive(false);
      if (highScore === null || timer < highScore) {
        setHighScore(timer);
        localStorage.setItem(`dig-it-highscore-${level}`, timer.toString());
      }
      
      const { gridSize, colors, toyColor } = currentLevelConfig;
      const center = Math.floor(gridSize / 2);
      setEffects(prev => [...prev, {
          id: `win-${level}-${Date.now()}`,
          type: 'win',
          x: center,
          y: center,
          z: center,
          colors: [...colors, toyColor],
      }]);
    }
  }, [cubes, remainingCubes, timer, highScore, level, isWon, currentLevelConfig]);
  
  const removeEffect = useCallback((id: string) => {
    setEffects(prev => prev.filter(e => e.id !== id));
  }, []);

  const nextLevel = () => {
    setLevel(prev => prev + 1);
  };

  const resetGame = () => {
    initializeLevel();
  };

  return {
    cubes,
    level: level + 1,
    timer,
    highScore,
    remainingCubes,
    isWon,
    effects,
    digCube,
    nextLevel,
    resetGame,
    currentLevelConfig,
    removeEffect,
  };
};

export default useGameLogic;