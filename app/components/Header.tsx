'use client'

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <header className="bg-white shadow">
      <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 
          className="text-xl font-bold text-indigo-600 cursor-pointer"
          onClick={() => router.push('/')}
        >
          TaskFlow
        </h1>
        <nav>
          {session ? (
            <button 
              className="cursor-pointe text-gray-600 hover:text-indigo-600" 
              onClick={() => signOut()}
              // onClick={() => signOut({ callbackUrl: '/' })}
            >
              로그아웃
            </button>
          ) : (
            <>
              <button 
                className="cursor-pointer text-gray-600 hover:text-indigo-600 pr-3" 
                onClick={() => router.push('/auth/signin')}
              >
                로그인
              </button>
              <button 
                className="cursor-pointer text-gray-600 hover:text-indigo-600" 
                onClick={() => router.push('/auth/signup')}
              >
                회원가입
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
