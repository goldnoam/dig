import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { CubeType, Effect } from '../types';
import { LEVELS } from '../constants';
import * as AudioPlayer from '../utils/audio';

const CRUMBLE_ANIMATION_DURATION = 300; // ms

const useGameLogic = () => {
  const [level, setLevel] = useState(0);
  const [cubes, setCubes] = useState<CubeType[]>([]);
  const [isGameActive, setIsGameActive] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [timer, setTimer] = useState(0);
  const [highScore, setHighScore] = useState<number | null>(null);
  const [effects, setEffects] = useState<Effect[]>([]);
  const [isRecoiling, setIsRecoiling] = useState(false);
  const [isAutoDiscovering, setIsAutoDiscovering] = useState(false);
  const hasInteracted = useRef(false);

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
    setIsAutoDiscovering(false);
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
  
  const finalizeDig = useCallback((id: string) => {
     setCubes(currentCubes => currentCubes.map(c => c.id === id ? { ...c, isVisible: false, isDying: false } : c));
  }, []);

  const digCube = (id: string) => {
    if (isWon || isAutoDiscovering) return;

    if (!hasInteracted.current) {
      AudioPlayer.playBackgroundMusic();
      hasInteracted.current = true;
    }
    
    let dugCube: CubeType | undefined;
    const newCubes = cubes.map((cube) => {
      if (cube.id === id && !cube.isToy && cube.isVisible && !cube.isDying) {
        dugCube = { ...cube, isDying: true };
        return { ...cube, isDying: true };
      }
      return cube;
    });

    if (dugCube) {
      setCubes(newCubes);
      AudioPlayer.playDigSound();
      setEffects(prev => [...prev, {
        id: `${dugCube.id}-${Date.now()}`,
        type: 'dig',
        x: dugCube.x,
        y: dugCube.y,
        z: dugCube.z,
        color: dugCube.color,
      }]);

      setIsRecoiling(true);
      setTimeout(() => setIsRecoiling(false), 150);

      setTimeout(() => finalizeDig(id), CRUMBLE_ANIMATION_DURATION);
    }
  };
  
  const autoDiscover = () => {
    if (isAutoDiscovering || isWon) return;

    if (!hasInteracted.current) {
      AudioPlayer.playBackgroundMusic();
      hasInteracted.current = true;
    }

    setIsAutoDiscovering(true);
    const cubesToDig = cubes.filter(c => !c.isToy && c.isVisible);
    
    let i = 0;
    const interval = setInterval(() => {
        if (i < cubesToDig.length) {
            const cube = cubesToDig[i];
            
            // Re-map to the latest cubes state to avoid stale closures
            setCubes(currentCubes => currentCubes.map(c => c.id === cube.id ? { ...c, isDying: true } : c));

            AudioPlayer.playDigSound();
            setEffects(prev => [...prev, {
                id: `${cube.id}-${Date.now()}`, type: 'dig',
                x: cube.x, y: cube.y, z: cube.z, color: cube.color,
            }]);
            setTimeout(() => finalizeDig(cube.id), CRUMBLE_ANIMATION_DURATION);
            i++;
        } else {
            clearInterval(interval);
            // The win condition useEffect will handle the rest
        }
    }, 30);
  };


  const remainingCubes = useMemo(() => {
    return cubes.filter(c => !c.isToy && c.isVisible).length;
  }, [cubes]);

  useEffect(() => {
    if (remainingCubes === 0 && cubes.length > 0 && !isWon && isGameActive) {
      setIsWon(true);
      setIsGameActive(false);
      setIsAutoDiscovering(false);
      AudioPlayer.playWinSound();

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
  }, [cubes, remainingCubes, timer, highScore, level, isWon, currentLevelConfig, isGameActive]);
  
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
    isRecoiling,
    isAutoDiscovering,
    effects,
    digCube,
    finalizeDig,
    nextLevel,
    resetGame,
    currentLevelConfig,
    removeEffect,
    autoDiscover,
  };
};

export default useGameLogic;