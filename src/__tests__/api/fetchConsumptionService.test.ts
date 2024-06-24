import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fetchLastConsumptionData,fetchRangeConsumptionDateAvailable } from '../../api/fetchConsumptionService';
import { Iconsumption } from '../../utils/types';

const fetch = vi.fn();

const expectedResult = [
  {
      "id": {
          "timestamp": 1717602333,
          "date": "2024-06-05T15:45:33.000+00:00"
      },
      "codeInseeRegion": "84",
      "date": "2022-06-01",
      "region": "Auvergne-Rhône-Alpes",
      "consommationBruteGazTotale": null,
      "consommationBruteElectriciteRte": 5657,
      "regionCodeISO": null
  },
  {
      "id": {
          "timestamp": 1717602347,
          "date": "2024-06-05T15:45:47.000+00:00"
      },
      "codeInseeRegion": "32",
      "date": "2024-02-29",
      "region": "Hauts-de-France",
      "consommationBruteGazTotale": null,
      "consommationBruteElectriciteRte": 6567,
      "regionCodeISO": null
  }
]
const mockResult: Iconsumption[] = [
  {
    id: null,
    codeInseeRegion: '76',
    date: null,
    region: 'Occitanie',
    consommationBruteGazTotale: 59664,
    consommationBruteElectriciteRte: 211931,
    regionCodeISO: 'fr-occ',
  },
  {
    id: null,
    codeInseeRegion: '27',
    date: null,
    region: 'Bourgogne-Franche-Comté',
    consommationBruteGazTotale: 66042,
    consommationBruteElectriciteRte: 129636,
    regionCodeISO: 'fr-bfc',
  },
  {
    id: null,
    codeInseeRegion: '84',
    date: null,
    region: 'Auvergne-Rhône-Alpes',
    consommationBruteGazTotale: 142277,
    consommationBruteElectriciteRte: 391021,
    regionCodeISO: 'fr-ara',
  },
  {
    id: null,
    codeInseeRegion: '11',
    date: null,
    region: 'Île-de-France',
    consommationBruteGazTotale: 245381,
    consommationBruteElectriciteRte: 397289,
    regionCodeISO: 'fr-idf',
  },
  {
    id: null,
    codeInseeRegion: '75',
    date: null,
    region: 'Nouvelle-Aquitaine',
    consommationBruteGazTotale: 106354,
    consommationBruteElectriciteRte: 254906,
    regionCodeISO: 'fr-naq',
  },
  {
    id: null,
    codeInseeRegion: '44',
    date: null,
    region: 'Grand Est',
    consommationBruteGazTotale: 225910,
    consommationBruteElectriciteRte: 264681,
    regionCodeISO: 'fr-ges',
  },
  {
    id: null,
    codeInseeRegion: '93',
    date: null,
    region: "Provence-Alpes-Côte d'Azur",
    consommationBruteGazTotale: 94776,
    consommationBruteElectriciteRte: 229430,
    regionCodeISO: 'fr-pac',
  },
  {
    id: null,
    codeInseeRegion: '53',
    date: null,
    region: 'Bretagne',
    consommationBruteGazTotale: 57847,
    consommationBruteElectriciteRte: 143469,
    regionCodeISO: 'fr-bre',
  },
  {
    id: null,
    codeInseeRegion: '32',
    date: null,
    region: 'Hauts-de-France',
    consommationBruteGazTotale: 236806,
    consommationBruteElectriciteRte: 309809,
    regionCodeISO: 'fr-hdf',
  },
  {
    id: null,
    codeInseeRegion: '28',
    date: null,
    region: 'Normandie',
    consommationBruteGazTotale: 126888,
    consommationBruteElectriciteRte: 170346,
    regionCodeISO: 'fr-nor',
  },
  {
    id: null,
    codeInseeRegion: '24',
    date: null,
    region: 'Centre-Val de Loire',
    consommationBruteGazTotale: 47212,
    consommationBruteElectriciteRte: 126742,
    regionCodeISO: 'fr-cvl',
  },
  {
    id: null,
    codeInseeRegion: '52',
    date: null,
    region: 'Pays de la Loire',
    consommationBruteGazTotale: 66085,
    consommationBruteElectriciteRte: 165365,
    regionCodeISO: 'fr-pdl',
  },
];

// Helper function to create a mock fetch response
function createFetchResponse(data: typeof mockResult | typeof expectedResult) {
  return {
    ok: true,
    json: () => Promise.resolve(data),
  };
}

describe('fetchLastConsumptionData', () => {
  const mockEnv = {
    VITE_API_URL: 'http://localhost:8080',
    VITE_API_ENDPOINT: '/api',
    VITE_API_ENDPOINT_CONSUMPTION: 'consumption',
  };

  beforeEach(() => {
    vi.resetAllMocks();

    // Mock import.meta.env
    vi.stubGlobal('import.meta', {
      env: mockEnv,
    });
  });

  it('should make a Get request to fetch, and return array of  energy', async () => {
    fetch.mockResolvedValue(createFetchResponse(mockResult));

    const params: { queryKey: [string, Date] } = { queryKey: ['fakeKey', new Date('2024-02-21')] };
    const result = await fetchLastConsumptionData(params);

    const sortFn = (a: Iconsumption, b: Iconsumption) =>
      a.consommationBruteElectriciteRte - b.consommationBruteElectriciteRte;

    expect(result.toSorted(sortFn)).toEqual(mockResult.toSorted(sortFn));
  });
});

describe('fetchRangeConsumptionDateAvailable', ()=> {
  const mockEnv = {
    VITE_API_URL: 'http://localhost:8080',
    VITE_API_ENDPOINT: '/api',
    VITE_API_ENDPOINT_CONSUMPTION: 'consumption',
  };

  beforeEach(() => {
    vi.resetAllMocks();

    // Mock import.meta.env
    vi.stubGlobal('import.meta', {
      env: mockEnv,
    });
  });

  it('should make a Get request to fetch, and return array of  energy', async () => {


    fetch.mockResolvedValue(createFetchResponse(expectedResult));

    const result = await fetchRangeConsumptionDateAvailable();

    expect(result).toEqual(expectedResult);
  });
})