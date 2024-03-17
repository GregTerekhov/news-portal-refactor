import { useFiltersState } from 'contexts';

const useChangeFilter = () => {
  const { filters, setFilters } = useFiltersState();

  const handleChangeFilter = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleMaterialTypeChange = (selectedType: string): void => {
    setFilters({
      ...filters,
      materialType: selectedType,
    });
  };

  return { handleChangeFilter, handleMaterialTypeChange };
};

export default useChangeFilter;
