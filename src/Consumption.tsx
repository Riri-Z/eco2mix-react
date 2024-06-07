import { useEffect, useState } from 'react';
import { Iconsumption, DateRange } from './utils/types';
import { fetchData } from './utils/fetchData';
import { MapChart } from './components/MapChart';
import { DateConsumption } from './components/DateConsumption';

const ERROR_MESSAGE = "Désolé, la carte n'est pas disponible pour le moment";

export const Consumption = () => {
  const [dateRangeAvailable, setDateRangeAvailable] = useState<DateRange>({
    startDate: null,
    endDate: null,
    currentDate: null,
  });
  const [data, setData] = useState<Iconsumption[]>([]);
  const [error, setError] = useState({ state: false, text: '' });
  const [loading, setLoading] = useState(false);

  // Fetch and set dateRangeAvailable
  useEffect(() => {
    const url = new URL(
      import.meta.env.VITE_API_URL +
        import.meta.env.VITE_API_ENDPOINT +
        '/' +
        import.meta.env.VITE_API_ENDPOINT_CONSUMPTION +
        '/' +
        import.meta.env.VITE_API_ENDPOINT_CONSUMPTION_DATE_RANGE
    );
    const headers = {
      'Content-Type': 'application/json',
    };

    const method = 'GET';
    const options = { headers, method };
    async function getDateRangeAvailable() {
      setLoading(true);

      try {
        const result = await fetchData({ url, options });
        if (result && result.length === 2) {
          const startDate = result[0].date;
          const endDate = result[1].date;
          setDateRangeAvailable({ startDate, endDate, currentDate: endDate });
        }
        if (error.state) {
          setError({ state: false, text: '' });
        }
      } catch (e) {
        setLoading(false);

        setError({ state: true, text: ERROR_MESSAGE });
      }
    }
    try {
      getDateRangeAvailable();
      if (error.state) {
        setError({ state: false, text: '' });
      }
    } catch (e) {
      console.error(e);
      setLoading(false);
      setError({ state: true, text: ERROR_MESSAGE });
    }
  }, []);

  async function getConsumption() {
    setLoading(true);

    if (dateRangeAvailable.currentDate != null) {
      const url = new URL(
        import.meta.env.VITE_API_URL +
          import.meta.env.VITE_API_ENDPOINT +
          '/' +
          import.meta.env.VITE_API_ENDPOINT_CONSUMPTION
      );
      url.searchParams.append('date', dateRangeAvailable.currentDate);
      const headers = {
        'Content-Type': 'application/json',
      };

      const method = 'GET';
      const options = { headers, method };
      const result = await fetchData({ url, options });
      if (result && result.length > 0) {
        setData(result);
      }

      setLoading(false);
    }
  }

  // Fetch and set data
  useEffect(() => {
    if (dateRangeAvailable.currentDate != null) {
      getConsumption().catch((e) => console.error(e));
    }
  }, [dateRangeAvailable.currentDate]);

  function handleChangeDate(e: React.ChangeEvent<HTMLInputElement>) {
    setDateRangeAvailable({ ...dateRangeAvailable, currentDate: e.target.value });
  }

  return (
    <>
      {dateRangeAvailable.startDate &&
        dateRangeAvailable.endDate &&
        dateRangeAvailable.currentDate && (
          <DateConsumption
            currentDate={dateRangeAvailable.currentDate}
            endDate={dateRangeAvailable.endDate}
            startDate={dateRangeAvailable.startDate}
            handleChangeDate={handleChangeDate}
          />
        )}
      <div className="flex w-full justify-center">
        <MapChart error={error} loading={loading} data={data} />
      </div>
    </>
  );
};
