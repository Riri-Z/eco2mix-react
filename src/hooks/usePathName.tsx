import { useLocation } from 'react-router-dom';

export default function usePathName() {
  const location = useLocation();
  const { pathname } = location;

  return { pathname };
}
