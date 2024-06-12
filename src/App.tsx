import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import { dataProcessing } from './utils/dataProcessing';
import { ChartConfiguration, IError } from './utils/types';
import { fetchData } from './utils/fetchData';
import { Header } from './components/Header';
import usePathName from './hooks/usePathName';

const ERROR_API =
  "Désolé, le serveur n'est pas disponible actuellement, veuillez revenir plus tard";

export default function App() {
  const navigate = useNavigate();
  const pathname = usePathName().pathname;
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

  // Fetch the last available date and initialize related state variables
  async function getLastDateAvailable() {
    const url = new URL(
      import.meta.env.VITE_API_URL +
        import.meta.env.VITE_API_ENDPOINT +
        '/' +
        import.meta.env.VITE_API_PATH_LAST_RECORD
    );
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    //Fetch and populate state
    fetchData({ url, options })
      .then((data) => {
        if (data) {
          setLastDateAvailable(data);
          setStartDate(data);
          setEndDate(data);
          handleLoadData(data, data);
        }
      })
      .catch((error) => {
        setError({ status: true, text: ERROR_API });

        console.error('Error fetching data:', error);
      });
  }

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
        setError({ status: true, text: ERROR_API });
      } finally {
        setLoadingCharts(false);
      }
    }

    // Validate date range and fetch data
    const validateAndFetchData = () => {
      if (end && start && end < start) {
        setError({
          status: true,
          text: 'Attention, veuillez sélectionner une date de début antérieur à la date de fin',
        });
      } else {
        setError({ status: false, text: null });
        if (start && end) {
          fetchECO2mixRealTimeData(start, end);
        }
      }
    };
    validateAndFetchData();
  }

  const handleReloadPage = () => {
    navigate('/');
    getLastDateAvailable();
  };
  return (
    <div className="flex flex-col xl:flex-row w-screen min-h-screen bg-bg-dashboard text-white max-w-full max-y-full ">
      <NavBar currentPath={pathname} />

      <div className=" flex flex-1 flex-col gap-5 lg:gap-10 mt-4  pr-2 pl-2 lg:pr-8 lg:pl-8 w-full">
        <h1 className="font-quickSandSemiBold mt-2 text-center text-2xl xl:text-left  lg:text-3xl">
          Données éCO2mix nationales
        </h1>
        <Header
          lastDateAvailable={lastDateAvailable}
          handleLoadData={handleLoadData}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          error={error}
          handleReloadPage={handleReloadPage}
        />

        {!error.status && <Outlet context={{ startDate, endDate, chartsConfig, loadingCharts }} />}
      </div>
    </div>
  );
}
