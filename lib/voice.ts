export const voice = {
  speak: (text: string, rate: number = 1) => {
    if (typeof window === 'undefined') return;
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.pitch = 1;
    utterance.volume = 1;
    
    // Try to use a natural voice
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      utterance.voice = voices[0];
    }
    
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  },

  stop: () => {
    if (typeof window === 'undefined') return;
    window.speechSynthesis.cancel();
  },
};
