import { describe, expect, vi, it, beforeEach } from 'vitest';
import { fetchLastDateAvailable } from '../../api/fetchChartService';

// Mock global.fetch
global.fetch = vi.fn();

// Helper function to create a mock fetch response
function createFetchResponse(data: string) {
  return {
    ok: true,
    json: () => Promise.resolve(data),
  };
}

describe('fetchLastDateAvailable', () => {
  const mockEnv = {
    VITE_API_URL: 'http://localhost:8080',
    VITE_API_ENDPOINT: '/api',
    VITE_API_PATH_LAST_RECORD: 'last-date-available',
  };

  beforeEach(() => {
    vi.resetAllMocks();

    // Mock import.meta.env
    vi.stubGlobal('import.meta', {
      env: mockEnv,
    });
  });

  it('should make a GET request to fetch the last date available and return the result', async () => {
    const lastDateResponse = '2024-06-24';

    (global.fetch as vi.Mock).mockResolvedValue(createFetchResponse(lastDateResponse));

    const result = await fetchLastDateAvailable();

    const expectedUrl = new URL(
      `${mockEnv.VITE_API_URL}${mockEnv.VITE_API_ENDPOINT}/${mockEnv.VITE_API_PATH_LAST_RECORD}`
    );

    expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    expect(result).toEqual(lastDateResponse);
  });

  it('should throw an error when the network response is not ok', async () => {
    (global.fetch as vi.Mock).mockResolvedValue({
      ok: false,
      json: () => Promise.resolve(null),
    });

    await expect(fetchLastDateAvailable()).rejects.toThrow('Network response was not ok');
  });
});
