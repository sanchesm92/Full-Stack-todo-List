import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import App from '../App';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

describe('Testando a rota /', () => {
  it('Verificar se o input para add tasks está na tela', () => {
    renderWithRouter(
      <App />,
    );
    const input = screen.getByRole('textbox', {
      name: /task:/i
    })
    expect(input).toBeInTheDocument();
  });
  it('Verificar se o button para add task está desabilitado', () => {
    renderWithRouter(
      <App />,
    );
    const input = screen.getByRole('textbox', {
      name: /task:/i
    })
    const getbtn = screen.getByRole('button', {
      name: /add task/i
    })
    expect(getbtn).toBeDisabled();
    userEvent.click(input)
    userEvent.keyboard('foo')
    expect(getbtn).toBeInTheDocument();
  });
});