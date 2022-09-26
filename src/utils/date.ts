import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export const now = dayjs();
export const dateWithoutFormat = (date: Date) => dayjs(date).format();
export const dateWithFormat = (date: Date, format: string) =>
  dayjs(date).format(format);
