import { IEco2mix } from './../utils/types';
import { dataProcessing } from '../utils/dataProcessing';

// Fetch the last available date and initialize related state variables
async function getLastDateAvailable() {
  try {
    const url = new URL(
      import.meta.env.VITE_API_URL +
        import.meta.env.VITE_API_ENDPOINT +
        '/' +
        import.meta.env.VITE_API_PATH_LAST_RECORD
    );
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const result = await fetch(url, options);
    return result.json();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

async function fetchECO2mixData(start: string, end: string) {
  try {
    const url = new URL(
      import.meta.env.VITE_API_URL +
        import.meta.env.VITE_API_ENDPOINT +
        '/' +
        import.meta.env.VITE_API_PATH_TOTAL_PRODUCTION
    );
    url.searchParams.append('startDate', start);
    url.searchParams.append('endDate', end);
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    };

    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const result = await response.json();

    return result;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export { getLastDateAvailable, fetchECO2mixData };
