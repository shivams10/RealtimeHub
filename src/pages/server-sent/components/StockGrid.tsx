import { StockCard } from './StockCard';

import type { StockData } from '../types';
import type { FC } from 'react';

interface StockGridProps {
  stocks: StockData[];
}

export const StockGrid: FC<StockGridProps> = ({ stocks }) => {
  if (stocks.length === 0) {
    return (
      <div className='text-center py-12 text-gray-500'>
        <p className='text-lg'>No stock data available</p>
        <p className='text-sm'>Connect and subscribe to see real-time stock updates</p>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8'>
      {stocks.map(stock => (
        <StockCard key={stock.symbol} stock={stock} />
      ))}
    </div>
  );
};
