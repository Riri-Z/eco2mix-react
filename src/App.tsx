import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import { DateRangeSelector } from './components/DateRangeSelector';
import { dataProcessing } from './utils/dataProcessing';
import { ChartConfiguration, IError } from './utils/types';

const ERROR_API =
  "Désolé, le serveur n'est pas disponible actuellement, veuillez revenir plus tard";

export default function App() {
  const location = useLocation();
  const { pathname } = location;
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
    getLastDateAvailable().catch(() => setError({ status: true, text: ERROR_API }));

    return () => {
      setLastDateAvailable(null);
      setStartDate(null);
      setEndDate(null);
    };
  }, []);

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
    await response.json().then((data) => {
      if (response.status == 200) {
        setLastDateAvailable(data);
        setStartDate(data);
        setEndDate(data);
        handleLoadData(data, data);
      }
    });
  }

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
          setError({ status: true, text: ERROR_API });
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

  const handleReloadPage = () => {
    getLastDateAvailable();
  };
  return (
    <div className="flex flex-col xl:flex-row w-screen min-h-screen bg-bg-dashboard text-white max-w-full">
      <NavBar />
      <div className=" flex flex-1 flex-col gap-5 lg:gap-10 mt-4 pb-8 pr-2 pl-2 lg:pr-8 lg:pl-8 w-full">
        <h1 className="font-quickSandSemiBold mt-2 text-center text-2xl xl:text-left  lg:text-3xl">
          Données éCO2mix nationales
        </h1>

        {lastDateAvailable && pathname === '/dashboard' && (
          <DateRangeSelector
            lastDateAvailable={lastDateAvailable}
            handleLoadData={handleLoadData}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
        )}

        {error.status && (
          <div className="flex">
            <p className="text-red-400">{error.text}</p>
            <button
              className="bg-white h-full text-center text-black rounded-lg w-14 sm:w-24 lg:w-32 ml-2"
              onClick={handleReloadPage}
            >
              <p className="flex flex-col align-middle">Actualiser</p>
            </button>
          </div>
        )}
        {!error.status && <Outlet context={{ startDate, endDate, chartsConfig, loadingCharts }} />}
      </div>
    </div>
  );
}
