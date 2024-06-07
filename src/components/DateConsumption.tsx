interface Props {
  currentDate: string;
  endDate: string;
  startDate: string;
  handleChangeDate: React.ChangeEventHandler<HTMLInputElement>;
}

export function DateConsumption({
  currentDate,
  endDate,
  startDate,
  handleChangeDate,
}: Readonly<Props>) {
  return (
    <>
      {
        <div className="flex row gap-2 justify-center xl:justify-start">
          <label className="text-lg flex items-center	" htmlFor="date-select">
            Date
          </label>
          <input
            id="date-select"
            type="date"
            className="text-black rounded-lg text-center w-28 lg:text-base"
            onChange={handleChangeDate}
            onKeyDown={(e) => e.preventDefault()}
            min={startDate}
            max={endDate}
            value={currentDate}
          ></input>
        </div>
      }
    </>
  );
}
