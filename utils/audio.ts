// Base64 encoded audio files
const DIG_SOUND_B64 = "data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YSCSb09PSQA=";
const WIN_SOUND_B64 = "data:audio/wav;base64,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";
const BUTTON_CLICK_SOUND_B64 = "data:audio/wav;base64,UklGRkYAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQIAAABw/38/fw==";
const UNDO_SOUND_B64 = "data:audio/wav;base64,UklGRkgAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABgAZGF0YUEAAAD8/v3+/f79/v39/v38/v37/v36/v35/v34/v33/v32/v31/v30/v3z/v3x/v3w/v3v/v3u/v3t/v3s/v3r/v3q/v3p/v3o/v3n/v3m/v3l/v3k/v3j/v3i/v3h/v3g/v3f/v3e/v3d/v3c/v3b/v3a/v3Z/v3Y/v3X/v3W/v3V/v3U/v3T/v3S/v3R/v3Q/v3P/v3O/v3N/v3M/v3L/v3K/v3J/v3I/v3H/v3G/v3F/v3E/v3D/v3C/v3B/v3A/v3+/v39/v38/v37/v36/v35/v34/v33/v32/v31/v30/v3z/v3x/v3w/v3v/v3u/v3t/v3s/v3r/v3q/v3p/v3o/v3n/v3m/v3l/v3k/v3j/v3i/v3h/v3g/v3f/v3e/v3d/v3c/v3b/v3a/v3Z/v3Y/v3X/v3W/v3V/v3U/v3T/v3S/v3R/v3Q/v3P/v3O/v3N/v3M/v3L/v3K/v3J/v3I/v3H/v3G/v3F/v3E/v3D/v3C/v3B/v3A/v3+/v39/v38/v37/v36/v35/v34/v33/v32/v31/v30/v3z/v3x/v3w/v3v/v3u/v3t/v3s/v3r/v3q/v3p/v3o/v3n/v3m/v3l/v3k/v3j/v3i/v3h/v3g/v3f/v3e/v3d/v3c/v3b/v3a/v3Z/v3Y/v3X/v3W/v3V/v3U/v3T/v3S/v3R/v3Q/v3P/v3O/v3N/v3M/v3L/v3K/v3J/v3I/v3H/v3G/v3F/v3E/v3D/v3C/v3B/v3A=";
const TOUGH_CUBE_HIT_SOUND_B64 = "data:audio/wav;base64,UklGRlIAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQIAAACAgIA=";


let digSound: HTMLAudioElement;
let winSound: HTMLAudioElement;
let buttonClickSound: HTMLAudioElement;
let undoSound: HTMLAudioElement;
let toughCubeHitSound: HTMLAudioElement;

let effectsVolume = 0.5;
let isMuted = false;

export const setMuted = (muted: boolean) => {
    isMuted = muted;
}

export const setEffectsVolume = (volume: number) => {
    effectsVolume = volume;
    if(digSound) digSound.volume = effectsVolume;
    if(winSound) winSound.volume = effectsVolume * 0.5; // Win sound is louder
    if(buttonClickSound) buttonClickSound.volume = effectsVolume;
    if(undoSound) undoSound.volume = effectsVolume;
    if(toughCubeHitSound) toughCubeHitSound.volume = effectsVolume;
}

// Initialize audio elements once
if (typeof window !== 'undefined') {
    digSound = new Audio(DIG_SOUND_B64);
    winSound = new Audio(WIN_SOUND_B64);
    buttonClickSound = new Audio(BUTTON_CLICK_SOUND_B64);
    undoSound = new Audio(UNDO_SOUND_B64);
    toughCubeHitSound = new Audio(TOUGH_CUBE_HIT_SOUND_B64);
    
    // Set initial volumes
    setEffectsVolume(effectsVolume);
}

export const playDigSound = () => {
    if (isMuted) return;
    if (digSound) {
        digSound.currentTime = 0;
        digSound.play().catch(e => console.error("Error playing dig sound:", e));
    }
};

export const playToughCubeHitSound = () => {
    if (isMuted) return;
    if (toughCubeHitSound) {
        toughCubeHitSound.currentTime = 0;
        toughCubeHitSound.play().catch(e => console.error("Error playing tough cube hit sound:", e));
    }
};

export const playWinSound = () => {
    if (isMuted) return;
    if (winSound) {
        winSound.currentTime = 0;
        winSound.play().catch(e => console.error("Error playing win sound:", e));
    }
};

export const playButtonClickSound = () => {
    if (isMuted) return;
    if (buttonClickSound) {
        buttonClickSound.currentTime = 0;
        buttonClickSound.play().catch(e => console.error("Error playing button click sound:", e));
    }
}

export const playUndoSound = () => {
    if (isMuted) return;
    if (undoSound) {
        undoSound.currentTime = 0;
        undoSound.play().catch(e => console.error("Error playing undo sound:", e));
    }
}
