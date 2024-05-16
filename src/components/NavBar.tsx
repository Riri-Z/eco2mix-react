import dashboardLogo from '../assets/icons/dashboardIcon.svg';
import electricalLogo from '../assets/icons/electricalIcon.svg';
import LinkComponent from './LinkItem';
import { useState } from 'react';

function NavBar() {
  const LINKS = [
    { path: 'dashboard', text: 'dashboard', logo: dashboardLogo },
    {
      path: 'national-energy-consumption',
      text: 'Consommation',
      logo: electricalLogo,
    },
  ];

  const [active, setActive] = useState(LINKS[0].path);

  return (
    <>
      <div className="w-40 flex flex-col items-center bg-darkblue">
        <h1 className="max-w-40 h-20 flex item-center justify-center cursor-pointer  items-center font-quickSandBold text-3xl">
          eco2Mix
        </h1>
        <nav className="flex flex-col uppercase text-sm w-full">
          <ul className="flex flex-col align-middle h-32 ">
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
      </div>
    </>
  );
}

export default NavBar;
