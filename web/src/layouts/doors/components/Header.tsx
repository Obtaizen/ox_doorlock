import { ActionIcon, CloseButton, createStyles, Group, Tooltip } from '@mantine/core';
import { TbPlus } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { useVisibility } from '../../../store/visibility';
import { fetchNui } from '../../../utils/fetchNui';
import Searchbar from './Search';
import { useStore, defaultState } from '../../../store';

const useStyles = createStyles((theme) => ({
  main: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.md,
    padding: 16,
    paddingBottom: 8,
    background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
    border: `1px solid ${theme.fn.rgba(theme.colors.gray[4], 0.2)}`,
    boxShadow: '0 20px 45px rgba(0, 0, 0, 0.35)',
    borderRadius: theme.radius.md,
    backdropFilter: 'blur(10px)',
  },
}));

const Header: React.FC = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const setVisible = useVisibility((state) => state.setVisible);

  return (
    <Group className={classes.main} position="apart">
      <Tooltip label="Create a new door" transition="pop">
        <ActionIcon
          variant="gradient"
          gradient={{ from: 'cyan', to: 'teal' }}
          radius="md"
          color="cyan"
          size="lg"
          sx={{ boxShadow: '0 10px 30px rgba(0, 0, 0, 0.35)' }}
          onClick={() => {
            useStore.setState(defaultState, true);
            navigate('/settings/general');
          }}
        >
          <TbPlus size={20} />
        </ActionIcon>
      </Tooltip>
      <Searchbar />
      <CloseButton
        iconSize={18}
        size="lg"
        radius="md"
        sx={(theme) => ({
          border: `1px solid ${theme.fn.rgba(theme.colors.gray[4], 0.25)}`,
          background: theme.fn.rgba(theme.colors.dark[6], 0.6),
          transition: 'transform 120ms ease, border-color 120ms ease',
          '&:hover': {
            borderColor: theme.colors.cyan[5],
            transform: 'translateY(-1px)',
          },
        })}
        onClick={() => {
          setVisible(false);
          fetchNui('exit');
        }}
      />
    </Group>
  );
};

export default Header;
