import { FunctionComponent, ReactNode, useState } from 'react';

interface Props {
  text: string;
  children: ReactNode;
  statusError: boolean;
}

export const Tooltip: FunctionComponent<Props> = ({ text = 'totot', children, statusError }) => {
  const [isVisible, setIsVisible] = useState(false);
  console.log('statusError', statusError);
  return (
    <div className="flex gap-5 relative">
      <div onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}>
        {children}
      </div>
      {
        <div
          className={`${statusError ? 'bg-red-300' : 'bg-gray-300'}  text-black rounded-md pl-2 pr-2  ${statusError || isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          {text}
        </div>
      }
    </div>
  );
};
