import { useOutletContext } from 'react-router-dom';

type ContextType = {
  startDate: string | null;
  endDate: string | null;
};

export function useDate() {
  return useOutletContext<ContextType>();
}
