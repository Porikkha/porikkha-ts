// components/ui/Switch.js

const Switch = () => {
  return (
    <div className='relative mr-2 inline-block h-6 w-12 select-none align-middle'>
      <input
        type='checkbox'
        className='toggle-checkbox absolute block h-6 w-6 cursor-pointer appearance-none rounded-full border-4 bg-white transition-transform focus:outline-none'
      />
      <label className='toggle-label block h-6 w-6 cursor-pointer rounded-full bg-gray-300'></label>
    </div>
  );
};

export default Switch;
