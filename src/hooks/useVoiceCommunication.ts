import { useState, useCallback } from 'react';

interface VoiceCommunicationHook {
  isListening: boolean;
  startListening: () => void;
  stopListening: () => void;
  transcript: string;
}

export const useVoiceCommunication = (): VoiceCommunicationHook => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  const startListening = useCallback(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = true;
      recognition.interimResults = true;
      
      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event) => {
        const current = event.resultIndex;
        const transcriptText = event.results[current][0].transcript;
        setTranscript(transcriptText);
      };

      recognition.start();
    }
  }, []);

  const stopListening = useCallback(() => {
    setIsListening(false);
    // Clean up recognition if needed
  }, []);

  return {
    isListening,
    startListening, 
    stopListening,
    transcript
  };
};
