import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import { dataProcessing } from '../utils/dataProcessing';
import { ChartConfiguration } from '../utils/types';
import { fetchData } from '../utils/fetchData';
import { Header } from './Header';
import usePathName from '../hooks/usePathName';
import { fetchLastDateAvailable } from '../api/fetchChartService';
import { useQuery } from '@tanstack/react-query';

export default function App() {
  const navigate = useNavigate();
  const pathname = usePathName().pathname;
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [chartsConfig, setChartsConfig] = useState<ChartConfiguration[] | []>([]);
  const [loadingCharts, setLoadingCharts] = useState(false);

  const { isError, isSuccess, data } = useQuery({
    queryKey: ['lastDateAvailable'],
    queryFn: fetchLastDateAvailable,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setStartDate(data);
      setEndDate(data);
    }
  }, [data]);

  // Fetch data and update the chart's state based on the selected date range
  function handleLoadData(start: string | null = startDate, end: string | null = endDate) {
    // Fetch ECO2mix data
    async function fetchECO2mixRealTimeData(start: string, end: string) {
      setLoadingCharts(true);
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

        const result = await fetchData({ url, options });

        const {
          chartOptionsEco2Mix,
          chartOptionsElectricityConsumption,
          chartOptionsCo2Rate,
          configurationChartCommercialTrade,
        } = dataProcessing(result, start, end);

        setChartsConfig([
          chartOptionsEco2Mix,
          chartOptionsElectricityConsumption,
          chartOptionsCo2Rate,
          configurationChartCommercialTrade,
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
        /*         setError({ status: true, text: ERROR_API });
         */
      } finally {
        setLoadingCharts(false);
      }
    }

    // Validate date range and fetch data
    const validateAndFetchData = () => {
      if (end && start && end < start) {
        /*      setError({
          status: true,
          text: 'Attention, veuillez sélectionner une date de début antérieur à la date de fin',
        }); */
      } else {
        /*         setError({ status: false, text: null });
         */ if (start && end) {
          fetchECO2mixRealTimeData(start, end);
        }
      }
    };
    validateAndFetchData();
  }

  const handleReloadPage = () => {
    navigate('/');
  };
  return (
    <div className="flex flex-col xl:flex-row w-screen min-h-screen bg-bg-dashboard text-white max-w-full max-y-full ">
      <NavBar currentPath={pathname} />

      <div className=" flex flex-1 flex-col gap-5 lg:gap-10 mt-4  pr-2 pl-2 lg:pr-8 lg:pl-8 w-full">
        <h1 className="font-quickSandSemiBold mt-2 text-center text-2xl xl:text-left  lg:text-3xl">
          Données éCO2mix nationales
        </h1>
        <Header
          lastDateAvailable={data}
          handleLoadData={handleLoadData}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          error={isError}
          handleReloadPage={handleReloadPage}
        />

        {!isError && <Outlet context={{ startDate, endDate, chartsConfig, loadingCharts }} />}
      </div>
    </div>
  );
}
