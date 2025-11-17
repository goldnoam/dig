

import { LevelConfig } from './types';

export const LEVELS: LevelConfig[] = [
  {
    gridSize: 5,
    toySize: 1,
    colors: ['#ef4444', '#f97316', '#eab308', '#84cc16', '#22c55e', '#14b8a6'],
    toyColor: '#3b82f6', // blue
    toyShape: '⚽️',
  },
  {
    gridSize: 5,
    toySize: 1,
    colors: ['#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899', '#f43f5e'],
    toyColor: '#10b981', // emerald
    toyShape: '🦖',
  },
  {
    gridSize: 7,
    toySize: 1,
    colors: ['#fde047', '#fef08a', '#fef9c3', '#fafafa', '#e5e5e5', '#d4d4d4'],
    toyColor: '#18181b', // zinc-900
    toyShape: '🚲',
    toughCubeChance: 0.1, // 10% chance
  },
   {
    gridSize: 7,
    toySize: 3,
    colors: ['#030712', '#1f2937', '#4b5563', '#9ca3af', '#e5e7eb', '#f9fafb'],
    toyColor: '#e11d48', // rose-600
    toyShape: '💻',
    toughCubeChance: 0.15, // 15% chance
  },
  {
    gridSize: 7,
    toySize: 1,
    colors: ['#fecaca', '#fca5a5', '#f87171', '#ef4444', '#dc2626', '#b91c1c'],
    toyColor: '#f0abfc', // fuchsia-300
    toyShape: '🎎',
    toughCubeChance: 0.2, // 20% chance
  },
  {
    gridSize: 7,
    toySize: 1,
    colors: ['#a78bfa', '#8b5cf6', '#7c3aed', '#6d28d9', '#5b21b6', '#4c1d95'],
    toyColor: '#fdba74', // orange-300
    toyShape: '🚗',
    toughCubeChance: 0.2,
  },
  {
    gridSize: 9,
    toySize: 1,
    colors: ['#d1d5db', '#9ca3af', '#6b7280', '#4b5563', '#374151', '#1f2937'],
    toyColor: '#2dd4bf', // teal-400
    toyShape: '🎧',
    toughCubeChance: 0.25, // 25% chance
  }
];
