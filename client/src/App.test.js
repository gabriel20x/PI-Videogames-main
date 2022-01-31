import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import App from './App';

test('renders Press Start Button', () => {
  render(
  <MemoryRouter>
    <App />
  </MemoryRouter>
  );
  const linkElement = screen.getByText(/Press Start/i);
  expect(linkElement).toBeInTheDocument();
});
