import { Dispatch, SetStateAction } from 'react';
import { IError } from '../utils/types';
import { DateRangeSelector } from './DateRangeSelector';
import usePathName from '../hooks/usePathName';

interface Props {
  lastDateAvailable: string | null;
  handleLoadData: (startDate: string | null, endDate: string | null) => void;
  startDate: string | null;
  setStartDate: Dispatch<SetStateAction<string | null>>;
  endDate: string | null;
  setEndDate: Dispatch<SetStateAction<string | null>>;
  error: IError;
  handleReloadPage: () => void;
}

export const Header = ({
  lastDateAvailable,
  handleLoadData,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  error,
  handleReloadPage,
}: Props) => {
  const pathname = usePathName().pathname;

  return (
    <>
      {lastDateAvailable && pathname === '/dashboard' && (
        <DateRangeSelector
          lastDateAvailable={lastDateAvailable}
          handleLoadData={handleLoadData}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
      )}

      {error.status && (
        <div className="flex">
          <p className="text-red-400">{error.text}</p>
          {error.type !== 'date' && (
            <button
              className="bg-white h-full text-center text-black rounded-lg w-14 sm:w-24 lg:w-32 ml-2"
              onClick={handleReloadPage}
            >
              <p className="flex flex-col align-middle">Actualiser</p>
            </button>
          )}
        </div>
      )}
    </>
  );
};
