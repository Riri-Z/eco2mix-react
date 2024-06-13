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
}

export const Header = ({
  lastDateAvailable,
  setStartDate,
  setEndDate,
  error,
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
        </div>
      )}
    </>
  );
};
