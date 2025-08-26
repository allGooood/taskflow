'use client'

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Header() {
  const { data: session } = useSession();
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
          {session ? (
            <button 
              className="px-4 py-2 rounded-xl text-white bg-gradient-to-r from-indigo-600 to-violet-600 shadow-md hover:shadow-lg hover:from-indigo-500 hover:to-violet-500 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/70 active:scale-[0.98]"
              onClick={() => signOut()}
            >
              로그아웃
            </button>
          ) : (
            <>
              <button 
                className="px-4 py-2 rounded-xl border border-indigo-500/70 text-indigo-700 hover:text-indigo-800 hover:bg-indigo-50 transition shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/70 active:scale-[0.98]"
                onClick={() => router.push('/auth/signin')}
              >
                로그인
              </button>
              <button 
                className="px-4 py-2 rounded-xl text-white bg-gradient-to-r from-indigo-600 to-violet-600 shadow-md hover:shadow-lg hover:from-indigo-500 hover:to-violet-500 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/70 active:scale-[0.98]"
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


// 'use client'

// import { signIn, signOut, useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";

// export default function Header() {
//   const { data: session } = useSession();
//   const router = useRouter();

//   return (
//     <header className="bg-white shadow">
//       <div className="px-[100px] py-4 flex justify-between items-center">
//         <h1 
//           className="text-xl font-bold text-indigo-600 cursor-pointer"
//           onClick={() => router.push('/')}
//         >
//           TaskFlow
//         </h1>
//         <nav>
//           {session ? (
//             <button 
//               className="cursor-pointer text-gray-600 hover:text-indigo-600" 
//               onClick={() => signOut()}
//               // onClick={() => signOut({ callbackUrl: '/' })}
//             >
//               로그아웃
//             </button>
//           ) : (
//             <>
//               <button 
//                 className="cursor-pointer text-gray-600 hover:text-indigo-600 pr-3" 
//                 onClick={() => router.push('/auth/signin')}
//               >
//                 로그인
//               </button>
//               <button 
//                 className="cursor-pointer text-gray-600 hover:text-indigo-600" 
//                 onClick={() => router.push('/auth/signup')}
//               >
//                 회원가입
//               </button>
//             </>
//           )}
//         </nav>
//       </div>
//     </header>
//   );
// }
