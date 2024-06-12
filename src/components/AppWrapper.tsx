import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import { dataProcessing } from '../utils/dataProcessing';
import { ChartConfiguration, IError } from '../utils/types';
import { Header } from './Header';
import usePathName from '../hooks/usePathName';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { fetchECO2mixData, fetchLastDateAvailable } from '../api/chartService';

const ERROR_API =
  "Désolé, le serveur n'est pas disponible actuellement, veuillez revenir plus tard";

export default function AppWrapper() {
  const navigate = useNavigate();
  const pathname = usePathName().pathname;
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [chartsConfig, setChartsConfig] = useState<ChartConfiguration[] | []>([]);
/*   const [loading, setLoadingCharts] = useState(false);*/
  const [error, setError] = useState<IError>({
    status: false,
    text: null,
    type:''
  });

  //tanQuery



  const query = useQuery({ queryKey: ['lastDateAvailable'], queryFn: fetchLastDateAvailable});


  const loading = query.isFetching;
  useEffect(() => {
    console.log('query.data', query.data);

    if(query.error) {
      setError({
        status:true,
        text:  query.error.message,
        type :'API'
      })
    }

    if (query.data) {
      const date = query.data;
      setStartDate(date);
      setEndDate(date);
      handleLoadData(date, date);
    }/*  else {
      setError({ status: true, text: ERROR_API });
    } */
  }, [query]);




  // Fetch data and update the chart's state based on the selected date range
  async function handleLoadData(start: string | null = startDate, end: string | null = endDate) {
    // Fetch ECO2mix data
    if (start && end) {
      const result = await fetchECO2mixData(start, end);

      //Set state chart
      if (result) {
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
      }
    }

    // Validate date range and fetch data
    const validateAndFetchData = () => {
      if (end && start && end < start) {
        setError({
          status: true,
          text: 'Attention, veuillez sélectionner une date de début antérieur à la date de fin',
          type: 'date'
        });
      } else {
        setError({ status: false, text: null,     type: '' });
        if (start && end) {
          fetchECO2mixData(start, end);
        }
      }
    };
    validateAndFetchData();
  }

  const handleReloadPage = () => {
    navigate('/dashboard');
  };

  return (
    <div className="flex flex-col xl:flex-row w-screen min-h-screen bg-bg-dashboard text-white max-w-full max-y-full ">
      <NavBar currentPath={pathname} />

      <div className=" flex flex-1 flex-col gap-5 lg:gap-10 mt-4  pr-2 pl-2 lg:pr-8 lg:pl-8 w-full">
        <h1 className="font-quickSandSemiBold mt-2 text-center text-2xl xl:text-left  lg:text-3xl">
          Données éCO2mix nationales
        </h1>
        <Header
          lastDateAvailable={query.data}
          handleLoadData={handleLoadData}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          error={error}
          handleReloadPage={handleReloadPage}
        />

        {!error.status && <Outlet context={{ startDate, endDate, chartsConfig, loading }} />}
      </div>
    </div>
  );
}
