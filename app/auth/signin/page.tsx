"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from 'react-icons/ai';
import Input from "@/app/components/common/Input";
import Button from "@/app/components/common/Button";
import Link from "next/link";


export default function SigninPage() {
  return (
    <div className="flex flex-col gap-4">

      {/* <Input type="email" placeholder="이메일" />
      <Input type="password" placeholder="비밀번호" />
      <Button>로그인</Button>
      <div className="flex justify-center">
        <span>가입 된 계정이 없으십니까? <Link className="underline text-indigo-600" href="/auth/signup">회원가입</Link></span>
      </div>

      <hr className="border-gray-500 my-3"/> */}

      <button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="w-full py-2 px-4 border rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition cursor-pointer"
      >
        <FcGoogle className="w-5 h-5" />
        Google 로그인
      </button>

      {/* <button
        onClick={() => alert('준비중입니다')}
        className="w-full py-2 px-4 border rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition cursor-pointer"
      >
        <AiFillGithub className="w-5 h-5" />
        GitHub 로그인
      </button> */}
    </div>
  );
}
