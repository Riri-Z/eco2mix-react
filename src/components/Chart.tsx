import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { ChartProps } from '../utils/types';

export default function Chart({ config }: ChartProps) {
  return (
    <div className="">
      <HighchartsReact highcharts={Highcharts} options={config} />
    </div>
  );
}
