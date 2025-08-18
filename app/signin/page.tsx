'use client'

import Link from "next/link";

export default function page() {
  return (
    <>
      <button type="submit">구글 로그인</button>
    </>
  );
}


// 'use client'

// import { signIn } from "next-auth/react"

// export default function SignInPage() {
//     const signInWithGoogle = async() => {
//         await signIn('google');
//     }

//     return (
//       <>
//         <form
//           action={() => {}}
//           style={{
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'start',
//             gap: '10px'
//           }}>
//           <label>
//             이메일(ID)
//             <input
//               name="email"
//               type="email"
//             />
//           </label>
//           <label>
//             비밀번호
//             <input
//               name="password"
//               type="password"
//             />
//           </label>
//           <button>로그인</button>
//         </form>
//         <hr />
//         <button onClick={() => signIn('google')}>Google 로그인</button>
//       </>
//     )
//   }