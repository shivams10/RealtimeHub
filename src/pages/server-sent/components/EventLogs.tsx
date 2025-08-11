import type { LogEntry } from '../types';
import type { FC, RefObject } from 'react';

interface EventLogsProps {
  logs: LogEntry[];
  logsRef: RefObject<HTMLDivElement>;
}

export const EventLogs: FC<EventLogsProps> = ({ logs, logsRef }) => {
  const getLogColor = (type: LogEntry['type']): string => {
    switch (type) {
      case 'error':
        return '#ef4444';
      case 'success':
        return '#10b981';
      default:
        return '#f3f4f6';
    }
  };

  return (
    <div>
      <h3 className='text-2xl font-bold text-gray-800 mb-4'>Event Logs</h3>
      <div
        className='bg-gray-800 text-gray-100 p-5 rounded-lg max-h-[300px] overflow-y-auto font-mono text-sm'
        ref={logsRef}
      >
        {logs.map((log, index) => (
          <div key={index} className='flex gap-3 mb-2'>
            <div className='text-gray-400 min-w-[80px]'>[{log.timestamp}]</div>
            <div className='flex-1' style={{ color: getLogColor(log.type) }}>
              {log.message}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
