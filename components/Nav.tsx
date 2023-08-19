"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, } from "react";
import { signIn, signOut, useSession, getProviders, ClientSafeProvider, LiteralUnion } from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers/index";

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>();


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
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/porikkha-logo.svg"
          alt="Porikkha Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Porikkha</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-exam" className="purple_btn">
              Create Exam
            </Link>
            <button type="button" onClick={() => signOut()} className="outline_btn">
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user.image as string}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="purple_btn">
              About Us
            </Link>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    console.log("hello");
                    signIn(provider.id);
                  }}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <button
              onClick={() => {
                setToggleDropdown((prev) => !prev);
              }}
            >
              <Image
                src={session?.user.image as string }
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </button>

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-exam"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Exam
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
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
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
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
