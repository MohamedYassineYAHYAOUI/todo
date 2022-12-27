import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';

import { MemoryRouter } from 'react-router-dom';
import { App, WrappedApp } from '../App';

describe('App', () => {
  it('Renders hello world', () => {
    // Arrange
    render(<WrappedApp />);
    // Act
    // Expect
    expect(
      screen.getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent('Hello World');
  });
  it('Rendes Not Found if invalid path', () => {
    render(
      <MemoryRouter initialEntries={['/bad/routing']}>
        <App />
      </MemoryRouter>
    );
    expect(
      screen.getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent('page not found');
  });
});
