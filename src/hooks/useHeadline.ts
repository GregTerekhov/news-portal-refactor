import type { DateRequest } from 'types';
import { useNewsAPIRedux } from 'reduxStore/hooks';

type TriggerType = 'keyword' | 'category' | 'period' | 'date' | 'filtering' | 'reset';

const useHeadline = () => {
  const { updateHeadline } = useNewsAPIRedux();

  const handleChangeHeadline = (trigger: TriggerType, value?: string | DateRequest): void => {
    switch (true) {
      case trigger === 'keyword':
        updateHeadline(`News by Keyword: ${value}`);
        break;
      case trigger === 'category':
        updateHeadline(`Categorical Reviews by ${value}`);
        break;
      case trigger === 'period':
        value === 'Today' ? updateHeadline(`${value}'s Hot News`) : updateHeadline(`${value} News`);
        break;
      case typeof value === 'object' && trigger === 'date':
        updateHeadline(`News by Date: from ${value.beginDate} to ${value.endDate}`);
        break;
      case trigger === 'filtering':
        updateHeadline('Filtered News');
        break;
      case trigger === 'reset':
        updateHeadline('Today`s Hot News');
        break;
      default:
        break;
    }
  };

  return { handleChangeHeadline };
};

export default useHeadline;
