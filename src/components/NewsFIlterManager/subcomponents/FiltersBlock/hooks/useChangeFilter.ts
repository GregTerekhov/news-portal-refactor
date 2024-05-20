import { useFiltersStateContext } from 'contexts';
import { getInputsData } from '../assistants';

const useChangeFilter = () => {
  const { filters, setFilters } = useFiltersStateContext();

  //Функція зміни значення станів інпутів для фільтрів
  const handleChangeFilter = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  //Функція зміни значення стану dropdown-фільтра
  const handleChangeMaterialType = (selectedType: string): void => {
    setFilters({
      ...filters,
      materialType: selectedType,
    });
  };

  return { filterInputs: getInputsData(filters), handleChangeFilter, handleChangeMaterialType };
};

export default useChangeFilter;
