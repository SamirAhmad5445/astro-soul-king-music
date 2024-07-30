export const parseDate = (
  day: number,
  month: number,
  year: number,
): Date | null => {
  if (day < 1 || day > 31) {
    console.log("invalid day");
    return null;
  }

  if (month < 1 || month > 12) {
    return null;
  }

  if (year < 1900 || year > 2050) {
    return null;
  }

  const result = new Date(year, month - 1, day);

  if (
    result.getFullYear() !== year ||
    result.getMonth() + 1 !== month ||
    result.getDate() !== day
  ) {
    return null;
  }

  return result;
};

export const tryParseDate = (
  day: number,
  month: number,
  year: number,
): boolean => {
  return Boolean(parseDate(day, month, year));
};

export const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
};
