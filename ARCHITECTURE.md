# Architecture Documentation

## Overview

This application follows a modern React architecture with clear separation of concerns, making it easy to maintain, test, and extend.

## Architecture Principles

1. **Component-Based**: Modular, reusable components
2. **Service Layer**: API calls abstracted into services
3. **Custom Hooks**: Reusable data fetching logic
4. **Utility Functions**: Shared helper functions
5. **Constants**: Centralized configuration
6. **Error Handling**: Comprehensive error boundaries and states

## Folder Structure

```
src/
├── components/          # React components
│   ├── Dashboard.jsx   # Main dashboard view
│   ├── StatCard.jsx    # Reusable stat card component
│   ├── ExpenseChart.jsx # Chart component
│   ├── ErrorBoundary.jsx # Error boundary wrapper
│   ├── LoadingSpinner.jsx # Loading state component
│   └── ErrorMessage.jsx # Error display component
│
├── services/           # API service layer
│   └── dashboardService.js # Dashboard API calls
│
├── hooks/              # Custom React hooks
│   └── useDashboardData.js # Dashboard data fetching hook
│
├── utils/              # Utility functions
│   ├── api.js         # API client with timeout handling
│   └── formatters.js  # Data formatting utilities
│
├── constants/          # Application constants
│   └── index.js       # API config, colors, etc.
│
└── config/             # Configuration
    └── env.js         # Environment variables
```

## Data Flow

```
User Interaction
    ↓
Component (Dashboard)
    ↓
Custom Hook (useDashboardData)
    ↓
Service (dashboardService)
    ↓
API Client (api.js)
    ↓
Backend API
```

## Component Hierarchy

```
App
└── ErrorBoundary
    └── Suspense
        └── Dashboard
            ├── StatCard (x4)
            └── ExpenseChart
```

## API Integration

### Service Layer Pattern

All API calls go through the service layer (`src/services/`), which:
- Provides a clean interface for components
- Handles error cases
- Can be easily mocked for testing

### API Client

The API client (`src/utils/api.js`) provides:
- Request timeout handling
- Automatic JSON parsing
- Error handling
- Configurable base URL

### Adding New Endpoints

1. Add endpoint to `src/constants/index.js`:
```javascript
ENDPOINTS: {
  NEW_FEATURE: '/new-feature',
}
```

2. Create service function in `src/services/`:
```javascript
export const getNewFeature = async () => {
  return apiClient.get(API_CONFIG.ENDPOINTS.NEW_FEATURE);
};
```

3. Use in component or custom hook

## State Management

Currently using React's built-in state management:
- `useState` for local component state
- `useEffect` for side effects
- Custom hooks for data fetching

For future scalability, consider:
- Context API for global state
- Redux/Zustand for complex state management

## Error Handling

1. **Error Boundary**: Catches React component errors
2. **API Errors**: Handled in service layer and hooks
3. **User Feedback**: ErrorMessage component for user-facing errors
4. **Fallback Data**: Default data when API fails

## Styling

- CSS with CSS Variables for theming
- Responsive design with mobile-first approach
- Consistent spacing and design tokens
- Component-scoped styles in index.css

## Best Practices

1. **PropTypes**: Type checking for component props
2. **Error Boundaries**: Prevent app crashes
3. **Loading States**: Better UX during data fetching
4. **Default Values**: Graceful degradation
5. **Code Comments**: JSDoc comments for functions
6. **Consistent Naming**: Clear, descriptive names

## Future Enhancements

- TypeScript migration for type safety
- Unit and integration tests
- Storybook for component documentation
- Performance optimization (React.memo, useMemo)
- Authentication/Authorization
- Real-time updates (WebSockets)
- Caching layer (React Query/SWR)

