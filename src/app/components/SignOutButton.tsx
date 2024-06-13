"use client";

import { signIn, signOut } from "next-auth/react";

const SignOutButton = () => {
  return (
    <button
      onClick={() => signOut()}
      className="border border-gray-300 text-gray-800 text-sm rounded-md px-3 font-medium"
    >
      Logout
    </button>
  );
};

export default SignOutButton;
