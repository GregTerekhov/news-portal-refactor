import { useFiltersStateContext } from 'contexts';

interface FilterInputs {
  name: string;
  value: string;
  placeholder: string;
}

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
  const filterInputs: FilterInputs[] = [
    {
      name: 'keyword',
      value: filters.keyword,
      placeholder: 'Keyword',
    },
    {
      name: 'author',
      value: filters.author,
      placeholder: 'Author',
    },
    {
      name: 'title',
      value: filters.title,
      placeholder: 'Title',
    },
    {
      name: 'publisher',
      value: filters.publisher,
      placeholder: 'Publisher',
    },
  ];

  return { filterInputs, handleChangeFilter, handleMaterialTypeChange };
};

export default useChangeFilter;
