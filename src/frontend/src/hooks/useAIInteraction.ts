import { useState, useCallback } from 'react';

interface AIInteractionOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export const useAIInteraction = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const interactWithAI = useCallback(async (
    prompt: string,
    options: AIInteractionOptions = {}
  ) => {
    setIsProcessing(true);
    setError(null);

    try {
      // Here you would implement your actual AI interaction logic
      // This is a placeholder for the API call
      const response = await fetch('/api/ai/interact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          ...options
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to interact with AI');
      }

      const data = await response.json();
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  return {
    interactWithAI,
    isProcessing,
    error,
  };
};

export default useAIInteraction;
