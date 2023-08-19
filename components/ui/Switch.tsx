// components/ui/Switch.js

const Switch = () => {
  return (
    <div className="relative inline-block w-12 h-6 mr-2 align-middle select-none">
      <input
        type="checkbox"
        className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer focus:outline-none transition-transform"
      />
      <label
        className="toggle-label block w-6 h-6 rounded-full bg-gray-300 cursor-pointer"
      ></label>
    </div>
  );
};

export default Switch;
