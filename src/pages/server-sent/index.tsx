import { useState, useCallback } from 'react';

import { ConnectionControls } from './components/ConnectionControls';
import { EventLogs } from './components/EventLogs';
import { StockGrid } from './components/StockGrid';
import { useSseConnection, useStockData, useLogs } from './hooks';

import type { SseMessage } from './types';

const SsePocClient = () => {
  // State management
  const [clientId, setClientId] = useState('poc-client-001');
  const [selectedSymbols, setSelectedSymbols] = useState<string[]>([]);

  // Custom hooks
  const { logs, logsRef, addLog } = useLogs();
  const { handleMessage, getStockDataArray } = useStockData();

  // Handle connection establishment messages
  const handleConnectionMessage = useCallback(
    (data: SseMessage) => {
      if (data.type === 'connection_established') {
        addLog(`Connection established for client: ${data.clientId ?? 'unknown'}`);
      }
    },
    [addLog],
  );

  // Enhanced message handler
  const handleEnhancedMessage = useCallback(
    (data: SseMessage) => {
      handleMessage(data);
      handleConnectionMessage(data);
    },
    [handleMessage, handleConnectionMessage],
  );

  // SSE connection with enhanced message handling
  const {
    isConnected: isConnectedEnhanced,
    status: statusEnhanced,
    connect: connectToSseEnhanced,
    disconnect: disconnectFromSseEnhanced,
    subscribe: subscribeToSymbolsEnhanced,
    unsubscribe: unsubscribeFromSymbolsEnhanced,
  } = useSseConnection({
    onMessage: handleEnhancedMessage,
    onLog: addLog,
  });

  // Event handlers
  const handleConnect = useCallback(() => {
    connectToSseEnhanced(clientId).catch((error: Error) => {
      addLog(`Connection failed: ${error.message}`);
    });
  }, [connectToSseEnhanced, clientId, addLog]);

  const handleDisconnect = useCallback(() => {
    disconnectFromSseEnhanced();
  }, [disconnectFromSseEnhanced]);

  const handleSubscribe = useCallback(() => {
    subscribeToSymbolsEnhanced(clientId, selectedSymbols).catch((error: Error) => {
      addLog(`Subscription failed: ${error.message}`);
    });
  }, [subscribeToSymbolsEnhanced, clientId, selectedSymbols, addLog]);

  const handleUnsubscribe = useCallback(() => {
    unsubscribeFromSymbolsEnhanced(clientId, selectedSymbols).catch((error: Error) => {
      addLog(`Unsubscription failed: ${error.message}`);
    });
  }, [unsubscribeFromSymbolsEnhanced, clientId, selectedSymbols, addLog]);

  const handleClientIdChange = useCallback((newClientId: string) => {
    setClientId(newClientId);
  }, []);

  const handleSymbolsChange = useCallback((newSymbols: string[]) => {
    setSelectedSymbols(newSymbols);
  }, []);

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-5'>
      <div className='max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden'>
        {/* Header */}
        <div className='bg-gradient-to-r from-gray-800 to-gray-700 text-white p-8 text-center'>
          <h1 className='text-4xl font-bold mb-3'>SSE POC Client</h1>
          <p className='text-lg opacity-90'>
            Real-time data streaming with subscription management
          </p>
        </div>

        {/* Connection Controls */}
        <ConnectionControls
          clientId={clientId}
          onClientIdChange={handleClientIdChange}
          selectedSymbols={selectedSymbols}
          onSymbolsChange={handleSymbolsChange}
          isConnected={isConnectedEnhanced}
          onConnect={handleConnect}
          onDisconnect={handleDisconnect}
          onSubscribe={handleSubscribe}
          onUnsubscribe={handleUnsubscribe}
          status={statusEnhanced}
        />

        {/* Content */}
        <div className='p-8'>
          <StockGrid stocks={getStockDataArray()} />
          <EventLogs logs={logs} logsRef={logsRef} />
        </div>
      </div>
    </div>
  );
};

export default SsePocClient;
