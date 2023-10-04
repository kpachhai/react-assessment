import { Monster } from '../../models/interfaces/monster.interface';
import {
  BattleMonsterCard,
  BattleMonsterTitle,
} from './MonsterBattleCard.styled';

type MonsterCardProps = {
  monster?: Monster | null;
  title?: string;
};

const MonsterBattleCard: React.FC<MonsterCardProps> = ({ monster, title }) => {
  return (
    <BattleMonsterCard centralized>
      <BattleMonsterTitle>{monster?.name}</BattleMonsterTitle>
      {monster && (
        <div>
          <p>Attack: {monster.attack}</p>
          <p>Defense: {monster.defense}</p>
          <p>HP: {monster.hp}</p>
          <p>Speed: {monster.speed}</p>
          <p>Type: {monster.type}</p>
        </div>
      )}
    </BattleMonsterCard>
  );
};

export { MonsterBattleCard };
