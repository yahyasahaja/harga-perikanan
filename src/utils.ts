export const capitalize = (str: string) => {
  return str
    .split('_')
    .map((word) => {
      if (word.length > 0) return `${word[0].toUpperCase()}${word.slice(1)}`;
      return undefined;
    })
    .filter((w) => w)
    .join(' ');
};

export const convertWordToLabelValue = (str: string) => {
  const label = capitalize(str);

  return {
    value: str,
    label,
  };
};

export const convertArrayToLabelValue = (arr: string[]) => {
  return arr.map((str) => convertWordToLabelValue(str));
};
