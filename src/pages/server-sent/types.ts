export interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

export interface LogEntry {
  timestamp: string;
  message: string;
  type: 'info' | 'error' | 'success';
}

export interface Status {
  type: 'connected' | 'disconnected' | 'connecting';
  message: string;
}

export interface SseMessage {
  type: string;
  clientId?: string;
  data?: StockData[] | StockData;
}

export interface SubscriptionResponse {
  success: boolean;
  message?: string;
}
