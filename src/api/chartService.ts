// Fetch the last available date and initialize related state variables
async function fetchLastDateAvailable() {
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
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

const fetchECO2mixData = async (start: string, end: string) => {
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

  const response = await fetch(url.toString(), options);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export { fetchECO2mixData, fetchLastDateAvailable };
