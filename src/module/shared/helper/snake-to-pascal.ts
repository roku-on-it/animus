export const snakeToPascal = (str) =>
  str.replace(/^\w|_\w/g, (match) => match[match.length - 1].toUpperCase());
