import { Outlet, useNavigate } from 'react-router-dom';
import useFetchData from '../hooks/useFetchData';
import usePathName from '../hooks/usePathName';
import { Header } from './Header';
import NavBar from './NavBar';

export default function App() {
  const navigate = useNavigate();
  const pathname = usePathName().pathname;

  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    loadingCharts,
    chartsConfig,
    handleLoadEnergyData,
    lastDateAvailable,
    isErrorLastDate,
  } = useFetchData();

  const handleReloadPage = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col xl:flex-row w-screen min-h-screen bg-bg-dashboard text-white max-w-full max-y-full ">

      <NavBar currentPath={pathname} />

      <div className=" flex flex-1 flex-col gap-5 lg:gap-10 mt-4  pr-2 pl-2 lg:pr-8 lg:pl-8 w-full">
        <h1 className="font-quickSandSemiBold mt-2 text-center text-2xl xl:text-left  lg:text-3xl">
          Données éCO2mix nationales
        </h1>

        <Header
          lastDateAvailable={lastDateAvailable}
          handleLoadData={handleLoadEnergyData}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          error={isErrorLastDate}
          handleReloadPage={handleReloadPage}
        />

        {!isErrorLastDate && (
          <Outlet context={{ startDate, endDate, chartsConfig, loadingCharts }} />
        )}
      </div>
    </div>
  );
}
