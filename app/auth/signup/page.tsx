"use client";

import Button from "@/app/components/common/Button";
import Link from "next/link";

export default function SignupPage() {
  return (
    <>
      <form className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="이메일"
          className="border rounded-lg px-4 py-2"
        />
        <input
          type="password"
          placeholder="비밀번호"
          className="border rounded-lg px-4 py-2"
        />
        <Button
          type="submit"
        >
          회원가입
        </Button>
      </form>

      <div className="flex justify-center mt-4">
        <span>가입 된 계정이 있으십니까? <Link className="underline text-indigo-600" href="/auth/signin">로그인</Link></span>
      </div>
    </>
  );
}


// 'use client'

// export default function SignUpPage() {


//   return (
//     <>
//       <form
//         action={() => {}}
//         style={{
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'start',
//           gap: '10px'
//         }}>
//         <label>
//           사용자 이름
//           <input
//             name="displayName"
//             type="text"
//           />
//         </label>
//         <label>
//           이메일(ID)
//           <input
//             name="email"
//             type="email"
//           />
//         </label>
//         <label>
//           비밀번호
//           <input
//             name="password"
//             type="password"
//           />
//         </label>
//         <button>회원가입</button>
//       </form>
//     </>
//   )
// }