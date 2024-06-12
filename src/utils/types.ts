export interface ChartConfiguration {
  chart: {
    borderRadius: number;
    type?: string;
  };
  title: {
    text: string;
  };
  subtitle?: object;
  yAxis?: object;
  xAxis?: object;
  legend?: object;
  credits?: object;
  tooltip?: object;
  plotOptions?: object;
  series: object;
}

export interface IEco2mix {
  id: number;
  perimetre: string;
  nature: string;
  date: string;
  heure: string;
  date_heure: string;
  consommation: number;
  prevision_j1: number;
  prevision_j: number;
  fioul: number;
  charbon: number;
  gaz: number;
  nucleaire: number;
  eolien: number;
  solaire: number;
  hydraulique: number;
  pompage: number;
  bioenergies: number;
  taux_co2: number;
  ech_comm_angleterre: string;
  ech_comm_espagne: number;
  ech_comm_italie: number;
  ech_comm_suisse: number;
  ech_comm_allemagne_belgique: string;
  stockage_batterie: string;
  destockage_batterie: string;
  timeStamp: number;
}

export interface TradeItem {
  date: string;
  ech_comm_angleterre: string;
  ech_comm_espagne: number;
  ech_comm_italie: number;
  ech_comm_suisse: number;
  ech_comm_allemagne_belgique: string;
  [key: string]: string | number;
}

export interface IError {
  status: boolean;
  text: null | string;
  type:string
}

export interface Ilink {
  key: string;
  path: string;
  text: string;
  logo: string;
  active: boolean;
  handleSelectedLink: (path: string) => void;
}

export interface ChartProps {
  config: ChartConfiguration;
}

export interface Iconsumption {
  regionCodeISO: string;
  consommationBruteElectriciteRte: number;
  consommationBruteGazTotale: number;
}

export interface DateRange {
  startDate: string | null;
  endDate: string | null;
  currentDate: string | null;
}
