'use client';

import { useSession } from "next-auth/react";
import Dashboard from "../components/Dashboard";
import Button from "../components/common/Button";

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <Dashboard />
      ) : (
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center px-6 py-12 rounded-3xl bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-md border border-white/50 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mb-4">
              당신의 하루를 더 스마트하게
            </h2>
            <p className="text-gray-600 mb-8">로그인 후 일정과 할 일을 쉽고 아름답게 관리해보세요.</p>
            <div className="flex items-center justify-center gap-3">
              <Button
                className="px-5 py-3"
                onClick={() => window.location.href = '/auth/signin'}
              >
                로그인
              </Button>
              {/* <Button
                variant="outline"
                className="px-5 py-3"
                onClick={() => window.location.href = '/auth/signup'}
              >
                회원가입
              </Button> */}
            </div>
          </div>
        </div>
      )} 
    </>
  );
}
