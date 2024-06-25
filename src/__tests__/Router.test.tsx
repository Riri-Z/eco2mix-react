import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import App from '../App';
import ErrorPage from '../error-page';
import Dashboard from '../pages/Dashboard';
import { Consumption } from '../pages/Consumption';
import { BrowserRouter } from 'react-router-dom';

describe('Router test link and redirection', () => {
  test('check home route', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Données éCO2mix nationales/)).toBeDefined;
  });

  test('check redirect to consumption page', async () => {
    render(<App />, { wrapper: BrowserRouter });
    expect(screen.getByText('eco2Mix')).toBeInTheDocument();

    const user = userEvent.setup();
    const consommations = vi.spyOn(user, 'click');
    const consommationLink = screen.getByText(/consommations/i);
    await user.click(consommationLink);

    expect(consommations).toHaveBeenCalledTimes(1);
  });

  test('check to show error page on nonexisting page', () => {
    const redirectToBadRoute = '/bad/route';

    render(
      <MemoryRouter initialEntries={[redirectToBadRoute]}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/national-energy-consumption" element={<Consumption />}></Route>
          <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/La page que vous essayer d'accéder n'existe pas/)).toBeDefined;
  });
});
