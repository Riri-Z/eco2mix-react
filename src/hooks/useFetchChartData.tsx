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
    isFetching,
  } = useQuery({
    queryKey: ['lastDateAvailable'],
    queryFn: fetchLastDateAvailable,
  });

  // Fetch data for charts when defaultStartDate defaultEndDate are available
  const {
    status: statusFetchingChart,
    data: energyData,
    refetch: handleLoadEnergyData,
  } = useQuery({
    queryKey: ['energyData', { startDate, endDate }],
    refetchOnWindowFocus: false,
    queryFn: fetchECO2mixData,
  });

  // When lastDateAvailable we set startDate and EndDate
  useEffect(() => {
    if (statusLastDateAvailable === 'success' && lastDateAvailable) {
      setStartDate(lastDateAvailable);
      setEndDate(lastDateAvailable);
    }
  }, [statusLastDateAvailable, lastDateAvailable]);

  // Fetch data when component is mount, et start && endDate are set
  useEffect(() => {
    if (startDate && endDate && initialLoad) {
      handleLoadEnergyData();
      setInitialLoad(false);
    }
  }, [initialLoad, handleLoadEnergyData]);

  // Set Charts configuration when energy data are available
  useEffect(() => {
    if (energyData && startDate && endDate) {
      setChartsConfig(dataProcessing(energyData, startDate, endDate));
    }
  }, [energyData]);

  return {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    statusFetchingChart,
    statusLastDateAvailable,
    isFetching,
    chartsConfig,
    handleLoadEnergyData,
    lastDateAvailable,
    isErrorLastDate,
    handleRefetchLastDateAvailable,
  };
};

export default useFetchChartData;
