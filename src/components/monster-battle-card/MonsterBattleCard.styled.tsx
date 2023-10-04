import styled from '@emotion/styled';
import {
  Card,
  Divider,
  LinearProgress,
  linearProgressClasses,
  Typography,
} from '@mui/material';
import { colors } from '../../constants/colors';

export const BattleMonsterCard = styled(Card)(() => ({
  padding: '13px 11px',
  width: 'calc(307px - 22px)',
  height: '390px',
  background: colors.white,
  boxShadow: '-2px 3px 10px rgba(0, 0, 0, 0.25)',
  borderRadius: '7px',
  display: 'auto',
  alignItems: 'auto',
  justifyContent: 'auto',
}));

export const BattleMonsterTitle = styled(Typography)(() => ({
  position: 'relative',
  fontSize: '22px',
  fontFamily: 'Roboto',
  color: '#000',
  textAlign: 'left',
}));

export const Underline = styled(Divider)(() => ({
  position: 'relative',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  boxSizing: 'border-box',
  width: '100%',
  height: '1px',
}));

export const BattleMonsterStatTitle = styled(Typography)(() => ({
  position: 'relative',
  fontSize: '12px',
  fontFamily: 'Roboto',
  color: '#000',
  textAlign: 'left',
  marginTop: '15px',
}));

export const ProgressBar = styled(LinearProgress)(() => ({
  height: 8,
  borderRadius: 15,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: colors.progressBarBackground,
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 15,
    backgroundColor: colors.progressColor,
  },
}));

export const Image = styled.img(() => ({
  position: 'relative',
  borderRadius: '7px',
  width: '100%',
  height: '178px',
  backgroundImage: "url('/image-1@3x.png')",
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'top',
}));
