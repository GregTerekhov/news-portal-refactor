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
  const handleMaterialTypeChange = (selectedType: string): void => {
    setFilters({
      ...filters,
      materialType: selectedType,
    });
  };

  //Data для інпутів фільтрації
  const filterInputs = getInputsData(filters);

  return { filterInputs, handleChangeFilter, handleMaterialTypeChange };
};

export default useChangeFilter;
