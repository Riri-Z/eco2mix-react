import { Dispatch, SetStateAction } from 'react';
import { DateRangeSelector } from './DateRangeSelector';
import usePathName from '../hooks/usePathName';
import { RefetchOptions } from '@tanstack/react-query';

const ERROR_API =
  "Désolé, le serveur n'est pas disponible actuellement, veuillez revenir plus tard";

interface Props {
  lastDateAvailable: string | null;
  handleLoadData:any /*   (options?: RefetchOptions) => Promise<QueryObserverResult<any, Error>> */;
  startDate: string | null;
  setStartDate: Dispatch<SetStateAction<string | null>>;
  endDate: string | null;
  setEndDate: Dispatch<SetStateAction<string | null>>;
  error: boolean;
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

      {error && (
        <div className="flex">
          <p className="text-red-400">{ERROR_API}</p>
          <button
            className="bg-white h-full text-center text-black rounded-lg w-14 sm:w-24 lg:w-32 ml-2"
            onClick={handleReloadPage}
          >
            <p className="flex flex-col align-middle">Actualiser</p>
          </button>
        </div>
      )}
    </>
  );
};
