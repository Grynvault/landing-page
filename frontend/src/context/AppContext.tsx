import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { initializeSocket, getSocket } from '../services/socket';
import api from '../services/api';

interface Stats {
  totalDemand: number;
  totalSupply: number;
  activeRequests: number;
  activeCommitments: number;
}

interface AppContextType {
  stats: Stats;
  loading: boolean;
  error: string | null;
}

const defaultStats: Stats = {
  totalDemand: 0,
  totalSupply: 0,
  activeRequests: 0,
  activeCommitments: 0,
};

const defaultContext: AppContextType = {
  stats: defaultStats,
  loading: true,
  error: null,
};

const AppContext = createContext<AppContextType>(defaultContext);

export const useAppContext = () => useContext(AppContext);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [stats, setStats] = useState<Stats>(defaultStats);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch initial stats and set up socket listener for real-time updates
  useEffect(() => {
    const fetchInitialStats = async () => {
      try {
        setLoading(true);
        const response = await api.getStats();
        setStats(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching stats:', err);
        setError('Failed to load initial data. Please refresh the page.');
        setLoading(false);
      }
    };

    fetchInitialStats();

    // Initialize socket
    const socket = initializeSocket();

    // Listen for real-time stat updates
    socket.on('stats', (updatedStats: Stats) => {
      setStats(updatedStats);
    });

    return () => {
      // Clean up socket listener on unmount
      const activeSocket = getSocket();
      if (activeSocket) {
        activeSocket.off('stats');
      }
    };
  }, []);

  const value = {
    stats,
    loading,
    error,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;