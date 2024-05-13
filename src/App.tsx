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
  const [error, setError] = useState<IError>({ status: false, text: null });

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
      if (result.date != null) {
        const date = result.date;
        setDateLastDateAvailable(date);
        setStartDate(date);
        setEndDate(date);
        handleLoadData(date, date);
      }
    }
    try {
      getLastDateAvailable();
    } catch (e) {
      console.error(e);
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
    /* Call API  pour récupérer les configurations des chartss */
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
          if (Array.isArray(result.data) && result.data.length > 0) {
            const {
              chartOptionsEco2Mix,
              chartOptionsElectricityConsumption,
              chartOptionsCo2Rate,
              configurationChartCommercialTrade,
            } = dataProcessing(result.data);

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
      <div className="flex h-screen w-screen bg-gradient-to-l from-myBlue to-darkblue text-white">
        <NavBar />
        <div className=" flex flex-1 flex-col pt-5 pb-8 pr-16 pl-8 w-full">
          <h1 className="font-quickSandSemiBold text-3xl mb-11">Données éCO2mix nationales</h1>

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
                Appliquer
              </button>
            </div>
          )}
          {error.status && <p className="text-red-400">{error.text}</p>}
          <Outlet context={{ startDate, endDate, chartsConfig, loadingCharts }} />
        </div>
      </div>
    </>
  );
}
