import Image from 'next/image';

const Feature = ({
  title,
  details,
  svgLink,
}: {
  title: string;
  details: string;
  svgLink: string;
}) => {
  return (
    <div className='flex flex-col items-center justify-center p-4'>
      <Image src={svgLink} width={75} height={75} className='mb-2' alt={title} />
      <h3 className='mb-2 text-xl font-bold'>{title}</h3>
      <p className='text-center'>{details}</p>
    </div>
  );
};

export default Feature;
