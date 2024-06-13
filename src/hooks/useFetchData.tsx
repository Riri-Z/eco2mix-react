import { useEffect, useState } from 'react';
import { ChartConfiguration } from '../utils/types';
import { useQuery } from '@tanstack/react-query';
import { fetchECO2mixData, fetchLastDateAvailable } from '../api/fetchChartService';
import { dataProcessing } from '../utils/dataProcessing';

const useFetchData = () => {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [loadingCharts, setLoadingCharts] = useState(false);
  const [chartsConfig, setChartsConfig] = useState<ChartConfiguration[]>([]);
  const [initialLoad, setInitialLoad] = useState(true);

  const {
    isError: isErrorLastDate,
    isSuccess: isSuccessLastDate,
    data: lastDateAvailable,
    isLoading: isLoadingLastDate,
  } = useQuery({
    queryKey: ['lastDateAvailable'],
    queryFn: fetchLastDateAvailable,
  });

  /* Fetch data for charts when defaultStartDate defaultEndDate are available  */
  const {
    isLoading,
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

  return {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    loadingCharts,
    chartsConfig,
    handleLoadEnergyData,
    lastDateAvailable,
    isErrorLastDate,
  };
};

export default useFetchData;
