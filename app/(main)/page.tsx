'use client';

import { useSession } from "next-auth/react";
import Dashboard from "../components/Dashboard";

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <Dashboard />
      ) : (
        <p>로그인 후 할 일을 관리하세요.</p>
      )} 
    </>
  );
}
