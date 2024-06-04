import { useState } from 'react';
import burgerMenuLogo from '../assets/icons/burgerMenuIcon.svg';
import dashboardLogo from '../assets/icons/dashboardIcon.svg';
import electricalLogo from '../assets/icons/electricalIcon.svg';
import LinkComponent from './LinkItem';

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

  const handleClickBurgerMenu = () => {
    setDisplayMenu(!displayMenu);
  };

  const displayTab = displayMenu || window.innerWidth >= 768;

  return (
    <div className="md:w-48 flex flex-col md:items-center bg-darkblue">
      <section className="flex flex-row items-center h-20 ">
        <img
          className="h-5 pr-2 pl-4 mt-1 md:hidden"
          src={burgerMenuLogo}
          onClick={handleClickBurgerMenu}
          alt="burgerMenuIcon logo"
        />

        <h1 className="max-w-40 h-10 md:h-20 flex md:justify-center cursor-pointer  items-center font-quickSandBold text-2xl    md:text-3xl">
          eco2Mix
        </h1>
      </section>
      {displayTab && (
        <nav className="flex flex-row w-full justify-between md:flex-col uppercase text-sm md:w-full">
          <ul className="flex w-full  md:flex-col align-middle md:h-32 ">
            {LINKS.map((e) => (
              <LinkComponent
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
