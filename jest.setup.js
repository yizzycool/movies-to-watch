// Because of the issue: Warning: `fetch` is not available. Please supply a custom `fetchFn` property to use `fetchBaseQuery` on SSR environments,
// we need to mock "fetch" in test environment
const fetchMock = require('jest-fetch-mock');
fetchMock.enableMocks();
