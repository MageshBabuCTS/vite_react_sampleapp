import { render, screen } from '@testing-library/react';
import HomePage from '../pages/HomePage';

// src/pages/HomePage.test.js

// Mock the Home component
jest.mock('../components/Home', () => () => <div data-testid="mock-home">Mock Home Component</div>);

describe('HomePage', () => {
  test('renders the Home component', () => {
    render(<HomePage />);
    expect(screen.getByTestId('mock-home')).toBeInTheDocument();
    expect(screen.getByText(/mock home component/i)).toBeInTheDocument();
  });
});