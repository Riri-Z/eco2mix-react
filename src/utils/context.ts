import { useOutletContext } from 'react-router-dom';

type ContextType = {
  startDate: string | null;
  endDate: string | null;
  chartsConfig: [];
  loadingCharts: boolean;
};

export function useRouterContext() {
  return useOutletContext<ContextType>();
}
