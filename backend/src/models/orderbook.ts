export interface OrderEntry {
  id: string;
  type: 'demand' | 'supply';
  amount: number; // in USD for demand, BTC for supply
  custody: boolean;
  kycRequired: boolean;
  ltv: number; // percentage
  termDays: number;
  liquidationRisk: boolean;
  btcChain: 'L1' | 'bridged';
  walletType: string;
  currency: string;
  apr: number;
  timestamp: Date;
  status: 'open' | 'matched' | 'cancelled';
}

// Mock data for the orderbook
const generateMockOrderbook = (): OrderEntry[] => {
  const mockOrders: OrderEntry[] = [];
  
  // Generate 20 demand entries
  for (let i = 0; i < 20; i++) {
    mockOrders.push({
      id: `demand-${i}`,
      type: 'demand',
      amount: Math.floor(Math.random() * 100000) + 10000, // $10k to $110k
      custody: Math.random() > 0.5,
      kycRequired: Math.random() > 0.3,
      ltv: [50, 60, 70, 80][Math.floor(Math.random() * 4)],
      termDays: [30, 90, 180, 365][Math.floor(Math.random() * 4)],
      liquidationRisk: Math.random() > 0.3,
      btcChain: Math.random() > 0.6 ? 'L1' : 'bridged',
      walletType: ['own wallet', 'browser wallet', 'multisig', 'custodial'][Math.floor(Math.random() * 4)],
      currency: ['USD', 'USDC', 'USDT', 'DAI'][Math.floor(Math.random() * 4)],
      apr: Math.floor(Math.random() * 10) + 5, // 5% to 15%
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)), // Last 7 days
      status: Math.random() > 0.8 ? 'matched' : 'open'
    });
  }
  
  // Generate 15 supply entries
  for (let i = 0; i < 15; i++) {
    mockOrders.push({
      id: `supply-${i}`,
      type: 'supply',
      amount: Math.random() * 2 + 0.1, // 0.1 to 2.1 BTC
      custody: Math.random() > 0.5,
      kycRequired: Math.random() > 0.4,
      ltv: [50, 60, 70, 80][Math.floor(Math.random() * 4)],
      termDays: [30, 90, 180, 365][Math.floor(Math.random() * 4)],
      liquidationRisk: Math.random() > 0.2,
      btcChain: Math.random() > 0.6 ? 'L1' : 'bridged',
      walletType: ['own wallet', 'browser wallet', 'multisig', 'custodial'][Math.floor(Math.random() * 4)],
      currency: ['USD', 'USDC', 'USDT', 'DAI'][Math.floor(Math.random() * 4)],
      apr: Math.floor(Math.random() * 8) + 3, // 3% to 11%
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)), // Last 7 days
      status: Math.random() > 0.8 ? 'matched' : 'open'
    });
  }
  
  return mockOrders;
};

export const mockOrderbook = generateMockOrderbook();

// Functions to filter the orderbook based on various criteria
export const filterOrderbook = (
  orders: OrderEntry[],
  filters: {
    type?: 'demand' | 'supply';
    custody?: boolean;
    kycRequired?: boolean;
    minLtv?: number;
    maxLtv?: number;
    minTermDays?: number;
    maxTermDays?: number;
    liquidationRisk?: boolean;
    btcChain?: 'L1' | 'bridged';
    walletType?: string;
    currency?: string;
    status?: 'open' | 'matched' | 'cancelled';
  }
) => {
  return orders.filter(order => {
    // Filter by type
    if (filters.type && order.type !== filters.type) return false;
    
    // Filter by custody preference
    if (filters.custody !== undefined && order.custody !== filters.custody) return false;
    
    // Filter by KYC requirement
    if (filters.kycRequired !== undefined && order.kycRequired !== filters.kycRequired) return false;
    
    // Filter by LTV range
    if (filters.minLtv !== undefined && order.ltv < filters.minLtv) return false;
    if (filters.maxLtv !== undefined && order.ltv > filters.maxLtv) return false;
    
    // Filter by term length range
    if (filters.minTermDays !== undefined && order.termDays < filters.minTermDays) return false;
    if (filters.maxTermDays !== undefined && order.termDays > filters.maxTermDays) return false;
    
    // Filter by liquidation risk
    if (filters.liquidationRisk !== undefined && order.liquidationRisk !== filters.liquidationRisk) return false;
    
    // Filter by BTC chain
    if (filters.btcChain !== undefined && order.btcChain !== filters.btcChain) return false;
    
    // Filter by wallet type
    if (filters.walletType !== undefined && order.walletType !== filters.walletType) return false;
    
    // Filter by currency
    if (filters.currency !== undefined && order.currency !== filters.currency) return false;
    
    // Filter by status
    if (filters.status !== undefined && order.status !== filters.status) return false;
    
    return true;
  });
};

export default { mockOrderbook, filterOrderbook };