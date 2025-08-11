import { useState, useCallback } from 'react';

import type { StockData, SseMessage } from '../types';

export const useStockData = () => {
  const [stockData, setStockData] = useState<Map<string, StockData>>(new Map());

  const updateStockData = useCallback((stocks: StockData | StockData[]): void => {
    setStockData(prevData => {
      const newData = new Map(prevData);
      if (Array.isArray(stocks)) {
        stocks.forEach(stock => {
          newData.set(stock.symbol, stock);
        });
      } else {
        newData.set(stocks.symbol, stocks);
      }
      return newData;
    });
  }, []);

  const handleMessage = useCallback(
    (data: SseMessage): void => {
      if (data.type === 'price_update' && data.data) {
        updateStockData(data.data);
      }
    },
    [updateStockData],
  );

  const getStockDataArray = useCallback((): StockData[] => {
    return Array.from(stockData.values());
  }, [stockData]);

  return {
    stockData,
    updateStockData,
    handleMessage,
    getStockDataArray,
  };
};
