import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../app/hooks';
import { MonsterBattleCard } from '../../components/monster-battle-card/MonsterBattleCard';
import { MonstersList } from '../../components/monsters-list/MonstersList';
import { Title } from '../../components/title/Title';
import { WinnerDisplay } from '../../components/winner-display/WinnerDisplay';
import { Monster } from '../../models/interfaces/monster.interface';
import { fetchMonstersData } from '../../reducers/monsters/monsters.actions';
import {
  selectMonsters,
  selectSelectedMonster,
} from '../../reducers/monsters/monsters.selectors';
import { MonsterService } from '../../reducers/monsters/monsters.service';
import {
  BattleSection,
  PageContainer,
  StartBattleButton,
} from './BattleOfMonsters.styled';

const BattleOfMonsters = () => {
  const dispatch = useAppDispatch();

  const monsters = useSelector(selectMonsters);
  const selectedMonster = useSelector(selectSelectedMonster);

  const [computerMonster, setComputerMonster] = useState<Monster | null>(null);
  const [winner, setWinner] = useState<Monster | null>(null);

  useEffect(() => {
    dispatch(fetchMonstersData());
  }, []);

  useEffect(() => {
    if (selectedMonster) {
      const availableMonsters = monsters.filter(
        (m) => m.id !== selectedMonster.id,
      );
      const randomMonster =
        availableMonsters[Math.floor(Math.random() * availableMonsters.length)];
      setComputerMonster(randomMonster);
    }
  }, [selectedMonster]);

  const handleStartBattleClick = async () => {
    // Fight!
    if (selectedMonster && computerMonster) {
      const result = await MonsterService.battle(
        selectedMonster.id,
        computerMonster.id,
      );
      setWinner(result.winner);
    }
  };

  return (
    <PageContainer>
      <Title>Battle of Monsters</Title>
      <MonstersList monsters={monsters} />
      <BattleSection>
        <MonsterBattleCard monster={selectedMonster} title="Player" />
        <StartBattleButton
          data-testid="start-battle-button"
          disabled={selectedMonster === null}
          onClick={handleStartBattleClick}>
          Start Battle
        </StartBattleButton>
        <MonsterBattleCard monster={computerMonster} title="Computer" />
      </BattleSection>
      {winner && <WinnerDisplay text={winner.name} />}
    </PageContainer>
  );
};

export { BattleOfMonsters };
