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
  titleTestId?: string;
};

const MonsterBattleCard: React.FC<MonsterCardProps> = ({
  monster,
  titleTestId,
}) => {
  return (
    <BattleMonsterCard>
      {monster && (
        <>
          <Image src={monster?.imageUrl} />
          <BattleMonsterTitle data-testid={titleTestId}>
            {monster?.name}
          </BattleMonsterTitle>

          <Underline></Underline>

          <BattleMonsterStatTitle>HP</BattleMonsterStatTitle>
          <ProgressBar
            aria-label="HP progress"
            variant="determinate"
            value={monster.hp}
          />

          <BattleMonsterStatTitle>Attack</BattleMonsterStatTitle>
          <ProgressBar
            aria-label="Attack progress"
            variant="determinate"
            value={monster.attack}
          />

          <BattleMonsterStatTitle>Defense</BattleMonsterStatTitle>
          <ProgressBar
            aria-label="Defense progress"
            variant="determinate"
            value={monster.defense}
          />

          <BattleMonsterStatTitle>Speed</BattleMonsterStatTitle>
          <ProgressBar
            aria-label="Speed progress"
            variant="determinate"
            value={monster.speed}
          />
        </>
      )}
    </BattleMonsterCard>
  );
};

export { MonsterBattleCard };
