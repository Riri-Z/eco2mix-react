import { useEffect, useMemo, useState } from 'react';
import { nationalMapConfiguration } from './utils/dataProcessing';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highmaps';

export const Consumption = () => {
  const [data, setData] = useState([]);

  const chartOptions = useMemo(() => nationalMapConfiguration(data), [data]);

  useEffect(() => {
    const url = new URL(
      import.meta.env.VITE_API_URL +
        import.meta.env.VITE_API_ENDPOINT +
        '/' +
        import.meta.env.VITE_API_ENDPOINT_CONSUMPTION
    );
    url.searchParams.append('date', '2023-06-10');
    const headers = {
      'Content-Type': 'application/json',
    };

    const method = 'GET';
    async function getConsumption() {
      const result = await (await fetch(url, { headers, method })).json();
      if (result && result.length > 0) {
        setData(result);
      }
    }
    try {
      getConsumption();
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <div className="">
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'mapChart'}
        options={chartOptions}
      />
    </div>
  );
};
