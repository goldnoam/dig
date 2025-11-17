import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import * as AudioPlayer from '../utils/audio';

interface SettingsContextType {
  isSettingsOpen: boolean;
  toggleSettings: () => void;
  musicVolume: number;
  setMusicVolume: (volume: number) => void;
  effectsVolume: number;
  setEffectsVolume: (volume: number) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [musicVolume, setMusicVolumeState] = useState<number>(() => {
    if (typeof window === 'undefined') return 0;
    const saved = localStorage.getItem('dig-it-music-volume');
    return saved ? parseFloat(saved) : 0;
  });
  const [effectsVolume, setEffectsVolumeState] = useState<number>(() => {
    if (typeof window === 'undefined') return 0;
    const saved = localStorage.getItem('dig-it-effects-volume');
    return saved ? parseFloat(saved) : 0;
  });

  useEffect(() => {
    localStorage.setItem('dig-it-music-volume', String(musicVolume));
    AudioPlayer.setMusicVolume(musicVolume);
  }, [musicVolume]);

  useEffect(() => {
    localStorage.setItem('dig-it-effects-volume', String(effectsVolume));
    AudioPlayer.setEffectsVolume(effectsVolume);
  }, [effectsVolume]);
  
  // Set initial volume on load
  useEffect(() => {
    AudioPlayer.setMusicVolume(musicVolume);
    AudioPlayer.setEffectsVolume(effectsVolume);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleSettings = () => {
    setIsSettingsOpen(prev => !prev);
    if(!isSettingsOpen) { // Play sound on open only
        AudioPlayer.playButtonClickSound();
    }
  };
  
  const setMusicVolume = (volume: number) => {
    setMusicVolumeState(volume);
  };

  const setEffectsVolume = (volume: number) => {
    setEffectsVolumeState(volume);
  };


  return (
    <SettingsContext.Provider value={{ isSettingsOpen, toggleSettings, musicVolume, setMusicVolume, effectsVolume, setEffectsVolume }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};