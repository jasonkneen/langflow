import { useState, useCallback, useEffect } from 'react';

declare global {
  interface Window {
    SpeechRecognition?: typeof window.SpeechRecognition;
    webkitSpeechRecognition?: typeof window.SpeechRecognition; // Ensure consistency
  }
}


export const useVoiceCommunication = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError('Speech recognition is not supported in this browser');
      return;
    }

    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = true;

    recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
      const current = event.resultIndex;
      const result = event.results[current][0].transcript;
      setTranscript(result);
    };

    recognitionInstance.onerror = (event: SpeechRecognitionErrorEvent) => {
      setError(event.error);
      setIsRecording(false);
    };

    setRecognition(recognitionInstance);

    return () => {
      if (recognitionInstance) {
        recognitionInstance.abort();
      }
    };
  }, []);

  const startRecording = useCallback(() => {
    if (!recognition) {
      setError('Speech recognition is not initialized');
      return;
    }

    try {
      setError(null);
      setIsRecording(true);
      recognition.start();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start recording');
      setIsRecording(false);
    }
  }, [recognition]);

  const stopRecording = useCallback(() => {
    if (!recognition) {
      return;
    }

    try {
      recognition.stop();
      setIsRecording(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to stop recording');
    }
  }, [recognition]);

  return {
    isRecording,
    error,
    transcript,
    startRecording,
    stopRecording,
  };
};

export default useVoiceCommunication;
