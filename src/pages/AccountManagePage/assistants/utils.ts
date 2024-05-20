import { InputLabel } from 'types';

export const getDescriptionText = (fieldType: InputLabel): string => {
  switch (fieldType) {
    case InputLabel.Email:
      return `and confirm by inputting your current password in the new field.`;
    case InputLabel.Password:
      return `in the first field and repeat the entry in the second field. In the third field, confirm the change by inputting your current password.`;

    default:
      return '';
  }
};

export const getButtonDisabledState = (fieldType: InputLabel, isRefreshing: boolean): boolean => {
  return fieldType === InputLabel.Email && isRefreshing ? true : false;
};
