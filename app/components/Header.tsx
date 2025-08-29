'use client'

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Button from "./common/Button";
import Loader from "./common/Loader";

export default function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 supports-[backdrop-filter]:bg-white/60 bg-white/90 backdrop-blur-md border-b border-white/40 shadow-sm">
      <div className="w-[85vw] max-w-[1600px] mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* 로고 */}
        <h1 
          className="text-2xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 cursor-pointer hover:opacity-90 transition"
          onClick={() => router.push('/')}
        >
          TaskFlow
        </h1>

        {/* 네비게이션 */}
        <nav className="flex items-center space-x-4">
          {status === "loading" ? (
            <Loader size="sm" />
          ) : session ? (
            <Button 
              onClick={() => signOut()}
            >
              로그아웃
            </Button>
          ) : (
            <>
              <Button
                variant="outline" 
                onClick={() => router.push('/auth/signin')}
              >
                로그인
              </Button>
              {/* <Button 
                onClick={() => router.push('/auth/signup')}
              >
                회원가입
              </Button> */}
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
