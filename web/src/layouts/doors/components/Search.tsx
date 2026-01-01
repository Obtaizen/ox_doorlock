import { TextInput } from '@mantine/core';
import { useEffect } from 'react';
import { TbSearch } from 'react-icons/tb';
import useDebounce from '../../../hooks/useDebounce';
import { useSearch } from '../../../store/search';

const Searchbar: React.FC = () => {
  const search = useSearch();
  const debouncedSearch = useDebounce(search.value);

  useEffect(() => {
    search.setDebouncedValue(debouncedSearch);
  }, [debouncedSearch, search]);

  return (
    <TextInput
      radius="xl"
      size="md"
      variant="filled"
      sx={{ flex: '1 1 auto', minWidth: 220 }}
      icon={<TbSearch size={18} />}
      placeholder="Search doors"
      value={search.value ?? ''}
      onChange={(e) => search.setValue(e.target.value)}
      styles={(theme) => ({
        input: {
          border: `1px solid ${theme.fn.rgba(theme.colors.cyan[5], 0.35)}`,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.04)',
          color: theme.white,
          transition: 'border-color 150ms ease, box-shadow 200ms ease, transform 120ms ease',
          '&:focus': {
            borderColor: theme.colors.cyan[4],
            boxShadow: `0 0 0 3px ${theme.fn.rgba(theme.colors.cyan[5], 0.15)}, inset 0 1px 0 rgba(255, 255, 255, 0.08)`,
            transform: 'translateY(-1px)',
          },
        },
        icon: { color: theme.colors.gray[4] },
        placeholder: { color: theme.colors.gray[5] },
      })}
    />
  );
};

export default Searchbar;
