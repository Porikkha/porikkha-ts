import Feed from '@/components/homepage/Feed';
import Image from 'next/image';

const Home = () => {
  return (
    <section className='flex-center w-full flex-col'>
      <h1 className='head_text text-center'>
        Secure and Intelligent Assesments
        <br />
        <span className='purple_gradient text-center'>AI-Powered Exams</span>
      </h1>
      <p className='desc text-center'>
        Revolutionize your exams with Porikkha! Schedule, save progress, and discuss exams
        in a secure online environment. Enjoy advanced anti-cheat measures and access
        insightful analytics
      </p>
      <div className='flex justify-center py-10'>
        <Image src='/assets/images/pc-logo.svg' alt='Logo' width={350} height={350} />
      </div>
      <Feed />
    </section>
  );
};

export default Home;
