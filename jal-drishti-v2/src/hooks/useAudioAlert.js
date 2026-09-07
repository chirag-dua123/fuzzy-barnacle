import { useState, useCallback } from 'react';

export function useAudioAlert() {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Play synthesized two-tone emergency alarm using Web Audio API
  const playSiren = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      gain.gain.setValueAtTime(0.15, ctx.currentTime);

      // Modulate frequency between 520Hz and 880Hz (standard disaster tone)
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.linearRampToValueAtTime(880, now + 0.4);
      osc.frequency.linearRampToValueAtTime(520, now + 0.8);
      osc.frequency.linearRampToValueAtTime(880, now + 1.2);
      osc.frequency.linearRampToValueAtTime(520, now + 1.6);
      osc.frequency.linearRampToValueAtTime(400, now + 2.0);

      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 2.2);

      setIsPlayingAudio(true);
      setTimeout(() => setIsPlayingAudio(false), 2200);
    } catch (err) {
      console.warn("Audio siren unavailable in this browser environment:", err);
    }
  }, []);

  // Text to Speech announcement in native Indian languages or English
  const speakAlert = useCallback((text, langCode = 'en') => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const langMap = {
      en: 'en-IN',
      hi: 'hi-IN',
      bn: 'bn-IN',
      ml: 'ml-IN',
      as: 'as-IN'
    };
    utterance.lang = langMap[langCode] || 'en-IN';
    utterance.rate = 0.95;
    utterance.pitch = 1.05;

    window.speechSynthesis.speak(utterance);
  }, []);

  return { playSiren, speakAlert, isPlayingAudio };
}
