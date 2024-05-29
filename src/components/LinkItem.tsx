import { Link } from 'react-router-dom';
import { Ilink } from '../utils/types';

function LinkComponent({ path, text, logo, active, handleSelectedLink }: Ilink) {
  return (
    <>
      <li
        className={`flex justify-center md:justify-start  items-center h-10 m-auto w-full  ${active && 'm-active'}`}
      >
        <img className="h-5 pr-2 pl-4 max-md:hidden" src={logo} alt={`${text} logo`} />
        <Link
          className="font-quickSandBold text-xs"
          to={path}
          onClick={() => handleSelectedLink(path)}
        >
          {text}
        </Link>
      </li>
    </>
  );
}

export default LinkComponent;
