# TEAMVCU Dashboard

A modern, responsive financial dashboard built with React, Vite, and Framer Motion.

## Features

- 📊 Interactive expense charts
- 💰 Financial statistics overview
- 🎨 Beautiful, modern UI with animations
- 📱 Fully responsive design
- 🔌 Backend-ready API integration (currently using mock data)
- ⚡ Fast and optimized

## Tech Stack

- **React 19** - UI library
- **Vite** - Build tool
- **Framer Motion** - Animations
- **Recharts** - Chart library
- **PropTypes** - Type checking

## Project Structure

```
src/
├── components/          # React components
│   ├── Dashboard.jsx
│   ├── StatCard.jsx
│   ├── ExpenseChart.jsx
│   ├── ErrorBoundary.jsx
│   ├── LoadingSpinner.jsx
│   └── ErrorMessage.jsx
├── components/         # React components
│   ├── Dashboard.jsx
│   ├── StatCard.jsx
│   ├── ExpenseChart.jsx
│   ├── ErrorBoundary.jsx
│   ├── LoadingSpinner.jsx
│   └── ErrorMessage.jsx
├── data/               # Mock data (for development)
│   └── mockData.js
├── services/           # API services (ready for backend)
│   └── dashboardService.js
├── hooks/              # Custom React hooks
│   └── useDashboardData.js
├── utils/              # Utility functions
│   ├── api.js
│   └── formatters.js
├── constants/          # App constants
│   └── index.js
└── config/             # Configuration
    └── env.js
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

**Note:** The app currently uses mock data and works without a backend. No environment setup required!

### Development

Run the development server:
```bash
npm run dev
```

### Build

Build for production:
```bash
npm run build
```

### Preview

Preview production build:
```bash
npm run preview
```

## Backend Integration

**Current Status:** The app is currently using mock data from `src/data/mockData.js` and works without a backend connection.

**To connect to a backend:**

1. Update the API configuration in:
   - `src/constants/index.js` - API endpoints
   - `.env` - API base URL (create `.env` file)

2. Uncomment the backend code in `src/hooks/useDashboardData.js`:
   - Remove the mock data section
   - Uncomment the backend API calls

3. The app uses a service layer (`src/services/dashboardService.js`) that can be easily extended with new endpoints.

### API Endpoints Expected

- `GET /api/dashboard` - Dashboard overview data
- `GET /api/expenses` - Expense data for charts
- `GET /api/stats` - Financial statistics

### Response Format

```json
{
  "totalBalance": 342800,
  "monthlySpend": 24350,
  "savings": 58200,
  "creditScore": 782,
  "totalExpenses": 20210230,
  "expenses": [
    { "name": "Food", "value": 30 },
    { "name": "Travel", "value": 22 }
  ]
}
```

## Adding New Features

The codebase is structured for easy extension:

1. **New Components**: Add to `src/components/`
2. **New Services**: Add to `src/services/`
3. **New Hooks**: Add to `src/hooks/`
4. **New Utilities**: Add to `src/utils/`

## License

MIT
