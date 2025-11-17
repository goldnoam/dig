import { useState, useEffect } from 'react';

const TUTORIAL_STORAGE_KEY = 'dig-it-tutorial-completed';

const useTutorial = (level: number) => {
  const [step, setStep] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const hasCompletedTutorial = localStorage.getItem(TUTORIAL_STORAGE_KEY);
    if (level === 1 && !hasCompletedTutorial) {
      setIsActive(true);
      setStep(1);
    } else {
      setIsActive(false);
    }
  }, [level]);

  const nextStep = () => {
    setStep(prev => prev + 1);
  };

  const closeTutorial = () => {
    setIsActive(false);
    localStorage.setItem(TUTORIAL_STORAGE_KEY, 'true');
  };

  return {
    isTutorialActive: isActive,
    tutorialStep: step,
    nextStep,
    closeTutorial,
  };
};

export default useTutorial;
