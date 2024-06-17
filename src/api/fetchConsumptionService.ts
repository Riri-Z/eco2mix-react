import { Iconsumption } from '../utils/types';
//Consumption date

async function fetchRangeConsumptionDateAvailable(): Promise<Iconsumption[]> {
  const url = new URL(
    import.meta.env.VITE_API_URL +
      import.meta.env.VITE_API_ENDPOINT +
      '/' +
      import.meta.env.VITE_API_ENDPOINT_CONSUMPTION +
      '/' +
      import.meta.env.VITE_API_ENDPOINT_CONSUMPTION_DATE_RANGE
  );
  const options: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data: Iconsumption[] = await response.json();
  return data;
}

//Consumption data
async function fetchLastConsumptionData({
  queryKey,
}: {
  queryKey: [string, selectedDate: Date | null];
}): Promise<Iconsumption[]> {
  const [_key, selectedDate] = queryKey; // eslint-disable-line
  if (selectedDate) {
    const date = selectedDate.toISOString().split('T')[0];

    const url = new URL(
      import.meta.env.VITE_API_URL +
        import.meta.env.VITE_API_ENDPOINT +
        '/' +
        import.meta.env.VITE_API_ENDPOINT_CONSUMPTION
    );

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
    const data: Iconsumption[] = await response.json();
    return data;
  } else {
    throw Error('selectedDate is missing : ' + selectedDate);
  }
}

export { fetchRangeConsumptionDateAvailable, fetchLastConsumptionData };
