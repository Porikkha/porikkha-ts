// components/ui/Label.js

const Label = ({ children }: {children:React.ReactNode}) => {
  return <label className="text-gray-600 font-semibold">{children}</label>;
};

export default Label;
