import { useState, useCallback } from 'react';

import type { Status, SseMessage, SubscriptionResponse } from '../types';

interface UseSseConnectionProps {
  onMessage: (data: SseMessage) => void;
  onLog: (message: string, type?: 'info' | 'error' | 'success') => void;
}

export const useSseConnection = ({ onMessage, onLog }: UseSseConnectionProps) => {
  const [eventSource, setEventSource] = useState<EventSource | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [status, setStatus] = useState<Status>({ type: 'disconnected', message: 'Disconnected' });

  const updateStatus = useCallback((type: Status['type'], message: string): void => {
    setStatus({ type, message });
  }, []);

  const connect = useCallback(
    async (clientId: string): Promise<void> => {
      if (!clientId.trim()) {
        onLog('Please enter a client ID', 'error');
        return;
      }

      updateStatus('connecting', 'Connecting...');

      try {
        const newEventSource = new EventSource(
          `${import.meta.env.VITE_API_URL as string}/sse/stream/${clientId}`,
        );

        newEventSource.onopen = () => {
          setIsConnected(true);
          updateStatus('connected', 'Connected');
          onLog(`Connected to SSE stream with client ID: ${clientId}`);
        };

        newEventSource.onmessage = (event: MessageEvent) => {
          try {
            const data: SseMessage = JSON.parse(event.data);
            onMessage(data);
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            onLog(`Error parsing message: ${errorMessage}`, 'error');
          }
        };

        newEventSource.onerror = (event: Event) => {
          onLog(`SSE connection error: ${event.type}`, 'error');
          // Close the connection on error
          newEventSource.close();
          setIsConnected(false);
          updateStatus('disconnected', 'Connection error');
        };

        setEventSource(newEventSource);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        onLog(`Failed to connect: ${errorMessage}`, 'error');
        updateStatus('disconnected', 'Connection failed');
      }
    },
    [onMessage, onLog, updateStatus],
  );

  const disconnect = useCallback((): void => {
    if (eventSource) {
      eventSource.close();
      setEventSource(null);
    }

    setIsConnected(false);
    updateStatus('disconnected', 'Disconnected');
    onLog('Disconnected from SSE stream');
  }, [eventSource, updateStatus, onLog]);

  const subscribe = useCallback(
    async (clientId: string, symbols: string[]): Promise<void> => {
      if (!isConnected || symbols.length === 0) {
        onLog('Please select stock symbols to subscribe to', 'error');
        return;
      }

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL as string}/sse/subscribe/${clientId}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ symbols }),
          },
        );

        const result: SubscriptionResponse = await response.json();
        if (result.success) {
          onLog(`Subscribed to: ${symbols.join(', ')}`);
        } else {
          onLog(`Subscription failed: ${result.message ?? 'Unknown error'}`, 'error');
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        onLog(`Subscription error: ${errorMessage}`, 'error');
      }
    },
    [isConnected, onLog],
  );

  const unsubscribe = useCallback(
    async (clientId: string, symbols: string[]): Promise<void> => {
      if (!isConnected || symbols.length === 0) {
        onLog('Please select stock symbols to unsubscribe from', 'error');
        return;
      }

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL as string}/sse/unsubscribe/${clientId}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ symbols }),
          },
        );

        const result: SubscriptionResponse = await response.json();
        if (result.success) {
          onLog(`Unsubscribed from: ${symbols.join(', ')}`);
        } else {
          onLog(`Unsubscription failed: ${result.message ?? 'Unknown error'}`, 'error');
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        onLog(`Unsubscription error: ${errorMessage}`, 'error');
      }
    },
    [isConnected, onLog],
  );

  return {
    isConnected,
    status,
    connect,
    disconnect,
    subscribe,
    unsubscribe,
  };
};
