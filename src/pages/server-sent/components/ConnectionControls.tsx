import type { Status } from '../types';
import type { FC } from 'react';

interface ConnectionControlsProps {
  clientId: string;
  onClientIdChange: (clientId: string) => void;
  selectedSymbols: string[];
  onSymbolsChange: (symbols: string[]) => void;
  isConnected: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
  onSubscribe: () => void;
  onUnsubscribe: () => void;
  status: Status;
}

const STOCK_SYMBOLS_OPTIONS = ['AAPL', 'GOOGL', 'MSFT'];

const getStatusStyles = (type: Status['type']): string => {
  switch (type) {
    case 'connected':
      return 'bg-green-100 text-green-800 border border-green-200';
    case 'disconnected':
      return 'bg-red-100 text-red-800 border border-red-200';
    case 'connecting':
      return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
    default:
      return 'bg-gray-100 text-gray-800 border border-gray-200';
  }
};

export const ConnectionControls: FC<ConnectionControlsProps> = ({
  clientId,
  onClientIdChange,
  selectedSymbols,
  onSymbolsChange,
  isConnected,
  onConnect,
  onDisconnect,
  onSubscribe,
  onUnsubscribe,
  status,
}) => {
  const handleSymbolChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value);
    onSymbolsChange(selectedOptions);
  };

  return (
    <div className='p-8 bg-gray-50 border-b border-gray-200'>
      <div className='flex flex-col gap-5'>
        <div className='flex flex-wrap items-center gap-4'>
          <label htmlFor='clientId' className='font-semibold text-gray-700 min-w-[120px]'>
            Client ID:
          </label>
          <input
            type='text'
            id='clientId'
            placeholder='Enter client ID'
            value={clientId}
            onChange={e => onClientIdChange(e.target.value)}
            className='flex-1 min-w-[200px] px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-base'
          />
        </div>

        <div className='flex flex-wrap items-center gap-4'>
          <label htmlFor='stockSymbols' className='font-semibold text-gray-700 min-w-[120px]'>
            Stock Symbols:
          </label>
          <select
            id='stockSymbols'
            multiple
            value={selectedSymbols}
            onChange={handleSymbolChange}
            className='flex-1 min-w-[200px] px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-base'
          >
            {STOCK_SYMBOLS_OPTIONS.map(symbol => (
              <option key={symbol} value={symbol}>
                {symbol}
              </option>
            ))}
          </select>
        </div>

        <div className='flex flex-wrap gap-4'>
          <button
            className='px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg uppercase tracking-wide hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none'
            onClick={onConnect}
            disabled={isConnected}
          >
            Connect
          </button>
          <button
            className='px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg uppercase tracking-wide hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none'
            onClick={onDisconnect}
            disabled={!isConnected}
          >
            Disconnect
          </button>
          <button
            className='px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg uppercase tracking-wide hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none'
            onClick={onSubscribe}
            disabled={!isConnected}
          >
            Subscribe
          </button>
          <button
            className='px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg uppercase tracking-wide hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none'
            onClick={onUnsubscribe}
            disabled={!isConnected}
          >
            Unsubscribe
          </button>
        </div>

        <div className={`p-4 rounded-lg font-semibold ${getStatusStyles(status.type)}`}>
          Status: {status.message}
        </div>
      </div>
    </div>
  );
};
