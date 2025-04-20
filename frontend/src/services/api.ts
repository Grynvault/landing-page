import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Stats API
export const getStats = () => apiClient.get('/stats');

// Competitors API
export const getCompetitors = () => apiClient.get('/competitors');
export const getCompetitorById = (id: string) => apiClient.get(`/competitors/${id}`);
export const matchCompetitors = (preferences: any) => 
  apiClient.post('/competitors/match', preferences);

// Orderbook API
export const getOrderbook = () => apiClient.get('/orderbook');
export const getFilteredOrders = (filters: any) => 
  apiClient.get('/orderbook/filter', { params: filters });
export const getOrderById = (id: string) => apiClient.get(`/orderbook/${id}`);
export const addOrder = (order: any) => apiClient.post('/orderbook', order);

export default {
  getStats,
  getCompetitors,
  getCompetitorById,
  matchCompetitors,
  getOrderbook,
  getFilteredOrders,
  getOrderById,
  addOrder,
};