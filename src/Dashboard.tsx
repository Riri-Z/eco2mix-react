import Chart from './components/Chart';
import LoadingSpinner from './components/LoadingSpinner';
import { useRouterContext } from './utils/context';
import { ChartConfiguration } from './utils/types';

function Dashboard() {
  const { chartsConfig, loadingCharts } = useRouterContext();

  return (
    <>
      {loadingCharts ? (
        <LoadingSpinner />
      ) : (
        <div className="flex flex-col gap-1">
          <p className="italic font-quickSandLight text-white text-xs">
            * Si la période est supérieur à deux semaines, vous ne pourrez pas télécharger les
            formats suivants : PNG, JPEG, PDF, et SVG
          </p>
          <div className="flex flex-col w-full lg:grid grid-cols-2 gap-4 h-5/6 mb-2">
            {chartsConfig.map((chart: ChartConfiguration) => (
              <Chart key={chart?.title?.text} config={chart} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
/*
padding: 0;
    margin: 0;
    font-size: .7rem;
    font-style: italic;
    color: #f6f4ec;

*/
export default Dashboard;
