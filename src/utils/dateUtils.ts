import { compareAsc, subWeeks } from 'date-fns';
import { EXPORT_MENU_CHARTS, EXPORT_MENU_CHARTS_FILTERED } from './constant';

export function timeStampTotimeStampPlusTwo(timeStamp: number) {
  const date = new Date(timeStamp);
  date.setHours(date.getHours() + 2);

  return date.getTime();
}

export function isRangeLongerThanTwoWeeks(startDate: string, endDate: string) {
  const twoWeeksAgo = subWeeks(endDate, 2);

  // If the start date is before two weeks ago, we disable the option to export as PNG, JPEG, PDF, or SVG.
  // This prevents issues with multer, which may struggle due to excessive data.
  if (compareAsc(startDate, twoWeeksAgo) == -1) {
    return EXPORT_MENU_CHARTS_FILTERED;
  }
  return EXPORT_MENU_CHARTS;
}
