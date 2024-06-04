import React from 'react'

interface ScoreDisplayProps {
  wpm: number;
  handleCancelResult: () => void;
  handleSubmit: () => void;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({
  wpm,
  handleCancelResult,
  handleSubmit,
}) => {
  return (
    <div className="max-w-4xl w-full bg-white rounded-xl m-3 p-6 flex flex-col justify-center items-center">
      <p className="text-4xl font-semibold">WORDS PER MINUTE</p>
      <p className="mt-4 text-8xl font-bold">{wpm}</p>
      <div className="flex justify-center items-center space-x-4 my-12">
        <button
          onClick={handleCancelResult}
          className="relative flex py-2 text-white items-center justify-center px-8 before:absolute before:inset-0 before:rounded-full before:bg-indigo-700 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="relative size-6 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>

          <span className="relative flex justify-center items-center space-x-1 text-sm font-semibold">
            Cancel
          </span>
        </button>
        <button
          onClick={handleSubmit}
          className="relative flex py-2 text-white items-center justify-center px-10 before:absolute before:inset-0 before:rounded-full before:bg-purple-700 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="relative size-6 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>

          <span className="relative flex justify-center items-center space-x-1 text-sm font-semibold">
            Save
          </span>
        </button>
      </div>
    </div>
  );
};

export default ScoreDisplay