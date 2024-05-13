import { useDate } from './utils/context';

function Dashboard() {
  const { startDate, endDate } = useDate();

  return (
    <>
      <p className="font-quickSand">Dashboard</p>

      <p>start date {startDate}</p>
      <p>end date {endDate}</p>
    </>
  );
}

export default Dashboard;
