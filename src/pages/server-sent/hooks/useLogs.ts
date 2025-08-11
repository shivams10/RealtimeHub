import { useState, useCallback, useEffect, useRef } from 'react';

import type { LogEntry } from '../types';

export const useLogs = () => {
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      timestamp: 'System',
      message: 'SSE POC Client initialized. Click "Connect" to start receiving real-time updates.',
      type: 'info',
    },
  ]);

  const logsRef = useRef<HTMLDivElement>(null);

  const addLog = useCallback((message: string, type: LogEntry['type'] = 'info'): void => {
    const timestamp = new Date().toLocaleTimeString();
    const newLog: LogEntry = { timestamp, message, type };
    setLogs(prevLogs => {
      const updatedLogs = [...prevLogs, newLog];
      // Keep only last 50 log entries
      return updatedLogs.slice(-50);
    });
  }, []);

  const scrollLogsToBottom = useCallback((): void => {
    if (logsRef.current) {
      logsRef.current.scrollTop = logsRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollLogsToBottom();
  }, [logs, scrollLogsToBottom]);

  return {
    logs,
    logsRef,
    addLog,
  };
};
