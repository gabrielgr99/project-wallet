import React from 'react';
import { screen } from '@testing-library/react';
import { response as mockData, initialStateWithExpenses } from './mocks/mockData';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndStore } from './helpers/testConfig';

const mockFetch = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(mockData),
    }));
};

describe('7 - Desenvolva uma tabela com os gastos contendo as seguintes características:', () => {
  beforeEach(mockFetch);
  afterEach(() => jest.clearAllMocks());
  const initial = initialStateWithExpenses;

  test('A tabela deve possuir um cabeçalho com os campos Descrição, Tag, Pagamento, Valor, Moeda, Câmbio, Valor convertido e Moeda corrente', () => {
    renderWithRouterAndStore(<Wallet />, '/carteira', initial);

    expect(screen.getByRole('columnheader', { name: 'Descrição' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Tag' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Pagamento' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Moeda' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Câmbio' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Valor convertido' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Moeda corrente' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Editar/Excluir' })).toBeInTheDocument();
  });
});
