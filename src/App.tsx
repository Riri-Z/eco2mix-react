import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';
import { SelectDate } from './components/SelectDate';
import { dataProcessing } from './utils/dataProcessing';
import { ChartConfiguration, IError } from './utils/types';

export default function App() {
  const [lastDateAvailable, setLastDateAvailable] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [chartsConfig, setChartsConfig] = useState<ChartConfiguration[] | []>([]);
  const [loadingCharts, setLoadingCharts] = useState(false);
  const [error, setError] = useState<IError>({
    status: false,
    text: null,
  });

  useEffect(() => {
    async function getLastDateAvailable() {
      const url = new URL(
        import.meta.env.VITE_API_URL +
          import.meta.env.VITE_API_ENDPOINT +
          '/' +
          import.meta.env.VITE_API_PATH_LAST_RECORD
      );
      const headers = {
        'Content-Type': 'application/json',
      };
      const method = 'GET';

      const response = await fetch(url, {
        method,
        headers,
      });
      const result = await response.json();
      if (response.status != 200) {
        setError({
          status: true,
          text: 'Désolé, un souci est survenu. veuillez réessayer plus tard ',
        });
      } else {
        setLastDateAvailable(result);
        setStartDate(result);
        setEndDate(result);
        handleLoadData(result, result);
      }
    }

    getLastDateAvailable();

    return () => {
      setLastDateAvailable(null);
      setStartDate(null);
      setEndDate(null);
    };
  }, []);

  function handleLoadData(start: string | null = startDate, end: string | null = endDate) {
    async function getECO2mixRealTimeData() {
      if (start != null && end != null) {
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
          const headers = {
            'Content-Type': 'application/json',
          };

          const method = 'GET';

          const response = await fetch(url, {
            method,
            headers,
          });

          const result = await response.json();
          if (response.status === 200 && Array.isArray(result) && result.length > 0) {
            const {
              chartOptionsEco2Mix,
              chartOptionsElectricityConsumption,
              chartOptionsCo2Rate,
              configurationChartCommercialTrade,
            } = dataProcessing(result, startDate!, endDate!);

            setChartsConfig([
              chartOptionsEco2Mix,
              chartOptionsElectricityConsumption,
              chartOptionsCo2Rate,
              configurationChartCommercialTrade,
            ]);
          }

          setLoadingCharts(false);
        } catch (e) {
          console.error(e);
          setError({ status: true, text: 'IError with API' });
        }
      }
    }

    if (end && start && end < start) {
      const error = {
        status: true,
        text: 'Attention, veuillez sélectionner une date de début antérieur à la date de fin',
      };

      setError(error);
    } else {
      setError({ status: false, text: null });

      getECO2mixRealTimeData();
    }
  }

  return (
    <div className="flex flex-col xl:flex-row w-screen min-h-screen bg-bg-dashboard text-white max-w-full">
      <NavBar />
      <div className=" flex flex-1 flex-col gap-5 lg:gap-10 mt-4 pb-8 pr-2 pl-2 lg:pr-8 lg:pl-8 w-full">
        <h1 className="font-quickSandSemiBold mt-2 text-center text-2xl lg:text-left  lg:text-3xl">
          Données éCO2mix nationales
        </h1>

        {lastDateAvailable && (
          <SelectDate
            lastDateAvailable={lastDateAvailable}
            handleLoadData={handleLoadData}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
        )}
        {error.status && <p className="text-red-400">{error.text}</p>}
        {!error.status && <Outlet context={{ startDate, endDate, chartsConfig, loadingCharts }} />}
      </div>
    </div>
  );
}
