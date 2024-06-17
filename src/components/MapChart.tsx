import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highmaps';
import exporting from 'highcharts/modules/exporting';
import LoadingSpinner from './LoadingSpinner';
import highchartsAccessibility from 'highcharts/modules/accessibility';
import { useMemo } from 'react';
import { nationalMapConfiguration } from '../utils/dataProcessing';
import { Iconsumption } from '../utils/types';

exporting(Highcharts);
highchartsAccessibility(Highcharts);

Highcharts.setOptions({
  lang: {
    weekdays: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    printChart: 'Imprimer',
    viewFullscreen: 'Afficher en plein écran',
    downloadPNG: 'Télécharger au format PNG',
    downloadJPEG: 'Télécharger au format JPEG',
    downloadPDF: 'Télécharger au format PDF',
    downloadSVG: 'Télécharger au format SVG',
  },
});

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
    if (!data) {
      return [];
    }

    return nationalMapConfiguration(data);
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
