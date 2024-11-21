import '@testing-library/jest-dom';
import { screen, act } from '@testing-library/react';
import { renderWithProviders } from '../../test/utils/redux-test-utils';
import Header from '@/components/header';

// Mock next/image since we don't need to test actual image loading
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => <img {...props} />,
}));

// Before all tests, mock Bootstrap Modal class
beforeAll(() => {
  const mockModal = {
    getOrCreateInstance: jest.fn(() => ({
      show: jest.fn(),
      hide: jest.fn(),
      _isShown: false,
    })),
  };

  // Mock window.bootstrap
  Object.defineProperty(window, 'bootstrap', {
    value: { Modal: mockModal },
  });
});

// After all tests, restore all mocks
afterAll(() => {
  jest.restoreAllMocks();
});

// Clean up after each test
afterEach(() => {
  jest.clearAllMocks();
});

describe('Header Component', () => {
  // Test: renders logo and site name
  it('renders logo and site name', async () => {
    await act(async () => {
      renderWithProviders(<Header />);
    });

    // Check if logo image exists
    const logo = screen.getByAltText('Logo');
    expect(logo).toBeInTheDocument();

    // Check if site name exists
    const siteName = screen.getByText('Movies to Watch');
    expect(siteName).toBeInTheDocument();
  });

  // Test: renders account and color mode controls
  it('renders account and color mode controls', async () => {
    await act(async () => {
      renderWithProviders(<Header />);
    });

    // Check if account button with person icon exists
    const buttons = screen.getAllByRole('button');
    const targetButton = buttons.find((button) =>
      button.querySelector('.bi.bi-person-fill'),
    );
    expect(targetButton).toBeInTheDocument();
  });

  // Test: renders search bar
  it('renders search bar', async () => {
    await act(async () => {
      renderWithProviders(<Header />);
    });

    // Check if search bar exists (input element with type 'search')
    const searchBar = screen.getByRole('searchbox');
    expect(searchBar).toBeInTheDocument();
  });
});
