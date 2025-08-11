import type { StockData } from '../types';
import type { FC } from 'react';

interface StockCardProps {
  stock: StockData;
}

export const StockCard: FC<StockCardProps> = ({ stock }: StockCardProps) => {
  const isPositive = stock.change >= 0;
  const changeClass = isPositive ? 'text-green-600' : 'text-red-600';

  return (
    <div className='bg-white border border-gray-200 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1'>
      <div className='flex justify-between items-center mb-4'>
        <div className='text-2xl font-bold text-gray-800'>{stock.symbol}</div>
        <div className={`text-3xl font-bold ${changeClass}`}>${stock.price.toFixed(2)}</div>
      </div>
      <div className='flex gap-3 mb-3'>
        <span className={`font-semibold ${changeClass}`}>
          {isPositive ? '+' : ''}
          {stock.change.toFixed(2)}
        </span>
        <span className={`font-semibold ${changeClass}`}>
          ({isPositive ? '+' : ''}
          {stock.changePercent.toFixed(2)}%)
        </span>
      </div>
    </div>
  );
};
