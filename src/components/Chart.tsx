import Highcharts from 'highcharts';
import exporting from 'highcharts/modules/exporting';
import highchartsAccessibility from 'highcharts/modules/accessibility';
import HighchartsReact from 'highcharts-react-official';
import { ChartProps } from '../utils/types';

exporting(Highcharts);
highchartsAccessibility(Highcharts);

Highcharts.setOptions({
  lang: {
    months: [
      'Janvier',
      'Février',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juillet',
      'Août',
      'Septembre',
      'Octobre',
      'Novembre',
      'Décembre',
    ],
    weekdays: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    printChart: 'Imprimer',
    viewFullscreen: 'Afficher en plein écran',
    downloadPNG: 'Télécharger au format PNG',
    downloadJPEG: 'Télécharger au format JPEG',
    downloadPDF: 'Télécharger au format PDF',
    downloadSVG: 'Télécharger au format SVG',
  },
  plotOptions: {
    series: {
      states: {
        hover: {
          enabled: true,
          halo: {
            size: 0,
          },
        },
      },
    },
  },
});

export default function Chart({ config }: Readonly<ChartProps>) {
  return <HighchartsReact highcharts={Highcharts} options={config} />;
}
