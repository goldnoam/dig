export interface CubeType {
  id: string;
  x: number;
  y: number;
  z: number;
  color: string;
  isVisible: boolean;
  isToy: boolean;
  isDying?: boolean;
  cubeType: 'normal' | 'tough';
  health: number;
  maxHealth: number;
}

export interface LevelConfig {
  gridSize: number;
  toySize: number;
  colors: string[];
  toyColor: string;
  toyShape: string;
  toughCubeChance?: number;
}

export interface Effect {
  id: string;
  type: 'dig' | 'win';
  x: number;
  y: number;
  z: number;
  color?: string;
  colors?: string[];
}

export interface DigAction {
  cubeId: string;
  previousHealth: number;
}

export interface WinStats {
  digs: number;
  efficiency: number;
}
