import { describe, it, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { MemoryRouter } from 'react-router-dom';

test('demo', () => {
  expect(true).toBe(true);
});

describe('A truthy statement', () => {
  it('should be equal to 2', () => {
    expect(1 + 1).toEqual(2);
  });
});

describe('render', () => {
  it('renders the main page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const titleElement = getByText("Données éCO2mix nationales")
    console.log('getByText', getByText)
    expect(true).toBeTruthy();
    expect(titleElement).toBeInTheDocument();
  });
});
