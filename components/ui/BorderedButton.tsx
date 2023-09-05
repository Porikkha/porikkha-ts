import { ReactNode } from 'react';

const BorderedButton = ({ onClick, children }: any) => {
  return (
    <button onClick={onClick} className='focus:shadow-outline my-auto h-8 rounded-md border border-icon-purple px-3 font-medium text-icon-purple transition-colors duration-150 hover:bg-fade-purple '>
      {children}
    </button>
  );
};

export default BorderedButton;
