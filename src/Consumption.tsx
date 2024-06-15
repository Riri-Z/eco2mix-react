import { isWithinInterval } from 'date-fns';
import { useEffect, useState } from 'react';
import { DatePicker } from 'rsuite';
import useFetchConsumption from './hooks/useFetchConsumption';
import { MapChart } from './components/MapChart';

export const Consumption = () => {
  const [lastDateAvailable, setLastDateAvailable] = useState<Date | null>(null);
  const [startDateAvailable, setStartDateAvailable] = useState<Date | null>(null);

  const {
    minMaxDateAvailable,
    statusLastDateAvailable,
    fetchConsumptionData,
    consumptionData,
    consumptionCallStatus,
    selectedDate,
    setSelectedDate,
  } = useFetchConsumption();

  useEffect(() => {
    if (
      statusLastDateAvailable === 'success' &&
      minMaxDateAvailable &&
      minMaxDateAvailable.length === 2
    ) {
      setSelectedDate(new Date(minMaxDateAvailable[1]?.date));
      setLastDateAvailable(new Date(minMaxDateAvailable[1]?.date));
      setStartDateAvailable(new Date(minMaxDateAvailable[0]?.date));
    }
  }, [statusLastDateAvailable, minMaxDateAvailable]);

  //Fetch data when update selectedDate
  useEffect(() => {
    // change date
    //call Api useFetchConsumption
    if (consumptionCallStatus === 'success' && selectedDate != null) {
      fetchConsumptionData();
    }
    //
  }, [consumptionCallStatus, selectedDate]);

  // Disable dates which are not in range minMaxDateAvailable
  const handleDisableDate = (date: Date) => {
    return !isWithinInterval(date, {
      start: minMaxDateAvailable[0]?.date,
      end: minMaxDateAvailable[1]?.date,
    });
  };

  const isError = { state: consumptionCallStatus === 'error', text: '' };

  return (
    <>
      {selectedDate && startDateAvailable && lastDateAvailable && (
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

      <div className="flex w-full justify-center">
        <MapChart
          error={isError}
          loading={consumptionCallStatus === 'pending'}
          data={consumptionData}
        />
      </div>
    </>
  );
};
