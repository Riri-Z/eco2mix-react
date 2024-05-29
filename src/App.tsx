import NavBar from './components/NavBar';
import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { LIMIT_START_DATE_DATA } from './utils/constant';
import dataProcessing from './utils/dataProcessing';
import { ChartConfiguration } from './utils/types';
import { IError } from './utils/types';

export default function App() {
  const [lastDateAvailable, setDateLastDateAvailable] = useState<string | null>(null);
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
          import.meta.env.VITE_API_ENDPOINT_ECO2MIX +
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
          text: "Désolé, il semblerait qu'on ait un souci. veuillez réessayer plus tard ",
        });
      } else {
        setDateLastDateAvailable(result);
        setStartDate(result);
        setEndDate(result);
        handleLoadData(result, result);
      }
    }
    try {
      getLastDateAvailable();
    } catch (e) {
      console.error(e);
      setError({ status: true, text: 'failed fetching' });
    }

    return () => {
      setDateLastDateAvailable(null);
      setStartDate(null);
      setEndDate(null);
    };
  }, []);

  const handleReloadCharts = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    handleLoadData(startDate, endDate);
  };

  function handleLoadData(start: string | null = startDate, end: string | null = endDate) {
    // Call Api to get all data needed for charts TODO in future, retreive only chart config to avoid  frontend compute
    async function getECO2mixRealTimeData() {
      if (start != null && end != null) {
        setLoadingCharts(true);
        try {
          const url = new URL(
            import.meta.env.VITE_API_URL +
              import.meta.env.VITE_API_ENDPOINT_ECO2MIX +
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
        text: 'Veuillez sélectionner une date de début antérieur à la date de fin',
      };

      setError(error);
    } else {
      setError({ status: false, text: null });

      try {
        getECO2mixRealTimeData();
      } catch (e) {
        console.error(e);
      }
    }
  }

  return (
    <>
      <div className="flex flex-col md:flex-row w-screen min-h-screen bg-bg-dashboard text-white max-w-full">
        <NavBar />
        <div className=" flex flex-1 flex-col gap-10 mt-4 pb-8 pr-8 pl-8 w-full">
          <h1 className="font-quickSandSemiBold text-3xl ">Données éCO2mix nationales</h1>

          {lastDateAvailable && (
            <div className="flex gap-2">
              <label className="" htmlFor="start">
                Début :
              </label>
              <input
                className="text-black rounded-md text-center w-28"
                type="date"
                id="start"
                name="trip-start"
                onChange={(e) => setStartDate(e.target.value)}
                value={startDate || ''}
                min={LIMIT_START_DATE_DATA}
                max={lastDateAvailable}
              />
              <label htmlFor="start">Fin :</label>

              <input
                className="text-black rounded-md text-center w-28"
                type="date"
                id="start"
                name="trip-start"
                onChange={(e) => setEndDate(e.target.value)}
                value={endDate || ''}
                min={LIMIT_START_DATE_DATA}
                max={lastDateAvailable}
              />

              <button
                className="bg-white text-black rounded-md w-32 ml-2"
                onClick={handleReloadCharts}
              >
                Valider
              </button>
            </div>
          )}
          {error.status && <p className="text-red-400">{error.text}</p>}
          {!error.status && (
            <Outlet context={{ startDate, endDate, chartsConfig, loadingCharts }} />
          )}
        </div>
      </div>
    </>
  );
}
