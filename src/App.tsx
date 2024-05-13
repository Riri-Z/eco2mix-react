import NavBar from './components/NavBar';
import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { LIMIT_START_DATE_DATA } from './utils/constant';

interface Error {
  status: boolean;
  text: null | string;
}

export default function App() {
  const [lastDateAvailable, setDateLastDateAvailable] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [error, setError] = useState<Error>({ status: false, text: null });

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
        setDateLastDateAvailable(result.date);
        setStartDate(result.date);
        setEndDate(result.date);
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

  function handleLoadData() {
    if (endDate && startDate && endDate < startDate) {
      const error = {
        status: true,
        text: 'Veuillez sélectionner une date de début antérieur à la date de fin',
      };

      setError(error);
    } else {
      setError({ status: false, text: null });
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

              <button className="bg-white text-black rounded-md w-32 ml-2" onClick={handleLoadData}>
                Appliquer
              </button>
            </div>
          )}
          {error.status && <p className="text-red-400">{error.text}</p>}
          <Outlet context={{ startDate, endDate }} />
        </div>
      </div>
    </>
  );
}
