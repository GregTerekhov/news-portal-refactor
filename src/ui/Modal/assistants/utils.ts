import { VariantModals } from 'types';

type Styles = {
  [key: string]: {
    topPosition: string;
  };
};

export const generateModalStyles = () => {
  const styles: Styles = {
    [VariantModals.Auth]: {
      topPosition: 'top-6',
    },
    [VariantModals.DeleteNews]: {
      topPosition: 'top-1/2 -translate-y-1/2',
    },
  };
  return styles;
};
