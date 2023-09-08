'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import {
  signIn,
  signOut,
  useSession,
  getProviders,
  ClientSafeProvider,
  LiteralUnion,
} from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers/index';
import { useRouter } from 'next/navigation';
import ErrorAlert from './ui/ErrorAlert';
import ExamInterface from '@/interfaces/Exam';
import {dummyClassroom} from '@/interfaces/Classroom';

const Nav = () => {
  const router = useRouter();
  const handleCreateExam = async (e: any) => {
    e.preventDefault();
    const creatorID = session?.user?.id;
    if (!creatorID) {
      console.log('❌ ~ file: Nav.tsx:59 : creatorID not found');
      return;
    }
    const exam: ExamInterface = {
      creatorID: session?.user?.id!,
      examID: '',
      title: 'Exam Title',
      description: 'Exam Description',
      questions: [],
      startTime: new Date(),
      duration: 30,
      totalMarks: 0,
      allowedAbilities: [
        {
          type: 'copy',
          isAllowed: false,
        },
        {
          type: 'print',
          isAllowed: true,
        },
      ],
    };
    const response = await fetch('/api/exams', {
      method: 'POST',
      body: JSON.stringify({
        exam: exam,
      }),
    });
    const data = await response.json();
    if (data.status == 200 && data.examID) {
      router.push('/exam/create/' + data.examID);
    } else {
      setShowErrorAlert(true);
    }
  };

  const handleClassroomCreate = async (e: any) => {
    e.preventDefault();
    const response = await fetch('/api/classroom/create', {
      method: 'POST',
      body: JSON.stringify({
        classroom: dummyClassroom,
      }),
    });
    const data = await response.json();
    if (data.status == 200 && data.classroomID) {
      router.push('/classroom/' + data.classroomID);
    } else {
      setShowErrorAlert(true);
    }
  };
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const { data: session } = useSession();
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>();

  const [toggleDropdown, setToggleDropdown] = useState(false);
  useEffect(() => {
    const setupProviders = async () => {
      const response = await getProviders();
      setProviders(response);
      console.log(`nav: providers response: `);
      console.log(response);
    };
    setupProviders();
  }, []);

  return (
    <nav className='flex-between mb-16 w-full pt-3'>
      <Link href='/' className='flex-center flex gap-2'>
        <Image
          src='/assets/images/porikkha-logo.svg'
          alt='Porikkha Logo'
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text'>Porikkha</p>
      </Link>
      <ErrorAlert showErrorAlert={showErrorAlert} setShowErrorAlert={setShowErrorAlert} />
      {/* Desktop Navigation */}
      <div className='hidden sm:flex'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <button className='purple_btn' onClick={handleCreateExam}>
              Create Exam
            </button>
            <button className='blue_btn' onClick={handleClassroomCreate}>
              Create Classroom
            </button>
            <button type='button' onClick={() => signOut()} className='outline_btn'>
              Sign Out
            </button>
            <Link href='/profile'>
              <Image
                src={session?.user.image as string}
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
              />
            </Link>
          </div>
        ) : (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/create-prompt' className='purple_btn'>
              About Us
            </Link>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    console.log('hello');
                    signIn(provider.id);
                  }}
                  className='black_btn'
                >
                  Sign In
                </button>
              ))}
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className='relative flex sm:hidden'>
        {session?.user ? (
          <div className='flex'>
            <button
              onClick={() => {
                setToggleDropdown((prev) => !prev);
              }}
            >
              <Image
                src={session?.user.image as string}
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
              />
            </button>

            {toggleDropdown && (
              <div className='dropdown'>
                <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <button className='purple_btn' onClick={handleCreateExam}>
                  Create Exam
                </button>
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className='black_btn mt-5 w-full'
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className='black_btn'
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
