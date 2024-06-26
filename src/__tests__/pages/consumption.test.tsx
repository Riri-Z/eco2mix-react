import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import Consumption from '../../pages/Consumption';

// Initial mock implementation
 const initialMock = {
  minMaxDateAvailable: [
    {
      date: '2022-06-01',
    },
    {
      date: '2024-02-29',
    },
  ],
  statusLastDateAvailable: 'success',
  fetchConsumptionData: vi.fn(),
  consumptionData: [
    {
      region: 'Auvergne-Rhône-Alpes',
      consommationBruteGazTotale: 158180,
      consommationBruteElectriciteRte: 398591,
    },
  ],
  isFetching: false,
  consumptionCallStatus: 'success',
  selectedDate: new Date('2024-02-29'),
  setSelectedDate: vi.fn(),
};

const loadingMock = {
  minMaxDateAvailable: null,
  statusLastDateAvailable: 'pending',
  fetchConsumptionData: vi.fn(),
  consumptionData: [],
  isFetching: true,
  consumptionCallStatus: 'pending',
  selectedDate: null,
  setSelectedDate: vi.fn(),
};

const queryClient = new QueryClient();

describe('Consumption component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });
  test('renders correctly', async () => {
    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <Consumption />
        </QueryClientProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Sélectionner une date :')).toBeInTheDocument();
    });
  });

  test('renders LoadingSpinner when data is loading', async () => {
    vi.mock('../hooks/useFetchConsumption', () => ({
      __esModule: true,
      default: () => loadingMock,
    }));

    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <Consumption />
        </QueryClientProvider>
      </MemoryRouter>
    );
    screen.debug();
    waitFor(()=> {
      expect(screen.getByRole('textbox')).toHaveValue(null);
    })
  });

  test('renders DatePicker and MapChart when data is available', async () => {
    vi.mock('../hooks/useFetchConsumption', () => ({
      __esModule: true,
      default: () => initialMock,
    }));
   render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <Consumption />
        </QueryClientProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByRole('textbox')).toHaveValue('29-02-2024');
      expect(screen.getByText('Auvergne-Rhône-Alpes')).toBeInTheDocument();
    });
  });
});
