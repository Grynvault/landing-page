import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';

// Import routes
import competitorsRouter from './routes/competitors';
import orderbookRouter from './routes/orderbook';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const server = http.createServer(app);

// Set up Socket.IO with CORS for real-time communication
const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/competitors', competitorsRouter);
app.use('/api/orderbook', orderbookRouter);

// Routes
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Grynvault API is running' });
});

// Mock data for the landing page statistics
const mockStats = {
  totalDemand: 1250000, // $1.25M
  totalSupply: 12.5, // 12.5 BTC
  activeRequests: 35,
  activeCommitments: 18
};

// API endpoint for getting stats
app.get('/api/stats', (req, res) => {
  res.status(200).json(mockStats);
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // Send initial stats to client
  socket.emit('stats', mockStats);

  // Mock real-time updates every 10 seconds
  const statsInterval = setInterval(() => {
    // Randomly update demand and supply
    mockStats.totalDemand += Math.random() > 0.5 ? 25000 : -15000;
    mockStats.totalSupply += Math.random() > 0.5 ? 0.25 : -0.15;
    
    // Ensure values don't go negative
    mockStats.totalDemand = Math.max(500000, mockStats.totalDemand);
    mockStats.totalSupply = Math.max(5, mockStats.totalSupply);
    
    // Update request and commitment counts occasionally
    if (Math.random() > 0.7) {
      mockStats.activeRequests += Math.random() > 0.5 ? 1 : -1;
      mockStats.activeRequests = Math.max(10, mockStats.activeRequests);
    }
    
    if (Math.random() > 0.8) {
      mockStats.activeCommitments += Math.random() > 0.5 ? 1 : -1;
      mockStats.activeCommitments = Math.max(5, mockStats.activeCommitments);
    }
    
    // Broadcast updated stats to all clients
    io.emit('stats', mockStats);
  }, 10000);

  // Clean up interval on disconnect
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    clearInterval(statsInterval);
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});