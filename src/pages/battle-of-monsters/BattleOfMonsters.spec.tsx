import { act, render, screen, waitFor } from '@testing-library/react';
import mockFetch from 'jest-fetch-mock';
import { Provider } from 'react-redux';
import { BattleOfMonsters } from './BattleOfMonsters';

import monstersData from '../../../data/monsters.json';
import { store } from '../../app/store';

const battleOfMonstersFactory = async () => {
  mockFetch.mockResponse((req) => {
    if (req.url.includes('monsters')) {
      return Promise.resolve(JSON.stringify(monstersData.monsters));
    }

    if (req.url.includes('battle')) {
      // Assuming 'battle' is part of the endpoint URL
      return Promise.resolve(
        JSON.stringify({ winner: monstersData.monsters[0] }),
      ); // Mocking a winner for the battle
    }

    return Promise.reject(new Error('not mapped url'));
  });
  render(
    <Provider store={store}>
      <BattleOfMonsters />
    </Provider>,
  );
  await waitFor(() =>
    expect(screen.getByTestId('monsters-list-section').childNodes).toHaveLength(
      monstersData.monsters.length,
    ),
  );
};

describe('BattleOfMonsters', () => {
  beforeEach(() => {
    mockFetch.enableMocks();
    mockFetch.resetMocks();
  });

  it('should render the page container', async () => {
    await battleOfMonstersFactory();
    expect(screen.getByText(/Battle of Monsters/i)).toBeInTheDocument();
    expect(screen.getByTestId('start-battle-button')).toBeInTheDocument();
  });

  it('should enable the start battle button on choose a monster', async () => {
    await battleOfMonstersFactory();
    expect(screen.getByTestId('start-battle-button')).toBeDisabled();
    expect(screen.getByTestId('monster-1')).toBeInTheDocument();
    act(() => screen.getByTestId('monster-1').click());
    expect(screen.getByTestId('start-battle-button')).toBeEnabled();
    act(() => screen.getByTestId('monster-1').click());
    expect(screen.getByTestId('start-battle-button')).toBeDisabled();
  });

  it('should start fight after click on button', async () => {
    await battleOfMonstersFactory();
    expect(screen.getByTestId('monster-1')).toBeInTheDocument();
    await act(() => screen.getByTestId('monster-1').click());
    await act(() => screen.getByTestId('start-battle-button').click());
  });

  it('should display the winner after the battle', async () => {
    mockFetch.mockResponseOnce(JSON.stringify(monstersData.monsters));
    mockFetch.mockResponseOnce(
      JSON.stringify({ winner: monstersData.monsters[0] }),
    );

    await battleOfMonstersFactory();
    await act(() => screen.getByTestId('monster-1').click());
    await act(() => screen.getByTestId('start-battle-button').click());

    expect(
      screen.getByText(`${monstersData.monsters[0].name} wins!`),
    ).toBeInTheDocument();
  });

  it('should select a different computer monster than the player monster', async () => {
    await battleOfMonstersFactory();
    expect(screen.getByTestId('monster-1')).toBeInTheDocument();
    await act(() => screen.getByTestId('monster-1').click());

    // Get the name of the player's monster
    const playerMonsterNameElement = screen.getByTestId('player-monster-name');
    const playerMonsterName = playerMonsterNameElement.textContent;

    // Get the name of the computer's monster using the data-testid
    const computerMonsterNameElement = screen.getByTestId(
      'computer-monster-name',
    );
    const computerMonsterName = computerMonsterNameElement.textContent;

    // Check that the names are not the same
    expect(computerMonsterName).not.toBe(playerMonsterName);
  });
});
