import { useEffect, useState } from 'react';
import burgerMenuLogo from '../assets/icons/burgerMenuIcon.svg';
import dashboardLogo from '../assets/icons/dashboardIcon.svg';
import electricalLogo from '../assets/icons/electricalIcon.svg';
import NavLink from './NavLink';

function NavBar() {
  const LINKS = [
    { path: 'dashboard', text: 'dashboard', logo: dashboardLogo },
    {
      path: 'national-energy-consumption',
      text: 'Carte des Consommations',
      logo: electricalLogo,
    },
  ];

  const [active, setActive] = useState(LINKS[0].path);
  const [displayMenu, setDisplayMenu] = useState(false);

  useEffect(() => {
    const handleDisplayNavLinksOnResize = () => {
      if (window.innerWidth >= 1024) {
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

  const displayTab = displayMenu;

  return (
    <div className="xl:w-48 flex flex-col xl:items-center bg-darkblue">
      <section className="flex flex-row items-center h-20 ">
        <img
          className="h-5 pr-2 pl-4 mt-1 xl:hidden"
          src={burgerMenuLogo}
          onClick={handleClickBurgerMenu}
          alt="burgerMenuIcon logo"
        />

        <h1 className="max-w-40 h-10 xl:h-28 flex xl:justify-center cursor-pointer  items-center font-quickSandBold text-2xl    xl:text-3xl">
          eco2Mix
        </h1>
      </section>
      {displayTab && (
        <nav className="flex flex-row w-full justify-between xl:flex-col uppercase text-sm xl:w-full">
          <ul className="flex w-full  xl:flex-col align-middle xl:h-32 ">
            {LINKS.map((e) => (
              <NavLink
                key={e.text}
                path={e.path}
                text={e.text}
                logo={e.logo}
                active={e.path === active}
                handleSelectedLink={setActive}
              />
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}

export default NavBar;
