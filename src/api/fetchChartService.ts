// Fetch the last available date for charts
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

type QueryKey = [string, { startDate: string | null; endDate: string | null }];

const fetchECO2mixData = async ({ queryKey }: { queryKey: QueryKey }) => {
  const [_key, { startDate, endDate }] = queryKey; // eslint-disable-line

  const url = new URL(
    import.meta.env.VITE_API_URL +
      import.meta.env.VITE_API_ENDPOINT +
      '/' +
      import.meta.env.VITE_API_PATH_TOTAL_PRODUCTION
  );
  if (startDate && endDate) {
    url.searchParams.append('startDate', startDate);
    url.searchParams.append('endDate', endDate);
  } else {
    throw Error;
  }
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
