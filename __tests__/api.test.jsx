import handler from '@/pages/api/tmdb/[...slug]';
import { createMocks } from 'node-mocks-http';

// Mock "fetch" function
global.fetch = jest.fn();

// Run before each test
beforeEach(() => {
  process.env.TMDB_API_BASE_URL = 'https://api.themoviedb.org/3/';
  process.env.TMDB_API_ACCESS_TOKEN = 'fake-access-token';
});

// Run after each test
afterEach(() => {
  jest.resetAllMocks();
});

describe('TMDB API Proxy', () => {
  it('should return 405 for non-GET requests', async () => {
    // Create a mock request and response object
    const { req, res } = createMocks({ method: 'POST' });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(405);
    expect(res._isJSON()).toBe(true);
    expect(res._getJSONData()).toEqual({ error: 'Method Not Allowed' });
  });

  it('should construct correct URL and forward TMDB response', async () => {
    // Create a mock request and response object
    const { req, res } = createMocks({
      method: 'GET',
      query: { slug: ['movie', 'now_playing'], language: 'en-US', page: 1 },
    });

    const mockApiResponse = { title: 'Fake Movie' };
    // Mock fetch to return response with status 200 and JSON payload
    fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => mockApiResponse,
    });

    await handler(req, res);

    // Verify fetch was called with the correct URL and headers
    expect(fetch).toHaveBeenCalledWith(
      'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',
      expect.objectContaining({
        method: 'GET',
        headers: {
          Authorization: 'Bearer fake-access-token',
          accept: 'application/json',
        },
      }),
    );
    // Verify response status and JSON data
    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual(mockApiResponse);
  });

  it('should return error if TMDB API fails', async () => {
    // Create a mock request and response object
    const { req, res } = createMocks({
      method: 'GET',
      query: { slug: ['movie', 'now_playing'], language: 'en-US', page: 1 },
    });
    // Mock fetch to return response with status 404 and JSON payload
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({ error: 'Not Found' }),
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(404);
    expect(res._getJSONData()).toEqual({ error: 'Not Found' });
  });

  it('should handle missing environment variables', async () => {
    delete process.env.TMDB_API_BASE_URL;

    // Create a mock request and response object
    const { req, res } = createMocks({
      method: 'GET',
      query: { slug: ['movie', 'now_playing'], language: 'en-US', page: 1 },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(500);
    expect(res._getJSONData()).toEqual({
      error: expect.stringContaining('undefined'),
    });
  });
});
