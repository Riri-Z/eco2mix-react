import { useEffect, useState } from 'react';
import burgerMenuLogo from '../assets/icons/burgerMenuIcon.svg';
import dashboardLogo from '../assets/icons/dashboardIcon.svg';
import electricalLogo from '../assets/icons/electricalIcon.svg';
import NavLink from './NavLink';
import { useNavigate } from 'react-router-dom';

interface NavProps {
  currentPath: string;
}

function NavBar({ currentPath }: Readonly<NavProps>) {
  const navigate = useNavigate();
  const LINKS = [
    { path: 'dashboard', text: 'dashboard', logo: dashboardLogo },
    {
      path: 'national-energy-consumption',
      text: 'Consommations',
      logo: electricalLogo,
    },
  ];

  const [active, setActive] = useState('');
  const [displayMenu, setDisplayMenu] = useState(true);

  useEffect(() => {
    if (currentPath) {
      setActive(currentPath.replace('/', ''));
    }
  }, [currentPath]);

  useEffect(() => {
    const handleDisplayNavLinksOnResize = () => {
      if (window.innerWidth >= 768) {
        setDisplayMenu(true);
      }
    };
    window.addEventListener('resize', handleDisplayNavLinksOnResize);

    return () => {
      window.removeEventListener('resize', handleDisplayNavLinksOnResize);
    };
  }, [window.innerWidth]);

  const handleClickBurgerMenu = () => {
    setDisplayMenu(!displayMenu);
  };

  function handleSelectLink(path: string) {
    if (path) {
      setActive(path);
      navigate('/' + path);
    }
  }

  return (
    <div className="w-full xl:w-48	flex-shrink-0  flex flex-col xl:items-center bg-darkblue">
      <section className="flex flex-row items-center h-20 ">
        <img
          className="h-5 pr-2 pl-4 mt-1 xl:hidden"
          src={burgerMenuLogo}
          onClick={handleClickBurgerMenu}
          alt="burgerMenuIcon logo"
        />

        <h1 className="w-40 h-10 xl:h-28 flex xl:justify-center cursor-pointer  items-center font-quickSandBold text-2xl    xl:text-3xl">
          eco2Mix
        </h1>
      </section>
      {displayMenu && (
        <nav className="flex flex-row w-full justify-between xl:flex-col uppercase text-sm xl:w-full">
          <ul className="flex w-full xl:flex-col align-middle xl:h-32 ">
            {LINKS.map((e) => (
              <NavLink
                key={e.text}
                path={e.path}
                text={e.text}
                logo={e.logo}
                active={e.path === active}
                handleSelectedLink={handleSelectLink}
              />
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}

export default NavBar;
