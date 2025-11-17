
export interface CubeType {
  id: string;
  x: number;
  y: number;
  z: number;
  color: string;
  isVisible: boolean;
  isToy: boolean;
}

export interface LevelConfig {
  gridSize: number;
  toySize: number;
  colors: string[];
  toyColor: string;
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
