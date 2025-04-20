import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface OrderEntry {
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

interface OrderbookFilters {
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

const OrderbookContainer = styled.section`
  width: 100%;
  padding: ${({ theme }) => `${theme.space[16]} ${theme.space[4]}`};
  background-color: ${({ theme }) => theme.colors.background};
`;

const OrderbookContent = styled.div`
  max-width: ${({ theme }) => theme.sizes['5xl']};
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  margin-bottom: ${({ theme }) => theme.space[8]};
  text-align: center;
`;

const SectionDescription = styled.p`
  text-align: center;
  max-width: ${({ theme }) => theme.sizes['3xl']};
  margin: 0 auto ${({ theme }) => theme.space[12]};
  color: ${({ theme }) => theme.colors.secondary};
`;

const FilterContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.cardBg};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.space[6]};
  margin-bottom: ${({ theme }) => theme.space[8]};
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space[4]};
`;

const FilterGroup = styled.div`
  flex: 1;
  min-width: 200px;
`;

const FilterLabel = styled.label`
  display: block;
  margin-bottom: ${({ theme }) => theme.space[2]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const FilterSelect = styled.select`
  width: 100%;
  padding: ${({ theme }) => theme.space[2]};
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const TableContainer = styled(motion.div)`
  overflow-x: auto;
  box-shadow: ${({ theme }) => theme.shadows.md};
  border-radius: ${({ theme }) => theme.radii.lg};
  background-color: white;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
`;

const TableHeadCell = styled.th`
  padding: ${({ theme }) => theme.space[4]};
  text-align: left;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  white-space: nowrap;
`;

const TableBody = styled.tbody``;

const TableRow = styled(motion.tr)<{ isMatched?: boolean }>`
  cursor: pointer;
  background-color: ${({ isMatched, theme }) => 
    isMatched ? `rgba(247, 147, 26, 0.1)` : 'white'};
  transition: ${({ theme }) => theme.transitions.easeInOut};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.cardBg};
  }
  
  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  }
`;

const TableCell = styled.td`
  padding: ${({ theme }) => theme.space[4]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const TypeBadge = styled.span<{ type: 'demand' | 'supply' }>`
  display: inline-block;
  padding: ${({ theme }) => `${theme.space[1]} ${theme.space[2]}`};
  border-radius: ${({ theme }) => theme.radii.full};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  background-color: ${({ type, theme }) => 
    type === 'demand' ? theme.colors.accent : theme.colors.primary};
  color: white;
  text-transform: uppercase;
`;

const CurrencyAmount = styled.div`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const CurrencyUnit = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  opacity: 0.8;
  margin-left: ${({ theme }) => theme.space[1]};
`;

const APRValue = styled.span<{ value: number }>`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ value, theme }) => {
    if (value <= 7) return theme.colors.success;
    if (value <= 10) return theme.colors.primary;
    return theme.colors.warning;
  }};
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: ${({ theme }) => theme.space[6]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
`;

const Tab = styled.button<{ active: boolean }>`
  padding: ${({ theme }) => `${theme.space[3]} ${theme.space[6]}`};
  background: none;
  border: none;
  border-bottom: 3px solid ${({ active, theme }) => 
    active ? theme.colors.primary : 'transparent'};
  color: ${({ active, theme }) => 
    active ? theme.colors.primary : theme.colors.text};
  font-weight: ${({ active, theme }) => 
    active ? theme.fontWeights.bold : theme.fontWeights.medium};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.easeInOut};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const NoResultsMessage = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.space[8]};
  color: ${({ theme }) => theme.colors.lightText};
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.space[12]};
`;

const Loader = styled.div`
  border: 4px solid ${({ theme }) => theme.colors.borderColor};
  border-top: 4px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const formatCurrency = (value: number, currency: string): string => {
  if (['USD', 'EUR', 'GBP'].includes(currency)) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0,
    }).format(value);
  }
  
  return `${value.toLocaleString()} ${currency}`;
};

const formatBTC = (value: number): string => {
  return value.toFixed(4);
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const Orderbook: React.FC = () => {
  const [orders, setOrders] = useState<OrderEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'all' | 'demand' | 'supply'>('all');
  const [filters, setFilters] = useState<OrderbookFilters>({
    status: 'open'
  });
  
  // In a real implementation, this would call the actual API
  // For now, we'll use a mock implementation
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        
        // In a real implementation, we would use the API endpoint
        // const response = await api.getFilteredOrders(filters);
        // setOrders(response.data.orders);
        
        // Mock implementation for demonstration purposes
        // Normally we'd get this from an API but for this demo we'll just create mock data
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Generate mock orders
        const mockOrders: OrderEntry[] = [];
        
        // Generate demand entries
        for (let i = 0; i < 15; i++) {
          const order: OrderEntry = {
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
          };
          
          mockOrders.push(order);
        }
        
        // Generate supply entries
        for (let i = 0; i < 10; i++) {
          const order: OrderEntry = {
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
          };
          
          mockOrders.push(order);
        }
        
        // Apply filters
        let filteredOrders = mockOrders;
        
        // Filter by type from tab
        if (activeTab === 'demand') {
          filteredOrders = filteredOrders.filter(order => order.type === 'demand');
        } else if (activeTab === 'supply') {
          filteredOrders = filteredOrders.filter(order => order.type === 'supply');
        }
        
        // Apply other filters
        if (filters.custody !== undefined) {
          filteredOrders = filteredOrders.filter(order => order.custody === filters.custody);
        }
        
        if (filters.kycRequired !== undefined) {
          filteredOrders = filteredOrders.filter(order => order.kycRequired === filters.kycRequired);
        }
        
        if (filters.minLtv) {
          filteredOrders = filteredOrders.filter(order => order.ltv >= (filters.minLtv || 0));
        }
        
        if (filters.maxLtv) {
          filteredOrders = filteredOrders.filter(order => order.ltv <= (filters.maxLtv || 100));
        }
        
        if (filters.minTermDays) {
          filteredOrders = filteredOrders.filter(order => order.termDays >= (filters.minTermDays || 0));
        }
        
        if (filters.maxTermDays) {
          filteredOrders = filteredOrders.filter(order => order.termDays <= (filters.maxTermDays || 365));
        }
        
        if (filters.liquidationRisk !== undefined) {
          filteredOrders = filteredOrders.filter(order => order.liquidationRisk === filters.liquidationRisk);
        }
        
        if (filters.btcChain) {
          filteredOrders = filteredOrders.filter(order => order.btcChain === filters.btcChain);
        }
        
        if (filters.walletType) {
          filteredOrders = filteredOrders.filter(order => order.walletType === filters.walletType);
        }
        
        if (filters.currency) {
          filteredOrders = filteredOrders.filter(order => order.currency === filters.currency);
        }
        
        if (filters.status) {
          filteredOrders = filteredOrders.filter(order => order.status === filters.status);
        }
        
        // Sort by newest first
        filteredOrders.sort((a, b) => {
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        });
        
        setOrders(filteredOrders);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, [activeTab, filters]);
  
  const handleTabChange = (tab: 'all' | 'demand' | 'supply') => {
    setActiveTab(tab);
  };
  
  const handleFilterChange = (key: keyof OrderbookFilters, value: any) => {
    // For select elements with empty value, remove the filter
    if (value === '') {
      const newFilters = { ...filters };
      delete newFilters[key];
      setFilters(newFilters);
    } else {
      setFilters({
        ...filters,
        [key]: value
      });
    }
  };
  
  const handleRowClick = (orderId: string) => {
    // In a real implementation, this would navigate to order details or show a modal
    alert(`You clicked on order ${orderId}. In a real implementation, this would show details or let you interact with this order.`);
  };
  
  return (
    <OrderbookContainer id="orderbook">
      <OrderbookContent>
        <SectionTitle>Live Orderbook</SectionTitle>
        <SectionDescription>
          See real-time demand and supply across the Grynvault platform. This transparent view shows 
          active requests and commitments, letting you gauge market depth and find opportunities.
        </SectionDescription>
        
        <TabContainer>
          <Tab active={activeTab === 'all'} onClick={() => handleTabChange('all')}>
            All Orders
          </Tab>
          <Tab active={activeTab === 'demand'} onClick={() => handleTabChange('demand')}>
            Loan Requests
          </Tab>
          <Tab active={activeTab === 'supply'} onClick={() => handleTabChange('supply')}>
            Lender Offers
          </Tab>
        </TabContainer>
        
        <FilterContainer>
          <FilterGroup>
            <FilterLabel htmlFor="status">Status</FilterLabel>
            <FilterSelect 
              id="status" 
              value={filters.status || ''} 
              onChange={(e) => handleFilterChange('status', e.target.value || undefined)}
            >
              <option value="">All Statuses</option>
              <option value="open">Open</option>
              <option value="matched">Matched</option>
            </FilterSelect>
          </FilterGroup>
          
          <FilterGroup>
            <FilterLabel htmlFor="custody">Custody</FilterLabel>
            <FilterSelect 
              id="custody" 
              value={filters.custody === undefined ? '' : String(filters.custody)} 
              onChange={(e) => {
                const value = e.target.value;
                if (value === '') {
                  handleFilterChange('custody', undefined);
                } else {
                  handleFilterChange('custody', value === 'true');
                }
              }}
            >
              <option value="">Any</option>
              <option value="true">Third-Party</option>
              <option value="false">Self-Custody</option>
            </FilterSelect>
          </FilterGroup>
          
          <FilterGroup>
            <FilterLabel htmlFor="kyc">KYC</FilterLabel>
            <FilterSelect 
              id="kyc" 
              value={filters.kycRequired === undefined ? '' : String(filters.kycRequired)} 
              onChange={(e) => {
                const value = e.target.value;
                if (value === '') {
                  handleFilterChange('kycRequired', undefined);
                } else {
                  handleFilterChange('kycRequired', value === 'true');
                }
              }}
            >
              <option value="">Any</option>
              <option value="true">Required</option>
              <option value="false">Not Required</option>
            </FilterSelect>
          </FilterGroup>
          
          <FilterGroup>
            <FilterLabel htmlFor="ltv">LTV Range</FilterLabel>
            <FilterSelect 
              id="ltv" 
              value={filters.minLtv || ''} 
              onChange={(e) => handleFilterChange('minLtv', e.target.value ? parseInt(e.target.value) : undefined)}
            >
              <option value="">Any LTV</option>
              <option value="50">50% +</option>
              <option value="60">60% +</option>
              <option value="70">70% +</option>
            </FilterSelect>
          </FilterGroup>
          
          <FilterGroup>
            <FilterLabel htmlFor="term">Term Length</FilterLabel>
            <FilterSelect 
              id="term" 
              value={filters.minTermDays || ''} 
              onChange={(e) => handleFilterChange('minTermDays', e.target.value ? parseInt(e.target.value) : undefined)}
            >
              <option value="">Any Term</option>
              <option value="30">30+ Days</option>
              <option value="90">90+ Days</option>
              <option value="180">180+ Days</option>
              <option value="365">365+ Days</option>
            </FilterSelect>
          </FilterGroup>
          
          <FilterGroup>
            <FilterLabel htmlFor="btcChain">BTC Chain</FilterLabel>
            <FilterSelect 
              id="btcChain" 
              value={filters.btcChain || ''} 
              onChange={(e) => handleFilterChange('btcChain', e.target.value || undefined)}
            >
              <option value="">Any Chain</option>
              <option value="L1">Layer 1 BTC</option>
              <option value="bridged">Bridged BTC</option>
            </FilterSelect>
          </FilterGroup>
        </FilterContainer>
        
        {loading ? (
          <LoaderContainer>
            <Loader />
          </LoaderContainer>
        ) : (
          <TableContainer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Table>
              <TableHead>
                <tr>
                  <TableHeadCell>Type</TableHeadCell>
                  <TableHeadCell>Amount</TableHeadCell>
                  <TableHeadCell>Currency</TableHeadCell>
                  <TableHeadCell>LTV</TableHeadCell>
                  <TableHeadCell>Term</TableHeadCell>
                  <TableHeadCell>APR</TableHeadCell>
                  <TableHeadCell>Custody</TableHeadCell>
                  <TableHeadCell>KYC</TableHeadCell>
                  <TableHeadCell>Liquidation</TableHeadCell>
                  <TableHeadCell>Date</TableHeadCell>
                  <TableHeadCell>Status</TableHeadCell>
                </tr>
              </TableHead>
              <TableBody>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <TableRow 
                      key={order.id}
                      isMatched={order.status === 'matched'}
                      onClick={() => handleRowClick(order.id)}
                      whileHover={{ x: 5 }}
                    >
                      <TableCell>
                        <TypeBadge type={order.type}>
                          {order.type === 'demand' ? 'Borrow' : 'Lend'}
                        </TypeBadge>
                      </TableCell>
                      <TableCell>
                        <CurrencyAmount>
                          {order.type === 'demand' 
                            ? formatCurrency(order.amount, 'USD') 
                            : formatBTC(order.amount)}
                          <CurrencyUnit>
                            {order.type === 'demand' ? '' : 'BTC'}
                          </CurrencyUnit>
                        </CurrencyAmount>
                      </TableCell>
                      <TableCell>{order.currency}</TableCell>
                      <TableCell>{order.ltv}%</TableCell>
                      <TableCell>{order.termDays} days</TableCell>
                      <TableCell>
                        <APRValue value={order.apr}>{order.apr}%</APRValue>
                      </TableCell>
                      <TableCell>{order.custody ? 'Third-Party' : 'Self'}</TableCell>
                      <TableCell>{order.kycRequired ? 'Required' : 'No'}</TableCell>
                      <TableCell>{order.liquidationRisk ? 'Yes' : 'No'}</TableCell>
                      <TableCell>{formatDate(order.timestamp.toString())}</TableCell>
                      <TableCell>
                        {order.status === 'open' ? 'Active' : 'Matched'}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <tr>
                    <td colSpan={11}>
                      <NoResultsMessage>
                        No orders found matching your filters. Try adjusting your criteria.
                      </NoResultsMessage>
                    </td>
                  </tr>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </OrderbookContent>
    </OrderbookContainer>
  );
};

export default Orderbook;