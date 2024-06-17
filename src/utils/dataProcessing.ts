import frenchMap from '@highcharts/map-collection/countries/fr/fr-all.topo.json';
import { format } from 'date-fns';
import Highcharts from 'highcharts';
import { isRangeLongerThanTwoWeeks, timeStampTotimeStampPlusTwo } from './dateUtils';
import { Iconsumption, IEco2mix, TradeItem } from './types';

interface CustomPoint extends Highcharts.Point {
  electricity?: number;
  gas?: number;
}

function dataProcessing(values: IEco2mix[], startDate: string, endDate: string) {
  for (const element of values) {
    element.timeStamp = Date.parse(element.date_heure);
  }
  // Sort data for HighChart.js performance
  values.sort((a, b) => a.timeStamp - b.timeStamp);

  // Mix energie chart
  const seriesElictricityProduction = [
    {
      name: 'Fioul',
      data: values.map((item: IEco2mix) => [
        timeStampTotimeStampPlusTwo(item.timeStamp),
        item.fioul,
      ]),
    },
    {
      name: 'Charbon',
      data: values.map((item: IEco2mix) => [
        timeStampTotimeStampPlusTwo(item.timeStamp),
        item.charbon,
      ]),
    },
    {
      name: 'Gaz',
      data: values.map((item: IEco2mix) => [timeStampTotimeStampPlusTwo(item.timeStamp), item.gaz]),
    },
    {
      name: 'Nucleaire',
      data: values.map((item: IEco2mix) => [
        timeStampTotimeStampPlusTwo(item.timeStamp),
        item.nucleaire,
      ]),
    },
    {
      name: 'Eolien',
      data: values.map((item: IEco2mix) => [
        timeStampTotimeStampPlusTwo(item.timeStamp),
        item.eolien,
      ]),
    },
    {
      name: 'Solaire',
      data: values.map((item: IEco2mix) => [
        timeStampTotimeStampPlusTwo(item.timeStamp),
        item.solaire,
      ]),
    },
    {
      name: 'Hydraulique',
      data: values.map((item: IEco2mix) => [
        timeStampTotimeStampPlusTwo(item.timeStamp),
        item.hydraulique,
      ]),
    },
    {
      name: 'Pompage',
      data: values.map((item: IEco2mix) => [
        timeStampTotimeStampPlusTwo(item.timeStamp),
        item.pompage,
      ]),
    },
    {
      name: 'Bioenergies',
      data: values.map((item: IEco2mix) => [
        timeStampTotimeStampPlusTwo(item.timeStamp),
        item.bioenergies,
      ]),
    },
  ];

  const chartOptionsEco2Mix = {
    chart: {
      borderRadius: 20,
      type: 'area',
    },
    subtitle: {
      text: 'Source: <a id="link-source" href="https://odre.opendatasoft.com/explore/dataset/eco2mix-national-tr/information/?disjunctive.nature" target="_blank">ODRE</a>',
      align: 'left',
    },
    title: {
      text: "La production d'électricité par filière",
      align: 'center',
    },
    yAxis: {
      title: {
        text: ' Mégawattheures (MWh)',
      },
    },
    xAxis: {
      type: 'datetime',
      title: {
        text: 'Date Heure',
      },
    },
    tooltip: {
      xDateFormat: '%d-%m-%y %H:%M',
      followPointer: false,
      split: true,
    },
    plotOptions: {
      area: {
        marker: {
          enabled: false,
        },
      },
    },
    legend: {
      layout: 'horizontal',
      align: 'center',
      verticalAlign: 'bottom',
    },
    series: seriesElictricityProduction,
    exporting: {
      buttons: {
        contextButton: {
          menuItems: isRangeLongerThanTwoWeeks(startDate, endDate),
        },
      },
    },
    credits: {
      enabled: false,
    },
  };

  /* Electricity consumption chart */
  const seriesElectricityConsumption = [
    {
      name: 'Consommation',
      data: values.map((item: IEco2mix) => [
        timeStampTotimeStampPlusTwo(item.timeStamp),
        item.consommation,
      ]),
    },
    {
      name: 'Prevision_j1',
      data: values.map((item: IEco2mix) => [
        timeStampTotimeStampPlusTwo(item.timeStamp),
        item.prevision_j1,
      ]),
    },
    {
      name: 'Prevision_j',
      data: values.map((item: IEco2mix) => [
        timeStampTotimeStampPlusTwo(item.timeStamp),
        item.prevision_j,
      ]),
    },
  ];

  const chartOptionsElectricityConsumption = {
    chart: {
      borderRadius: 20,
    },
    title: {
      text: 'Consommation électrique en France',
      align: 'center',
    },
    loading: {
      hideDuration: 1000,
      showDuration: 1000,
    },
    subtitle: {
      text: 'Source: <a id="link-source"href="https://odre.opendatasoft.com/explore/dataset/eco2mix-national-tr/information/?disjunctive.nature" target="_blank">ODRE</a>',
      align: 'left',
    },
    yAxis: {
      title: {
        text: 'Consommation nationale (MWh)',
      },
    },

    xAxis: {
      type: 'datetime',
      title: {
        text: 'Date Heure',
      },
    },

    legend: {
      layout: 'horizontal',
      align: 'center',
      verticalAlign: 'bottom',
    },
    credits: {
      enabled: false,
    },
    tooltip: {
      followPointer: true,
      xDateFormat: '%d-%m-%y %H:%M',
      shared: true,
    },
    plotOptions: {
      line: {
        marker: {
          enabled: false,
        },
      },
      series: {
        label: {
          connectorAllowed: false,
        },
        pointStart: 2010,
      },
    },
    series: seriesElectricityConsumption,
    exporting: {
      buttons: {
        contextButton: {
          menuItems: isRangeLongerThanTwoWeeks(startDate, endDate),
        },
      },
    },
  };

  /* Co2 rate chart */
  const seriesCo2Rate = [
    {
      name: 'Taux de Co2',

      data: values.map((item: IEco2mix) => [
        timeStampTotimeStampPlusTwo(item.timeStamp),
        item.taux_co2,
      ]),
    },
  ];

  const chartOptionsCo2Rate = {
    chart: {
      borderRadius: 20,
      type: 'line',
    },
    title: {
      text: 'Émissions de CO2 par kWh produit en France',
      align: 'center',
    },
    subtitle: {
      text: 'Source: <a id="link-source"href="https://odre.opendatasoft.com/explore/dataset/eco2mix-national-tr/information/?disjunctive.nature" target="_blank">ODRE</a>',
      align: 'left',
    },
    xAxis: {
      type: 'datetime',
      title: {
        text: 'Date Heure',
      },
    },
    yAxis: {
      title: {
        text: 'Taux Co2 eq/kwh',
      },
    },
    tooltip: {
      xDateFormat: '%d-%m-%y %H:%M',
      followPointer: true,
      shared: true,
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      line: {
        marker: {
          enabled: false,
        },
      },
    },
    series: seriesCo2Rate,
    exporting: {
      buttons: {
        contextButton: {
          menuItems: isRangeLongerThanTwoWeeks(startDate, endDate),
        },
      },
    },
  };

  /* Trade chart */
  const categories = values.map((item: IEco2mix) => {
    return format(Date.parse(item.date_heure), 'dd-MM');
  });

  const xAxis = {
    categories: [...new Set(categories)],
    accessibility: {
      description: 'Date',
    },
    labels: {
      format: '{value:%d-%m}',
    },
    type: 'datetime',
    title: {
      text: 'Date',
    },
  };

  const aggregatedData: TradeItem[] = [];

  values.forEach((item: IEco2mix) => {
    const {
      date,
      ech_comm_angleterre,
      ech_comm_espagne,
      ech_comm_italie,
      ech_comm_suisse,
      ech_comm_allemagne_belgique,
    } = item;

    const index = aggregatedData.findIndex((e: { date: string }) => e.date === date);
    if (index == -1) {
      const newItem = {
        date,
        ech_comm_angleterre,
        ech_comm_espagne,
        ech_comm_italie,
        ech_comm_suisse,
        ech_comm_allemagne_belgique,
      };
      return aggregatedData.push(newItem);
    }

    const tradeProperties = {
      date,
      ech_comm_angleterre,
      ech_comm_espagne,
      ech_comm_italie,
      ech_comm_suisse,
      ech_comm_allemagne_belgique,
    };

    // Compute each values properties
    for (const key in tradeProperties) {
      if (
        key !== 'date' &&
        key !== 'date_heure' &&
        tradeProperties[key as keyof typeof tradeProperties] !== null
      ) {
        const value =
          typeof tradeProperties[key as keyof typeof tradeProperties] === 'string'
            ? parseInt(tradeProperties[key as keyof typeof tradeProperties] as string)
            : (tradeProperties[key as keyof typeof tradeProperties] as number);
        aggregatedData[index][key] = +aggregatedData[index][key] + value;
      }
    }
  });

  //Data is grouped by dates
  const series = aggregatedData.reduce(
    (acc: { name: string; data: number[] }[], curr: { [x: string]: string | number }) => {
      for (const key in curr) {
        if (key !== 'date' && key !== 'date_heure') {
          const index = acc.findIndex((i: { name: string }) => i.name === key);
          const value = +curr[key];
          if (index === -1) {
            acc.push({ name: key, data: [value] });
          } else {
            acc[index].data.push(value);
          }
        }
      }

      return acc;
    },
    []
  );
  const configurationChartCommercialTrade = {
    chart: {
      borderRadius: 20,
      type: 'column',
    },
    title: {
      text: 'Echanges commerciaux avec les pays frontaliers',
      align: 'center',
    },
    subtitle: {
      text: 'Source: <a id="link-source"href="https://odre.opendatasoft.com/explore/dataset/eco2mix-national-tr/information/?disjunctive.nature" target="_blank">ODRE</a>',
      align: 'left',
    },
    xAxis: xAxis,
    yAxis: {
      title: {
        text: 'Mégawattheures (MWh)',
      },
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      column: {
        borderRadius: '25%',
      },
    },
    series: series,
    exporting: {
      buttons: {
        contextButton: {
          menuItems: isRangeLongerThanTwoWeeks(startDate, endDate),
        },
      },
    },
  };

  return [
    chartOptionsEco2Mix,
    chartOptionsElectricityConsumption,
    chartOptionsCo2Rate,
    configurationChartCommercialTrade,
  ];
}

function nationalMapConfiguration(data: Iconsumption[]) {
  const mappedData = data.map((entry) => {
    return {
      'hc-key': entry.regionCodeISO,
      electricity: entry.consommationBruteElectriciteRte,
      gas: entry.consommationBruteGazTotale,
      color: '#7AB2B2',
    };
  });
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

export { dataProcessing, nationalMapConfiguration };
