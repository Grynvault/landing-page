import express from 'express';
import { mockOrderbook, filterOrderbook } from '../models/orderbook';

const router = express.Router();

// Get all orders
router.get('/', (req, res) => {
  res.status(200).json(mockOrderbook);
});

// Get filtered orders
router.get('/filter', (req, res) => {
  // Extract filter parameters from query
  const {
    type,
    custody,
    kycRequired,
    minLtv,
    maxLtv,
    minTermDays,
    maxTermDays,
    liquidationRisk,
    btcChain,
    walletType,
    currency,
    status
  } = req.query;
  
  // Build filter object from query parameters
  const filters: any = {};
  if (type) filters.type = type as 'demand' | 'supply';
  if (custody !== undefined) filters.custody = custody === 'true';
  if (kycRequired !== undefined) filters.kycRequired = kycRequired === 'true';
  if (minLtv) filters.minLtv = parseInt(minLtv as string);
  if (maxLtv) filters.maxLtv = parseInt(maxLtv as string);
  if (minTermDays) filters.minTermDays = parseInt(minTermDays as string);
  if (maxTermDays) filters.maxTermDays = parseInt(maxTermDays as string);
  if (liquidationRisk !== undefined) filters.liquidationRisk = liquidationRisk === 'true';
  if (btcChain) filters.btcChain = btcChain as 'L1' | 'bridged';
  if (walletType) filters.walletType = walletType as string;
  if (currency) filters.currency = currency as string;
  if (status) filters.status = status as 'open' | 'matched' | 'cancelled';
  
  // Apply filters and return results
  const filteredOrders = filterOrderbook(mockOrderbook, filters);
  
  res.status(200).json({
    count: filteredOrders.length,
    orders: filteredOrders
  });
});

// Get specific order by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const order = mockOrderbook.find(o => o.id === id);
  
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }
  
  res.status(200).json(order);
});

// Add order to orderbook (mock implementation)
router.post('/', (req, res) => {
  const newOrder = req.body;
  
  // In a real implementation, this would be added to a database
  // For now, we'll just return the submitted order with a mock ID
  const order = {
    ...newOrder,
    id: `order-${Date.now()}`,
    timestamp: new Date(),
    status: 'open'
  };
  
  res.status(201).json({
    message: 'Order created successfully',
    order
  });
});

export default router;