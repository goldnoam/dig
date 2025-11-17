import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import * as AudioPlayer from '../utils/audio';

interface SettingsContextType {
  isSettingsOpen: boolean;
  toggleSettings: () => void;
  isMuted: boolean;
  toggleMute: () => void;
  effectsVolume: number;
  setEffectsVolume: (volume: number) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem('dig-it-muted');
    return saved ? JSON.parse(saved) : false;
  });
  const [effectsVolume, setEffectsVolumeState] = useState<number>(() => {
    if (typeof window === 'undefined') return 0.5;
    const saved = localStorage.getItem('dig-it-effects-volume');
    return saved ? parseFloat(saved) : 0.5;
  });

  useEffect(() => {
    localStorage.setItem('dig-it-muted', JSON.stringify(isMuted));
    AudioPlayer.setMuted(isMuted);
  }, [isMuted]);

  useEffect(() => {
    localStorage.setItem('dig-it-effects-volume', String(effectsVolume));
    AudioPlayer.setEffectsVolume(effectsVolume);
  }, [effectsVolume]);
  
  // Set initial audio settings on load
  useEffect(() => {
    AudioPlayer.setMuted(isMuted);
    AudioPlayer.setEffectsVolume(effectsVolume);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleSettings = () => {
    setIsSettingsOpen(prev => !prev);
    if(!isSettingsOpen) { // Play sound on open only
        AudioPlayer.playButtonClickSound();
    }
  };
  
  const toggleMute = () => {
    setIsMuted(prev => !prev);
    AudioPlayer.playButtonClickSound();
  }

  const setEffectsVolume = (volume: number) => {
    setEffectsVolumeState(volume);
  };


  return (
    <SettingsContext.Provider value={{ isSettingsOpen, toggleSettings, isMuted, toggleMute, effectsVolume, setEffectsVolume }}>
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