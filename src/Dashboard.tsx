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
        chartsConfig.map((chart: ChartConfiguration) => (
          <Chart key={chart?.title?.text} config={chart} />
        ))
      )}
    </div>
  );
}

export default Dashboard;
