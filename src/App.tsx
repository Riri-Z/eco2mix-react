import NavBar from './components/NavBar';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <div className="flex h-screen w-screen bg-gradient-to-l from-myBlue to-darkblue text-white">
        <NavBar />
        <div className="flex-1 pt-8 pb-8 pr-16 pl-16 w-full">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
