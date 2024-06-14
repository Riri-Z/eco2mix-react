import { Outlet } from 'react-router-dom';
import useFetchData from '../hooks/useFetchData';
import usePathName from '../hooks/usePathName';
import { Header } from './Header';
import NavBar from './NavBar';

export default function App() {
  const pathname = usePathName().pathname;

  const { isErrorLastDate } = useFetchData();

  return (
    <div className="flex flex-col xl:flex-row w-screen min-h-screen bg-bg-dashboard text-white max-w-full max-y-full ">
      <NavBar currentPath={pathname} />

      <div className=" flex flex-1 flex-col gap-5  mt-4  pr-2 pl-2 lg:pr-8 lg:pl-8 w-full">
        <Header error={isErrorLastDate} />

        {!isErrorLastDate && <Outlet />}
      </div>
    </div>
  );
}
