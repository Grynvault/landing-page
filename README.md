# Grynvault Landing Page

A dynamic, interactive landing page for Grynvault's Bitcoin-backed lending platform.

## Overview

Grynvault is a platform that provides Bitcoin-backed loans with a focus on transparency, financial sovereignty, and flexible terms. This landing page showcases Grynvault's lending model and allows users to:

- Configure loan preferences via an intuitive configurator
- View a live orderbook of demand and supply
- Learn about white-glove cross-collateral services
- Find competitor alternatives when needed

## Technology Stack

### Frontend
- React 19
- TypeScript
- Styled Components
- Socket.IO Client (for real-time data)
- Framer Motion (for animations)
- Recharts (for data visualization)

### Backend
- Node.js
- Express
- Socket.IO (for real-time communication)
- TypeScript
- PostgreSQL (configured but using mock data currently)

## Getting Started

### Prerequisites
- Node.js 20+
- npm 10+

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd grynvault-landing-page
```

2. Install dependencies
```bash
npm run install:all
```

3. Start the development servers
```bash
npm start
```

This will concurrently start:
- Frontend server at http://localhost:3000
- Backend server at http://localhost:5000

### Development

To work on specific parts of the project:

- **Frontend only**:
```bash
cd frontend
npm start
```

- **Backend only**:
```bash
cd backend
npm run dev
```

### Building for Production

To build both frontend and backend for production:
```bash
npm run build
```

### Troubleshooting

If you encounter any styled-components issues:
1. Ensure you have the correct types installed: `npm install @types/styled-components --save-dev`
2. Make sure to use the ThemeProvider correctly
3. Define explicit interfaces for styled components with props

## Project Structure

```
├── frontend/                # React frontend application
│   ├── src/
│   │   ├── assets/          # Static assets and global styles
│   │   ├── components/      # React components
│   │   ├── context/         # React context providers
│   │   ├── hooks/           # Custom React hooks
│   │   └── services/        # API and socket services
│   └── public/              # Public assets
│
├── backend/                 # Node.js backend application
│   ├── src/
│   │   ├── config/          # Configuration files
│   │   ├── controllers/     # Request handlers
│   │   ├── models/          # Data models
│   │   ├── routes/          # API routes
│   │   └── utils/           # Utility functions
│   └── .env                 # Environment variables
│
└── for_claude/              # Project documentation
    ├── PRD.md               # Product Requirements Document
    └── instructions.md      # Implementation instructions
```

## Features

### Hero Section
- Real-time counters showing total demand and supply
- Clear call-to-action buttons

### Vision & Mission
- Communicates Grynvault's guiding principles and ethos

### Loan Configurator
- Interactive form to define borrowing preferences
- Dynamic preview with estimated matching speed
- VaultPoints system for borrower incentives

### Live Orderbook
- Transparent view of current requests and commitments
- Filtering and sorting controls
- Real-time updates via WebSockets

### White-Glove Service
- Information about premium cross-collateral service
- Focus on zero liquidation risk and extended terms

### Competitor Redirect Logic
- Provides alternatives when Grynvault isn't ready
- Tailored competitor suggestions based on user inputs

## License

This project is proprietary and confidential.# landing-page
