import { Link } from 'react-router-dom';
import { Ilink } from '../utils/types';

function LinkComponent({ path, text, logo, active, handleSelectedLink }: Ilink) {
  return (
    <>
      <li className={`flex  items-center h-1/3 m-auto w-full  ${active && 'm-active'}`}>
        <img className="h-5 pr-2 pl-4" src={logo} alt={`${text} logo`} />
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
