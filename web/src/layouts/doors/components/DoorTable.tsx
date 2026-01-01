import { Table, UnstyledButton, Text, Group, Center, Stack, Pagination, Paper, Button } from '@mantine/core';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useEffect, useMemo, useState } from 'react';
import { TbSelector, TbChevronDown, TbChevronUp, TbSearch, TbPlus } from 'react-icons/tb';
import { useSearch } from '../../../store/search';
import { useDoors, type DoorColumn } from '../../../store/doors';
import ActionsMenu from './ActionsMenu';
import { useNavigate } from 'react-router-dom';
import { useStore, defaultState } from '../../../store';

const DoorTable: React.FC = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const globalFilter = useSearch((state) => state.debouncedValue);
  const data = useDoors((state) => state.doors);
  const navigate = useNavigate();

  const columns = useMemo<ColumnDef<DoorColumn>[]>(
    () => [
      {
        id: 'id',
        header: 'ID',
        accessorKey: 'id',
        cell: (info) => info.getValue(),
        enableHiding: false,
        enableGlobalFilter: false,
      },
      {
        id: 'name',
        header: 'Name',
        accessorKey: 'name',
        cell: (info) => info.getValue(),
        enableHiding: false,
      },
      {
        id: 'zone',
        header: 'Zone',
        accessorKey: 'zone',
        cell: (info) => info.getValue(),
        enableHiding: false,
      },
      {
        id: 'options-menu',
        cell: (data) => <ActionsMenu data={data} />,
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    initialState: {
      pagination: {
        pageSize: 8,
        pageIndex: 0,
      },
    },
    state: {
      sorting,
      globalFilter,
    },
    onGlobalFilterChange: useSearch((state) => state.setValue),
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  useEffect(() => {
    table.setPageIndex(currentPage - 1);
  }, [currentPage, data, table]);

  return (
    <Stack justify="space-between" align="center" sx={{ height: '100%', paddingBottom: 16 }} spacing="md">
      <Paper
        withBorder
        sx={(theme) => ({
          width: '100%',
          background: theme.fn.rgba(theme.colors.dark[7], 0.6),
          borderColor: theme.fn.rgba(theme.colors.gray[4], 0.2),
          backdropFilter: 'blur(8px)',
        })}
      >
        {table.getFilteredRowModel().rows.length > 0 ? (
          <Table
            striped
            highlightOnHover
            verticalSpacing="md"
            horizontalSpacing="md"
            sx={(theme) => ({
              'thead th': {
                background: 'transparent',
                borderBottom: `1px solid ${theme.fn.rgba(theme.colors.gray[4], 0.25)}`,
                textTransform: 'uppercase',
                letterSpacing: 0.5,
                fontSize: 12,
                color: theme.colors.gray[3],
              },
              'tbody tr': {
                transition: 'transform 120ms ease, box-shadow 150ms ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
                },
              },
              'tbody td': {
                borderBottom: 'none',
              },
            })}
          >
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id}>
                      {header.isPlaceholder ? null : (
                        <UnstyledButton
                          onClick={header.column.getToggleSortingHandler()}
                          sx={(theme) => ({
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                            color: theme.white,
                            fontWeight: 600,
                            transition: 'color 100ms ease',
                            '&:hover': { color: theme.colors.cyan[4] },
                          })}
                        >
                          <Group spacing={4}>
                            <Text>{flexRender(header.column.columnDef.header, header.getContext())}</Text>
                            {header.column.getIsSorted() === 'desc' ? (
                              <TbChevronDown color="#5ee0ff" />
                            ) : header.column.getIsSorted() === 'asc' ? (
                              <TbChevronUp color="#5ee0ff" />
                            ) : !header.column.getCanHide() ? (
                              <TbSelector />
                            ) : null}
                          </Group>
                        </UnstyledButton>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getAllCells().map((cell) => (
                    <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Center sx={{ height: '100%' }} p="xl">
            <Stack align="center" spacing="xs">
              <TbSearch size={48} />
              <Text size="lg">No results found</Text>
              <Button
                leftIcon={<TbPlus size={18} />}
                variant="gradient"
                gradient={{ from: 'cyan', to: 'teal' }}
                onClick={() => {
                  useStore.setState(defaultState, true);
                  navigate('/settings/general');
                }}
              >
                Create door
              </Button>
            </Stack>
          </Center>
        )}
      </Paper>
      {table.getPageCount() > 1 && (
        <Pagination
          page={currentPage}
          total={table.getPageCount()}
          onChange={(e) => setCurrentPage(e)}
          radius="md"
          size="sm"
          siblings={1}
          styles={(theme) => ({
            item: {
              borderColor: theme.fn.rgba(theme.colors.gray[4], 0.25),
              background: theme.fn.rgba(theme.colors.dark[5], 0.6),
              color: theme.white,
              transition: 'transform 120ms ease, border-color 120ms ease',
              '&:hover': { borderColor: theme.colors.cyan[5], transform: 'translateY(-1px)' },
              '&[data-active]': {
                background: theme.colors.cyan[5],
                color: theme.black,
                borderColor: theme.colors.cyan[5],
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.35)',
              },
            },
          })}
        />
      )}
    </Stack>
  );
};

export default DoorTable;
