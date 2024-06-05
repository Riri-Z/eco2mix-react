import { LIMIT_START_DATE_DATA } from '../utils/constant';
import { FunctionComponent, Dispatch, SetStateAction, useState } from 'react';
import { Tooltip } from './Tooltip';
import { compareAsc, parseISO, subMonths } from 'date-fns';

interface Props {
  lastDateAvailable: string | null;
  handleLoadData: (startDate: string | null, endDate: string | null) => void;
  startDate: string | null;
  setStartDate: Dispatch<SetStateAction<string | null>>;
  endDate: string | null;
  setEndDate: Dispatch<SetStateAction<string | null>>;
}

export const SelectDate: FunctionComponent<Props> = ({
  lastDateAvailable,
  handleLoadData,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  const [isPeriodeTooWide, setIsPeriodeTooWide] = useState(false);

  const handleReloadCharts = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault();

    if (startDate && endDate) {
      if (isPeriodLongerThanSixMonths(startDate, endDate)) {
        setIsPeriodeTooWide(false);
        // Call to Update chart data
        handleLoadData(startDate, endDate);
      } else {
        // display error on tooltip
        setIsPeriodeTooWide(true);
      }
    }
  };

  function isPeriodLongerThanSixMonths(startDate: string, endDate: string): boolean {
    const start = parseISO(startDate);
    const end = parseISO(endDate);
    const sixMonthAgo = subMonths(end, 6);

    if (compareAsc(start, sixMonthAgo) === -1) {
      return false;
    }
    return true;
  }

  const ReloadButton = (
    <button
      className="bg-white h-full text-center text-black rounded-lg w-14 sm:w-24 lg:w-32 ml-2"
      onClick={handleReloadCharts}
    >
      <p className="flex flex-col align-middle">Valider</p>
    </button>
  );

  return (
    <div className="flex h-22 gap-2 justify-center align-middle lg:justify-start">
      <label className="text-sm flex items-center	 lg:text-base" htmlFor="start">
        Début :
      </label>
      <input
        className="text-black rounded-lg text-center w-28 lg:text-base"
        type="date"
        id="start"
        name="trip-start"
        onChange={(e) => setStartDate(e.target.value)}
        value={startDate ?? ''}
        min={LIMIT_START_DATE_DATA}
        max={lastDateAvailable ?? ''}
      />
      <label className="text-sm flex items-center lg:text-base" htmlFor="end">
        Fin :
      </label>

      <input
        className="text-black rounded-lg text-center w-28   lg:text-base"
        type="date"
        id="end"
        name="trip-start"
        onChange={(e) => setEndDate(e.target.value)}
        value={endDate ?? ''}
        min={LIMIT_START_DATE_DATA}
        max={lastDateAvailable ?? ''}
      />
      <Tooltip
        text="Veuillez choisir une période de six mois au maximum"
        statusError={isPeriodeTooWide}
      >
        {ReloadButton}
      </Tooltip>
    </div>
  );
};
