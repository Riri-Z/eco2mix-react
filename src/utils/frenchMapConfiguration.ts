import frenchMap from '@highcharts/map-collection/countries/fr/fr-all.topo.json';
import { Iconsumption } from './types';

interface CustomPoint extends Highcharts.Point {
  electricity: number;
  gas: number;
}

function frenchMapConfiguration(data: Iconsumption[]) {

  //Format data to have the needed categories
  const mappedData = data.map((entry) => {
    return {
      'hc-key': entry.regionCodeISO,
      electricity: entry.consommationBruteElectriciteRte,
      gas: entry.consommationBruteGazTotale,
      color: '#7AB2B2',
    };
  });
  //  configuration for map chart in consumption
  const chartOption = {
    chart: {
      renderTo: 'chart-wrapper',
      map: frenchMap,
      backgroundColor: null,
      height: 550,
      aspectRatio: 16 / 9,
    },
    title: {
      text: "Consommation quotidienne brute régionale (jusqu'en 2024-02-29)",
      style: {
        color: '#FFFFFF',
      },
    },
    accessibility: {
      description: "Consommation quotidienne brute régionale (jusqu'en 2024-02-29)",
    },
    subtitle: {
      text: 'Ce jeu de données présente la consommation régionale d’électricité (en MW) et de gaz (en MW PCS 0°C).',

      style: {
        color: '#FFFFFF',
      },
    },
    mapNavigation: {
      enabled: true,
    },
    tooltip: {
      backgroundColor: '#fff',
      borderRadius: 5,
    },
    colorAxis: {
      min: 0,
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: 'Consommation brute régionale',
        states: {
          hover: {
            color: '#EEF7FF',
          },
        },
        dataLabels: {
          enabled: true,
          format: '{point.name}<br><b>electricité:{point.electricity}<br><b>gaz:{point.gas}',
        },
        allAreas: false,
        tooltip: {
          backgroundColor: null,
          borderWidth: 2,
          shadow: false,
          useHTML: true,
          pointFormatter: function (this: CustomPoint): string {
            return (
              '<span>' +
              this.name +
              '</span><br/>' +
              'Électricité : <b>' +
              this.electricity +
              '</b> MW<br/>' +
              'Gaz : <b>' +
              this.gas +
              '</b> MW (PCS 0°C)'
            );
          },
        },
        data: mappedData,
      },
    ],
    exporting: {
      chartOptions: {
        chart: {
          backgroundColor: '#fff',
        },
      },
    },
  };

  return chartOption;
}

export {  frenchMapConfiguration };
