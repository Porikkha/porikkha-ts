// components/ui/Label.js

const Label = ({ children }: { children: React.ReactNode }) => {
  return <label className='font-semibold text-gray-600'>{children}</label>;
};

export default Label;
