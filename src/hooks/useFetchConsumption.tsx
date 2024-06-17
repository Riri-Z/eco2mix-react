import { useQuery } from '@tanstack/react-query';
import {
  fetchRangeConsumptionDateAvailable,
  fetchLastConsumptionData,
} from '../api/fetchConsumptionService';
import { useEffect, useState } from 'react';

const useFetchConsumption = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [initialLoad, setInitialLoad] = useState(true);

  // Fetch last date available
  const {
    isError: errorFetchingMinMaxDateAvailable,
    data: minMaxDateAvailable,
    status: statusLastDateAvailable,
    isFetching,
  } = useQuery({
    queryKey: ['minMaxDateAvailable'],
    queryFn: fetchRangeConsumptionDateAvailable,
  });

  // Fetch consumption data
  const {
    isError: errorFetchingdata,
    data: consumptionData,
    status: consumptionCallStatus,
    refetch: fetchConsumptionData,
  } = useQuery({
    queryKey: ['consumptionData', selectedDate],
    refetchOnWindowFocus: false,
    queryFn: fetchLastConsumptionData,
    enabled: !!selectedDate, // Only run this query if selectedDate is not null
  });

  useEffect(() => {
    if (selectedDate && initialLoad) {
      fetchConsumptionData();
      setInitialLoad(false);
    }
  }, [selectedDate, initialLoad, fetchConsumptionData]);

  return {
    minMaxDateAvailable,
    errorFetchingMinMaxDateAvailable,
    statusLastDateAvailable,
    errorFetchingdata,
    initialLoad,
    consumptionData,
    isFetching,
    consumptionCallStatus,
    fetchConsumptionData,
    selectedDate,
    setSelectedDate,
  };
};

export default useFetchConsumption;
