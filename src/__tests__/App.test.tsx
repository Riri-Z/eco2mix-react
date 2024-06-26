import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import App from '../App';

describe('render', () => {
  it('renders the main page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const titleElement = getByText('Données éCO2mix nationales');
    expect(titleElement).toBeInTheDocument();
  });
});
