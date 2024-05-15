import Chart from './components/Chart';
import { useRouterContext } from './utils/context';
import { ChartConfiguration } from './utils/types';

function Dashboard() {
  const { chartsConfig, loadingCharts } = useRouterContext();

  return (
    <div className="flex ">
      {loadingCharts ? (
        <p>Loading</p>
      ) : (
        <div className="flex flex-col w-full lg:grid grid-cols-2 gap-4 h-5/6 mb-2">
          {chartsConfig.map((chart: ChartConfiguration) => (
            <Chart key={chart?.title?.text} config={chart} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
