import { formatDate } from '/home/godlord/capstone301/sportnewsapp/src/locale/Date.ts';


test('formats a date correctly', () => {
  const date = new Date('2024-07-21T12:00:00Z');
  const formattedDate = formatDate(date);

  expect(formattedDate).toBe('July 21, 2024');
});
