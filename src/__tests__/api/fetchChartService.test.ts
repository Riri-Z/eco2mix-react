import { describe, expect, vi, it, beforeEach, Mock } from 'vitest';
import { fetchLastDateAvailable, fetchECO2mixData } from '../../api/fetchChartService';

// Mock global.fetch
global.fetch = vi.fn();

// Helper function to create a mock fetch response
function createFetchResponse(data: string | []) {
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
    const mockLastDateResponse = '2024-06-24';

    (global.fetch as Mock).mockResolvedValue(createFetchResponse(mockLastDateResponse));

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
    expect(result).toEqual(mockLastDateResponse);
  });

  it('should throw an error when the network response is not ok', async () => {
    (global.fetch as Mock).mockResolvedValue({
      ok: false,
      json: () => Promise.resolve(null),
    });

    await expect(fetchLastDateAvailable()).rejects.toThrow('Network response was not ok');
  });

  it('should make a GET request to  fetchECO2mixData', async () => {
    const expectedResult: [] = [];

    (global.fetch as Mock).mockResolvedValue(createFetchResponse(expectedResult));

    const query: { queryKey: [string, { startDate: string; endDate: string }] } = {
      queryKey: ['fakeKey', { startDate: '2024-09-23', endDate: '2024-09-24' }],
    };

    const result = await fetchECO2mixData(query);

    expect(expectedResult).toEqual(result);
  });
});
