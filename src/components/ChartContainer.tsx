import useFetchChartData from '../hooks/useFetchChartData';
import { ChartConfiguration } from '../utils/types';
import Chart from './Chart';
import { DateRangeSelector } from './DateRangeSelector';
import LoadingSpinner from './LoadingSpinner';

function ChartContainer() {
  const {
    setStartDate,
    setEndDate,
    chartsConfig,
    lastDateAvailable,
    statusLastDateAvailable,
    statusFetchingChart,
  } = useFetchChartData();

  const shouldDisplayDateRangeSelector =
    statusLastDateAvailable === 'success' && chartsConfig && chartsConfig.length > 0;

  const shouldDisplayLoader =
    statusLastDateAvailable === 'pending' && statusFetchingChart === 'pending';

  return (
    <>
      {shouldDisplayLoader && <LoadingSpinner />}
      {shouldDisplayDateRangeSelector && lastDateAvailable && (
        <DateRangeSelector
          lastDateAvailable={lastDateAvailable}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
      )}

      {statusFetchingChart === 'success' && (
        <div className="flex flex-col gap-1">
          <p className="italic text-center md:text-left font-quickSandLight text-white text-xs">
            * Si la période est supérieur à deux semaines, vous ne pourrez pas télécharger les
            formats suivants : PNG, JPEG, PDF, et SVG
          </p>

          <div className="flex flex-col w-full lg:grid grid-cols-2 gap-4 h-5/6 mb-2">
            {chartsConfig.map((chart: ChartConfiguration) => (
              <div key={chart?.title?.text} className="w-full">
                <Chart config={chart} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default ChartContainer;
