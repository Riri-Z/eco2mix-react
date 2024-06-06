import { useEffect, useMemo, useState } from 'react';
import { nationalMapConfiguration } from './utils/dataProcessing';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highmaps';
import highchartsAccessibility from 'highcharts/modules/accessibility';

interface DateRange {
  startDate: string | null;
  endDate: string | null;
  currentDate: string | null;
}
const ERROR_MESSAGE = "Désolé, la carte n'est pas disponible pour le moment";

highchartsAccessibility(Highcharts);
// TODO  : Add loader, or something to tell  user new data is loaded
export const Consumption = () => {
  const [dateRangeAvailable, setDateRangeAvailable] = useState<DateRange>({
    startDate: null,
    endDate: null,
    currentDate: null,
  });
  const [data, setData] = useState([]);
  const [error, setError] = useState({ state: false, text: '' });

  // Compute chartOptions whenever data change
  const chartOptions = useMemo(() => {
    const options = nationalMapConfiguration(data);
    return options;
  }, [data]);

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
    async function getDateRangeAvailable() {
      try {
        const result = await (await fetch(url, { headers, method })).json();
        if (result && result.length === 2) {
          const startDate = result[0].date;
          const endDate = result[1].date;
          setDateRangeAvailable({ startDate, endDate, currentDate: endDate });
        }
        if (error.state) {
          setError({ state: false, text: '' });
        }
      } catch (e) {
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
      setError({ state: true, text: ERROR_MESSAGE });
    }
  }, []);

  async function getConsumption() {
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

      const result = await (await fetch(url, { headers, method })).json();
      if (result && result.length > 0) {
        setData(result);
      }
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
          <div className="flex row gap-2 justify-center lg:justify-start">
            <label className="text-sm flex items-center	 lg:text-base" htmlFor="date-select">
              Sélectionner le jour :
            </label>
            <input
              id="date-select"
              type="date"
              className="text-black rounded-lg text-center w-28 lg:text-base"
              onChange={handleChangeDate}
              min={dateRangeAvailable.startDate}
              max={dateRangeAvailable.endDate}
              value={dateRangeAvailable.currentDate}
            ></input>
          </div>
        )}

      {error.state ? (
        <p className="m-auto">{error.text}</p>
      ) : (
        <HighchartsReact
          highcharts={Highcharts}
          constructorType={'mapChart'}
          options={chartOptions}
        />
      )}
    </>
  );
};
