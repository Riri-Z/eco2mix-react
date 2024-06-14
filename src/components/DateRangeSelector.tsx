import { format, parseISO } from 'date-fns';
import { Dispatch, FunctionComponent, SetStateAction, useState } from 'react';
import { DateRangePicker } from 'rsuite';
import { LIMIT_START_DATE_DATA } from '../utils/constant';

const { allowedMaxDays, allowedRange, combine } = DateRangePicker;

interface Props {
  lastDateAvailable: string | null;
  setStartDate: Dispatch<SetStateAction<string | null>>;
  setEndDate: Dispatch<SetStateAction<string | null>>;
}

export const DateRangeSelector: FunctionComponent<Props> = ({
  lastDateAvailable,
  setStartDate,
  setEndDate,
}) => {
  const [rangeDateValue, setRangeDateValue] = useState<[Date, Date]>([
    parseISO(lastDateAvailable!),
    parseISO(lastDateAvailable!),
  ]);

  const handleChangePeriod = (value: [Date, Date] | null, _event: React.SyntheticEvent) => {    // eslint-disable-line

    if (value) {
      setRangeDateValue(value);
      setStartDate(format(new Date(value[0]), 'yyyy-MM-dd'));
      setEndDate(format(new Date(value[1]), 'yyyy-MM-dd'));
    }
  };

  return (
    <div className="flex flex-col  md:w-fit h-22 gap-2 justify-center align-middle xl:justify-start">
      <p>Selectionner une période :</p>
      <DateRangePicker
        value={rangeDateValue}
        onChange={handleChangePeriod}
        placeholder="Selectionner une période"
        weekStart={1}
        showHeader={false}
        // Allow selection of dates within a 3-month period
        shouldDisableDate={combine(
          allowedMaxDays(90),
          allowedRange(new Date(LIMIT_START_DATE_DATA), new Date(lastDateAvailable!))
        )}
        // Disabled keyboard input
        editable={false}
        // Remove default options
        ranges={[]}
      />
    </div>
  );
};
