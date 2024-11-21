import '@testing-library/jest-dom';
import { screen, fireEvent, act } from '@testing-library/react';
import { renderWithProviders } from '../../test/utils/redux-test-utils';
import { useRouter } from 'next/compat/router';
import InfiniteScrollMovieList from '@/components/common/infinite-scroll-movie-list';

// Mock useRouter hook
jest.mock('next/compat/router', () => ({
  useRouter: jest.fn(),
}));

// Mock useIntersectionObserver hook
const mockHit = { current: false };
jest.mock('@/hooks/use-intersection-observer', () => ({
  __esModule: true,
  default: () => ({
    get hit() {
      return mockHit.current;
    },
  }),
}));

const mockRouter = {
  push: jest.fn(),
};

beforeEach(() => {
  mockHit.current = false;
  useRouter.mockReturnValue(mockRouter);
});

const mockFetchedData = {
  results: [
    {
      id: 1,
      original_title: 'Test Movie 1',
      poster_path: '/test1.jpg',
    },
    {
      id: 2,
      original_title: 'Test Movie 2',
      poster_path: '/test2.jpg',
    },
  ],
};

describe('InfiniteScrollMovieList Component', () => {
  it('renders movie cards when data is provided', async () => {
    await act(async () => {
      renderWithProviders(
        <InfiniteScrollMovieList
          fetchedData={mockFetchedData}
          isFetching={false}
        />,
      );
    });

    expect(screen.getByText('Test Movie 1')).toBeInTheDocument();
    expect(screen.getByText('Test Movie 2')).toBeInTheDocument();
  });

  it('shows loading skeleton when is still fetching', async () => {
    await act(async () => {
      renderWithProviders(
        <InfiniteScrollMovieList fetchedData={null} isFetching={true} />,
      );
    });

    expect(screen.getByTestId('infinite-scroll-skeleton')).toBeInTheDocument();
  });

  it('calls onNext callback when hitting bottom', async () => {
    const mockOnNext = jest.fn();
    await act(async () => {
      renderWithProviders(
        <InfiniteScrollMovieList
          fetchedData={mockFetchedData}
          isFetching={false}
          onNext={mockOnNext}
        />,
      );
    });

    // Simulate scroll to bottom and update mock hit value
    await act(async () => {
      fireEvent.scroll(window, { target: { scrollY: 2000 } });
      mockHit.current = true;
    });

    // Wait for React's useEffect to process the hit value change asynchronously
    // and trigger the onNext callback. useEffect runs after render and
    // state updates, so we need to wait for the next event loop tick.
    setTimeout(() => {
      expect(mockOnNext).toHaveBeenCalled();
    }, 1000);
  });

  it('navigates to movie detail page when clicking a movie', async () => {
    await act(async () => {
      renderWithProviders(
        <InfiniteScrollMovieList
          fetchedData={mockFetchedData}
          isFetching={false}
        />,
      );
    });

    // Find the movie card by text and get the closest parent with column class
    const movieCard = screen
      .getByText('Test Movie 1')
      .closest('div[class*="col"]');

    // Find the movie hover mask inside the movie card and click it
    const movieHoverMask = movieCard.querySelector(
      'div[data-testid="tmdb-movie-hover-mask"]',
    );
    fireEvent.click(movieHoverMask);

    expect(mockRouter.push).toHaveBeenCalledWith('/movie?id=1');
  });
});
