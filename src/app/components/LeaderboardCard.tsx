"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import Scores from "./Scores";
import SignInButton from "./SignInButton";

const LeaderboardComponent = ({ devicetype }: { devicetype: string }) => {
  const pathName = usePathname();
  const { data: session } = useSession();

  return (
    <div className="w-full flex flex-col items-center h-full overflow-y-hidden">
      <div className="max-w-8xl mx-auto flex justify-center items-center space-x-6 font-medium p-3">
        <Link href="/console">
          <button className="flex items-center -ml-10 py-2 px-3 hover:bg-gray-200 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5 mr-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
            Back
          </button>
        </Link>
        <Link href="/leaderboard/mobile">
          <p
            className={`p-2 hover:text-blue-700 ${
              pathName == "/leaderboard/mobile"
                ? "text-blue-700 border-b-2 border-b-blue-700"
                : ""
            }`}
          >
            Mobile
          </p>
        </Link>
        <Link href="/leaderboard/desktop">
          <p
            className={`p-2 hover:text-blue-700 ${
              pathName == "/leaderboard/desktop"
                ? "text-blue-700 border-b-2 border-b-blue-700"
                : ""
            }`}
          >
            Desktop
          </p>
        </Link>
      </div>
      <div className="flex flex-col justify-start items-center h-full overflow-y-hidden py-3 px-6 border divide-y rounded-2xl bg-white w-full max-w-3xl">
        <div className="grid grid-cols-5 font-medium w-full p-2">
          <div className="hidden sm:contents sm:col-span-1">
            <p className="">Ranking</p>
          </div>
          <div className="col-span-4 sm:col-span-2 px-12">
            <p>Name</p>
          </div>
          <div className="col-span-1 flex justify-start sm:justify-center -ml-4">
            <p>Words/min</p>
          </div>
          <div className="hidden sm:col-span-1 sm:flex pl-6">
            <p>Device</p>
          </div>
        </div>
        {session ?
        <Scores devicetype={devicetype} /> : 
      <div className="flex flex-col justify-start items-center p-6 h-full w-full space-y-4">
        <p className="font-medium text-lg">You must be signed in</p>
        <SignInButton/>
          </div>
          }
      </div>
    </div>
  );
};

export default LeaderboardComponent;
