import { isWithinInterval } from 'date-fns';
import { useEffect, useState } from 'react';
import { DatePicker } from 'rsuite';
import useFetchConsumption from '../hooks/useFetchConsumption';
import { MapChart } from '../components/MapChart';
import LoadingSpinner from '../components/LoadingSpinner';

const Consumption: React.FC = () => {
  const [lastDateAvailable, setLastDateAvailable] = useState<Date | null>(null);
  const [startDateAvailable, setStartDateAvailable] = useState<Date | null>(null);

  const {
    minMaxDateAvailable,
    statusLastDateAvailable,
    fetchConsumptionData,
    consumptionData,
    isFetching,
    consumptionCallStatus,
    selectedDate,
    setSelectedDate,
  } = useFetchConsumption();
  // Init state from useQuery fetch
  useEffect(() => {
    if (
      statusLastDateAvailable === 'success' &&
      minMaxDateAvailable &&
      minMaxDateAvailable.length === 2
    ) {
      const [start, end] = minMaxDateAvailable;
      if (start.date && end.date) {
        setSelectedDate(new Date(end.date));
        setLastDateAvailable(new Date(end.date));
        setStartDateAvailable(new Date(start.date));
      }
    }
  }, [statusLastDateAvailable, minMaxDateAvailable]);

  //Fetch data when update selectedDate
  useEffect(() => {
    if (consumptionCallStatus === 'success' && selectedDate != null) {
      fetchConsumptionData();
    }
    //
  }, [consumptionCallStatus, selectedDate]);

  // Disable dates which are not in range minMaxDateAvailable
  const handleDisableDate = (date: Date) => {
    if (startDateAvailable && lastDateAvailable) {
      return !isWithinInterval(date, {
        start: startDateAvailable,
        end: lastDateAvailable,
      });
    } else {
      return false;
    }
  };

  // Condition to display error status
  const isError = { state: consumptionCallStatus === 'error', text: 'Erreur de chargement des données' };

  // Condition to display date picker
  const shouldDisplayDate = selectedDate && startDateAvailable && lastDateAvailable;

  // Condition to display the loader
  const shouldDisplayLoader = !selectedDate || consumptionCallStatus === 'pending';

  // Condition to display map
  const shouldDisplayConsumptionMap = consumptionData && !isFetching;
  return (
    <>
      {shouldDisplayDate && (
        <div className="flex flex-col w-fit gap-2">
          <p>Sélectionner une date :</p>
          <DatePicker
            value={selectedDate}
            format="dd-MM-yyyy"
            // Allow selection of dates within a 3-month period
            onChange={setSelectedDate}
            // Disabled keyboard input
            editable={false}
            oneTap
            // Remove default options
            ranges={[]}
            shouldDisableDate={handleDisableDate}
          />
        </div>
      )}

      {shouldDisplayLoader && <LoadingSpinner />}

      <div className="flex w-full justify-center">
        {shouldDisplayConsumptionMap && <MapChart error={isError} data={consumptionData} />}
      </div>
    </>
  );
};

export default Consumption;