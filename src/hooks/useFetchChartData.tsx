import { useEffect, useState } from 'react';
import { ChartConfiguration } from '../utils/types';
import { useQuery } from '@tanstack/react-query';
import { fetchECO2mixData, fetchLastDateAvailable } from '../api/fetchChartService';
import { dataProcessing } from '../utils/dataProcessing';

const useFetchChartData = () => {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [chartsConfig, setChartsConfig] = useState<ChartConfiguration[]>([]);
  const [initialLoad, setInitialLoad] = useState(true);

  // Fetch last date available
  const {
    isError: isErrorLastDate,
    data: lastDateAvailable,
    status: statusLastDateAvailable,
    refetch: handleRefetchLastDateAvailable,
  } = useQuery({
    queryKey: ['lastDateAvailable'],
    queryFn: fetchLastDateAvailable,
  });

  /* Fetch data for charts when defaultStartDate defaultEndDate are available  */
  const {
    status: statusFetchingChart,
    data: energyData,
    refetch: handleLoadEnergyData,
  } = useQuery({
    queryKey: ['energyData', { startDate, endDate }],
    refetchOnWindowFocus: false,
    queryFn: fetchECO2mixData,
  });

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
    if (statusLastDateAvailable === 'success' && lastDateAvailable) {
      setStartDate(lastDateAvailable);
      setEndDate(lastDateAvailable);
    }
  }, [statusLastDateAvailable, lastDateAvailable]);

  return {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    statusFetchingChart,
    statusLastDateAvailable,
    chartsConfig,
    handleLoadEnergyData,
    lastDateAvailable,
    isErrorLastDate,
    handleRefetchLastDateAvailable,
  };
};

export default useFetchChartData;
