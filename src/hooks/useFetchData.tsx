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

  // Fetch last date available
  const {
    isError: isErrorLastDate,
    data: lastDateAvailable,
    status: statusLastDateAvailble,
    refetch: handleRefetchLastDateAvailable,
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
    refetchOnWindowFocus: false /*
    enabled: initialLoad, */,
    queryFn: fetchECO2mixData,
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

  // Init with value startDate and EndDate
  useEffect(() => {
    if (statusLastDateAvailble === 'success' && lastDateAvailable) {
      setStartDate(lastDateAvailable);
      setEndDate(lastDateAvailable);
    }
  }, [statusLastDateAvailble, lastDateAvailable]);

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
    handleRefetchLastDateAvailable,
  };
};

export default useFetchData;
