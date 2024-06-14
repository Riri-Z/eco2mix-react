//Consumption date
async function fetchLastConsumptionDateAvailable() {
  const url = new URL(
    import.meta.env.VITE_API_URL +
      import.meta.env.VITE_API_ENDPOINT +
      '/' +
      import.meta.env.VITE_API_ENDPOINT_CONSUMPTION +
      '/' +
      import.meta.env.VITE_API_ENDPOINT_CONSUMPTION_DATE_RANGE
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

//Consumption data
async function fetchLastConsumptionData({
  queryKey,
}: {
  queryKey: [string, selectedDate: Date | null];
}) {
  const [_key, selectedDate] = queryKey; // eslint-disable-line
  const date = selectedDate!.toISOString().split('T')[0];

  const url = new URL(
    import.meta.env.VITE_API_URL +
      import.meta.env.VITE_API_ENDPOINT +
      '/' +
      import.meta.env.VITE_API_ENDPOINT_CONSUMPTION
  );
  if (selectedDate) {
    url.searchParams.append('date', date);

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
  } else {
    throw Error('selectedDate is missing : ' + selectedDate);
  }
}

export { fetchLastConsumptionDateAvailable, fetchLastConsumptionData };
