import { Monster } from '../../models/interfaces/monster.interface';
import {
  BattleMonsterCard,
  BattleMonsterStatTitle,
  BattleMonsterTitle,
  Image,
  ProgressBar,
  Underline,
} from './MonsterBattleCard.styled';

type MonsterCardProps = {
  monster?: Monster | null;
  title?: string;
};

const MonsterBattleCard: React.FC<MonsterCardProps> = ({ monster, title }) => {
  return (
    <BattleMonsterCard>
      {monster && (
        <>
          <Image src={monster?.imageUrl} />
          <BattleMonsterTitle>{monster?.name}</BattleMonsterTitle>
          <Underline></Underline>

          <BattleMonsterStatTitle>HP</BattleMonsterStatTitle>
          <ProgressBar variant="determinate" value={monster.hp} />

          <BattleMonsterStatTitle>Attack</BattleMonsterStatTitle>
          <ProgressBar variant="determinate" value={monster.attack} />

          <BattleMonsterStatTitle>Defense</BattleMonsterStatTitle>
          <ProgressBar variant="determinate" value={monster.defense} />

          <BattleMonsterStatTitle>Speed</BattleMonsterStatTitle>
          <ProgressBar variant="determinate" value={monster.speed} />
        </>
      )}
    </BattleMonsterCard>
  );
};

export { MonsterBattleCard };
