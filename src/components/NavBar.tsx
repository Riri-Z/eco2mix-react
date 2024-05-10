import { Link } from 'react-router-dom';
import dashboardLogo from '../assets/icons/dashboardIcon.svg';
import electricalLogo from '../assets/icons/electricalIcon.svg';
import { useState } from 'react';

function NavBar() {
  const links = [
    { path: 'dashboard', text: 'dashboard', logo: dashboardLogo },
    { path: 'national-energy-consumption', text: 'national-map', logo: electricalLogo },
  ];

  const [active, setActive] = useState(links[0].path);

  return (
    <>
      <div className="w-64 flex flex-col items-center bg-darkblue">
        <h1 className="max-w-64 h-20 flex item-center justify-center cursor-pointer  items-center font-quickSandBold text-3xl">
          eco2Mix
        </h1>
        <nav className="flex flex-col uppercase text-sm w-full">
          <ul className="flex flex-col pl-14 h-32 ">
            {links.map((link) => (
              <li
                className={`flex flex-r ow items-center h-1/2 m-auto w-full active:border-r-2 border-r-cyan-400 ${active == link.path && 'm-active'}`}
                onClick={() => setActive(link.path)}
              >
                <img className="h-5 pr-4 " src={link.logo} alt={`${link.text} logo`} />
                <Link className="font-quickSandBold text-xs" to={link.path}>
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}

export default NavBar;
