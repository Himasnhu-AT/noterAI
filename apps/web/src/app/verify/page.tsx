// "use client";

// import React, { useState, useEffect } from "react";
// import { useSearchParams } from 'next/navigation';

// function Verify() {
//   const searchParams = useSearchParams();
//   const [email, setEmail] = useState<string | null>(null);

//   useEffect(() => {
//     const emailParam = searchParams.get('email');
//     setEmail(emailParam);
//   }, [searchParams]);

//   return (
//     <div className='h-screen flex justify-center items-center'>
//       <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
//         Verify your email
//       </h2>
//     </div>
//   );
// }

// export default Verify;
import React from 'react'

function verifypage() {
  return (
    <div>page</div>
  )
}

export default verifypage