'use client'

import { signIn, signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-10 mb-5 flex items-center justify-between border-b border-solid border-gray-300 text-3xl">          
      {session ? (
        <button className="cursor-pointer" onClick={() => signOut()}>로그아웃</button>
      ) : (
        <button className="cursor-pointer" onClick={() => signIn('google')}>구글 로그인</button>
      )}
    </header>
  );
}


// import { signOut } from '@/auth'
// import Link from 'next/link'

// export default async function Header() {
//   return (
//     <header>
//       <nav style={{ display: 'flex', gap: '10px' }}>
//         <Link href="/">메인</Link>
//         <Link href="/signin">로그인</Link>
//         <Link href="/signup">회원가입</Link>
//       </nav>
//       <hr />
//     </header>
//   )
// }