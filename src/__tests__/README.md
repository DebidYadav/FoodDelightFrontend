# Test Suite Documentation

This directory contains comprehensive unit tests for the Food Delight Frontend application.

## Test Structure

```
src/__tests__/
├── Components/           # Component-specific tests
│   ├── CardComponent.test.tsx
│   ├── SearchBar.test.tsx
│   ├── SignUpForm.test.tsx
│   └── LoginForm.test.tsx
├── App.test.tsx         # Main App component tests
├── Routes.test.tsx      # Routing tests
├── apiService.test.ts   # API service tests
├── setup.ts            # Global test setup
└── __mocks__/          # Mock files
    └── fileMock.js     # Static asset mocks
```

## Test Coverage

### Components
- **CardComponent**: Tests rendering, props, and styling
- **SearchBar**: Tests form submission, input changes, and API calls
- **SignUpForm**: Tests form validation, submission, and API integration
- **LoginForm**: Tests form validation, submission, and API integration

### Main App
- **App**: Tests rendering, API calls, navigation, and state management

### API Service
- **apiService**: Tests all API endpoints (fetchRestaurants, searchRestaurant, addCustomer, loginCustomer)

### Routing
- **Routes**: Tests route configuration and component rendering

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests with coverage
```bash
npm test -- --coverage
```

### Run specific test file
```bash
npm test -- CardComponent.test.tsx
```

### Run tests in watch mode
```bash
npm test -- --watch
```

## Test Features

- **Mocking**: All external dependencies (API calls, React Router) are properly mocked
- **Async Testing**: Proper handling of async operations and API calls
- **User Interactions**: Testing user events like clicks, form submissions, and input changes
- **Error Handling**: Testing error scenarios and edge cases
- **Accessibility**: Using semantic queries (getByRole, getByLabelText) for better accessibility testing

## Coverage Thresholds

The test suite aims for 70% coverage across:
- Branches
- Functions
- Lines
- Statements

## Best Practices

1. **Isolation**: Each test is isolated and doesn't depend on other tests
2. **Mocking**: External dependencies are mocked to ensure test reliability
3. **Semantic Queries**: Using accessibility-friendly queries for better test maintenance
4. **Async Handling**: Proper use of `waitFor` for async operations
5. **Error Scenarios**: Testing both success and error paths

## Adding New Tests

When adding new components or features:

1. Create a test file in the appropriate directory
2. Follow the existing naming convention: `ComponentName.test.tsx`
3. Mock external dependencies
4. Test both success and error scenarios
5. Ensure good coverage of user interactions
6. Update this README if needed 