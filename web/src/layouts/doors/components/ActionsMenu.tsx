import { ActionIcon, Menu, Text, Tooltip } from '@mantine/core';
import { TbDots, TbSettings, TbTrash } from 'react-icons/tb';
import { HiOutlineClipboardCopy } from 'react-icons/hi';
import { GiTeleport } from 'react-icons/gi';
import { DoorColumn } from '../../../store/doors';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store';
import { convertData } from '../../../utils/convertData';
import { useClipboard } from '../../../store/clipboard';
import { fetchNui } from '../../../utils/fetchNui';
import { openConfirmModal } from '@mantine/modals';
import { CellContext } from '@tanstack/react-table';
import { useVisibility } from '../../../store/visibility';

const ActionsMenu: React.FC<{ data: CellContext<DoorColumn, unknown> }> = ({ data }) => {
  const navigate = useNavigate();
  const setClipboard = useClipboard((state) => state.setClipboard);
  const setVisible = useVisibility((state) => state.setVisible);
  return (
    <Menu
      position="right-start"
      width={220}
      shadow="md"
      radius="md"
      transition="pop"
      styles={(theme) => ({
        dropdown: {
          background: theme.fn.rgba(theme.colors.dark[7], 0.85),
          border: `1px solid ${theme.fn.rgba(theme.colors.gray[4], 0.15)}`,
          backdropFilter: 'blur(8px)',
        },
        item: {
          borderRadius: theme.radius.md,
        },
      })}
    >
      <Menu.Target>
        <Tooltip label="Door actions">
          <ActionIcon
            color="cyan"
            variant="subtle"
            radius="md"
            size="md"
            sx={(theme) => ({
              border: `1px solid ${theme.fn.rgba(theme.colors.cyan[4], 0.35)}`,
              background: theme.fn.rgba(theme.colors.cyan[4], 0.08),
            })}
          >
            <TbDots size={22} />
          </ActionIcon>
        </Tooltip>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          icon={<TbSettings size={18} />}
          onClick={() => {
            useStore.setState(convertData(data.row.original), true);
            navigate('/settings/general');
          }}
        >
          Settings
        </Menu.Item>
        <Menu.Item
          icon={<HiOutlineClipboardCopy size={18} />}
          onClick={() => {
            setClipboard(convertData(data.row.original));
            fetchNui('notify', 'Settings copied');
          }}
        >
          Copy settings
        </Menu.Item>
        <Menu.Item
          icon={<GiTeleport size={18} />}
          onClick={() => {
            setVisible(false);
            fetchNui('teleportToDoor', data.row.getValue('id'));
          }}
        >
          Teleport to door
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          color="red"
          icon={<TbTrash size={18} />}
          onClick={() =>
            openConfirmModal({
              title: 'Confirm deletion',
              centered: true,
              withCloseButton: false,
              children: (
                <Text>
                  Are you sure you want to delete
                  <Text component="span" weight={700}>{` ${data.row.getValue('name')}`}</Text>?
                </Text>
              ),
              labels: { confirm: 'Confirm', cancel: 'Cancel' },
              confirmProps: { color: 'red' },
              onConfirm: () => {
                fetchNui('deleteDoor', data.row.getValue('id'));
              },
            })
          }
        >
          Delete door
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ActionsMenu;
