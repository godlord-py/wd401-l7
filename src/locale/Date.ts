import i18n from 'i18next';
// Function to format date according to the current locale
export const formatDate = (date: Date): string => {
  const locale = i18n.language;
  const dateFormatter = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return dateFormatter.format(date);
};

// Function to format time according to the current locale
export const formatTime = (date: Date, options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: true }): string => {
  const locale = i18n.language;
  return new Intl.DateTimeFormat(locale, options).format(date);
};
