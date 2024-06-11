import { Link } from 'react-router-dom';
import { Ilink } from '../utils/types';

function NavLink({ path, text, logo, active, handleSelectedLink }: Readonly<Ilink>) {
  return (
    <li
      className={`flex justify-center xl:justify-start cursor-pointer   items-center h-8 lg:h-16  w-full  ${active && 'm-active'}`}
      onClick={() => handleSelectedLink(path)}
    >
      <img className="h-5 pr-2 pl-4 max-xl:hidden" src={logo} alt={`${text} logo`} />
      <Link className="font-quickSandBold text-xs" to={path}>
        {text}
      </Link>
    </li>
  );
}

export default NavLink;
