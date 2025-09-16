import { render, screen } from '@testing-library/react';
import AddProductPage from '../pages/AddProductPage';

// Mock AddProduct component
jest.mock('../components/AddProduct', () => () => <div data-testid="mock-add-product">Mock AddProduct Component</div>);

describe('AddProductPage', () => {
  test('renders the AddProduct component', () => {
    render(<AddProductPage />);
    expect(screen.getByTestId('mock-add-product')).toBeInTheDocument();
    expect(screen.getByText(/mock addproduct component/i)).toBeInTheDocument();
  });
});