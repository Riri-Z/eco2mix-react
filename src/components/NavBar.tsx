import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <>
      <div className="w-80 flex flex-col items-center bg-darkblue">
        <h1 className="max-w-64 h-20 flex item-center justify-center cursor-pointer ">eco2Mix</h1>
        <nav>
          <ul>
            <li>
              <Link to={`dashboard`}>Dashboard</Link>
            </li>
            <li>
              <Link to={`national-energy-consumption`}>map</Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default NavBar;
