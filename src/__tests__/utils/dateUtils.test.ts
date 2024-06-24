import { describe, expect, it } from 'vitest';
import { isRangeLongerThanTwoWeeks, timeStampTotimeStampPlusTwo } from '../../utils/dateUtils';
import { EXPORT_MENU_CHARTS, EXPORT_MENU_CHARTS_FILTERED } from '../../utils/constant';

describe('date utils', () => {
  describe('timeStampTotimeStampPlusTwo', () => {
    it('should add two hours to a timestamp', () => {
      const mockTimeStamp = 1719279900000;
      const finalTimeStamp = mockTimeStamp + 2 * 60 * 60 * 1000;
      const expectNewTS = timeStampTotimeStampPlusTwo(mockTimeStamp);

      expect(finalTimeStamp).toEqual(expectNewTS);
    });
  });

  describe('isRangeLongerThanTwoWeeks', () => {
    it('should return EXPORT_MENU_CHARTS for same start and end date', () => {
      const mockStartDate = '2024-01-20';
      const mockEndDate = '2024-01-20';
      const result = isRangeLongerThanTwoWeeks(mockStartDate, mockEndDate);

      expect(result).toEqual(EXPORT_MENU_CHARTS);
    });
    it('should return EXPORT_MENU_CHARTS_FILTERED for range start and end dates greater than two weeks', () => {
      const mockStartDate = '2023-01-20';
      const mockEndDate = '2024-01-20';
      const result = isRangeLongerThanTwoWeeks(mockStartDate, mockEndDate);

      expect(result).toEqual(EXPORT_MENU_CHARTS_FILTERED);
    });
  });
});
