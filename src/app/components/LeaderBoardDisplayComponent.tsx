"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

type TestResult = {
  id: string;
  username: string;
  emailId: string;
  imgUrl: string;
  wpm: number;
  deviceType: string;
  createdAt: string;
};

type LeaderBoardDisplayComponentProps = {
  results: TestResult[];
};

const LeaderBoardDisplayComponent: React.FC<
  LeaderBoardDisplayComponentProps
> = ({ results }) => {
  

  const pathName = usePathname();

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
        <div className="h-full w-full overflow-y-scroll">
          {results.length > 0 ? (
            results.map((result, index) => (
              <div
                key={result.id}
                className="grid grid-cols-5 font-medium w-full p-2"
              >
                <div className="hidden sm:flex sm:col-span-1 px-6 pt-2">
                  <p>{index + 1}</p>
                </div>
                <div className="col-span-4 sm:col-span-2 flex justify-start items-center space-x-4">
                  <img
                    src={result.imgUrl}
                    alt="Dlogo"
                    className="w-10 h-10 rounded-full border"
                  />
                  <p>{result.username}</p>
                </div>
                <div className="col-span-1 flex justify-center pt-2">
                  <p>{result.wpm}</p>
                </div>
                <div className="hidden sm:col-span-1 sm:flex justify-center pt-2">
                  <p>{result.deviceType}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col justify-start items-center space-y-4 p-8">
              <p className="font-medium text-xl">No records found!</p>
              <Link href="/console">
                <button className="bg-blue-700 py-2 px-6 rounded-full font-medium text-xl text-white">
                  Start Game
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaderBoardDisplayComponent;
