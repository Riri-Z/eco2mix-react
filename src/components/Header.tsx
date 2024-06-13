import { Dispatch, SetStateAction } from 'react';
import { DateRangeSelector } from './DateRangeSelector';
import usePathName from '../hooks/usePathName';

const ERROR_API =
  "Désolé, le serveur n'est pas disponible actuellement, veuillez revenir plus tard";

interface Props {
  lastDateAvailable: string | null;
  setStartDate: Dispatch<SetStateAction<string | null>>;
  setEndDate: Dispatch<SetStateAction<string | null>>;
  error: boolean;
  handleReloadPage: () => void;
}

export const Header = ({
  lastDateAvailable,
  setStartDate,
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
          setStartDate={setStartDate}
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
