import type { DateRequest } from 'types';
import { useNewsAPIRedux } from 'reduxStore/hooks';

enum TriggerType {
  Keyword = 'keyword',
  Category = 'category',
  Period = 'period',
  Date = 'date',
  Filtering = 'filtering',
  Reset = 'reset',
}

const useHeadline = () => {
  const { updateHeadline } = useNewsAPIRedux();

  const handleChangeHeadline = (trigger: TriggerType, value?: string | DateRequest): void => {
    switch (true) {
      case trigger === TriggerType.Keyword:
        updateHeadline(`News by Keyword: ${value}`);
        break;
      case trigger === TriggerType.Category:
        updateHeadline(`Categorical Reviews by ${value}`);
        break;
      case trigger === TriggerType.Period:
        value === 'Today' ? updateHeadline(`${value}'s Hot News`) : updateHeadline(`${value} News`);
        break;
      case typeof value === 'object' && trigger === TriggerType.Date:
        updateHeadline(`News by Date: from ${value.beginDate} to ${value.endDate}`);
        break;
      case trigger === TriggerType.Filtering:
        updateHeadline('Filtered News');
        break;
      case trigger === TriggerType.Reset:
        updateHeadline('Today`s Hot News');
        break;
      default:
        break;
    }
  };

  return { handleChangeHeadline };
};

export default useHeadline;
