import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highmaps';
import LoadingSpinner from './LoadingSpinner';
import highchartsAccessibility from 'highcharts/modules/accessibility';
import { Iconsumption } from '../utils/types';
import { useMemo } from 'react';
import { nationalMapConfiguration } from '../utils/dataProcessing';

highchartsAccessibility(Highcharts);
interface Props {
  error: {
    state: boolean;
    text: string;
  };
  loading: boolean;
  data: Iconsumption[];
}
export function MapChart({ error, loading, data }: Readonly<Props>) {
  // Compute chartOptions whenever data change
  const chartOptions = useMemo(() => {
    const options = nationalMapConfiguration(data);

    return options;
  }, [data]);

  if (error.state) {
    return <p className="m-auto">{error.text}</p>;
  } else {
    if (loading) {
      return <LoadingSpinner />;
    }
    return (
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'mapChart'}
        options={chartOptions}
      />
    );
  }
}
