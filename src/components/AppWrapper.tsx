import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import { dataProcessing } from '../utils/dataProcessing';
import { ChartConfiguration } from '../utils/types';
import { Header } from './Header';
import usePathName from '../hooks/usePathName';
import { fetchECO2mixData, fetchLastDateAvailable } from '../api/fetchChartService';
import { useQuery } from '@tanstack/react-query';

export default function App() {
  const navigate = useNavigate();
  const pathname = usePathName().pathname;
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [loadingCharts, setLoadingCharts] = useState(false);
  const [chartsConfig, setChartsConfig] = useState<ChartConfiguration[]>([]);
  const [initialLoad, setInitialLoad] = useState(true);

  const {
    isError: isErrorLastDate,
    isSuccess: isSuccessLastDate,
    data: lastDateAvailable,
  } = useQuery({
    queryKey: ['lastDateAvailable'],
    queryFn: fetchLastDateAvailable,
  });

  /* Fetch data for charts when defaultStartDate defaultEndDate are available  */
  const {
    isLoading,
    status,
    fetchStatus,
    data: energyData,
    refetch: handleLoadEnergyData,
  } = useQuery({
    queryKey: ['energyData', { startDate, endDate }],
    refetchOnWindowFocus: false,

    queryFn: fetchECO2mixData,
    enabled: false,
  });

  useEffect(() => {
    setLoadingCharts(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (energyData && startDate && endDate) {
      setChartsConfig(dataProcessing(energyData, startDate, endDate));
    }
  }, [energyData]);

  useEffect(() => {
    if (startDate && endDate && initialLoad) {
      handleLoadEnergyData();
      setInitialLoad(false);
    }
  }, [initialLoad, handleLoadEnergyData]);

  useEffect(() => {
    if (isSuccessLastDate && lastDateAvailable) {
      setStartDate(lastDateAvailable);
      setEndDate(lastDateAvailable);
    }
  }, [isSuccessLastDate, lastDateAvailable]);

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
          lastDateAvailable={lastDateAvailable}
          handleLoadData={handleLoadEnergyData}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          error={isErrorLastDate}
          handleReloadPage={handleReloadPage}
        />

        {!isErrorLastDate && (
          <Outlet context={{ startDate, endDate, chartsConfig, loadingCharts }} />
        )}
      </div>
    </div>
  );
}
