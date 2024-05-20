interface InputProperties {
  geometry: string;
  text: string;
}

type VerifiableInputStyles = {
  [key: string]: InputProperties;
};

export const inputStyles: VerifiableInputStyles = {
  account: {
    geometry: 'pl-11 pr-3',
    text: 'text-accentBase dark:text-whiteBase',
  },
  auth: {
    geometry: 'px-4 md:px-4',
    text: 'text-darkBase dark:text-whiteBase',
  },
};
