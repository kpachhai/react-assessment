import { render, screen } from '@testing-library/react';
import { MonsterBattleCard } from './MonsterBattleCard';

const mockMonster = {
  id: 'monster-1',
  name: 'Test Monster',
  imageUrl: 'test-image-url',
  hp: 50,
  attack: 60,
  defense: 70,
  speed: 80,
  type: 'fire',
};

describe('MonsterBattleCard', () => {
  it('should render monster stats correctly', () => {
    render(<MonsterBattleCard monster={mockMonster} />);

    expect(screen.getByText(mockMonster.name)).toBeInTheDocument();
    expect(screen.getByText('HP')).toBeInTheDocument();
    expect(screen.getByText('Attack')).toBeInTheDocument();
    expect(screen.getByText('Defense')).toBeInTheDocument();
    expect(screen.getByText('Speed')).toBeInTheDocument();
    // Add more assertions as needed
  });

  it('should render progress bars with correct values', () => {
    render(<MonsterBattleCard monster={mockMonster} />);

    const hpProgressBar = screen.getByLabelText('HP progress');
    const attackProgressBar = screen.getByLabelText('Attack progress');
    const defenseProgressBar = screen.getByLabelText('Defense progress');
    const speedProgressBar = screen.getByLabelText('Speed progress');

    expect(hpProgressBar).toHaveAttribute(
      'aria-valuenow',
      mockMonster.hp.toString(),
    );
    expect(attackProgressBar).toHaveAttribute(
      'aria-valuenow',
      mockMonster.attack.toString(),
    );
    expect(defenseProgressBar).toHaveAttribute(
      'aria-valuenow',
      mockMonster.defense.toString(),
    );
    expect(speedProgressBar).toHaveAttribute(
      'aria-valuenow',
      mockMonster.speed.toString(),
    );
  });
});
