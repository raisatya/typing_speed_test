"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link';

type TestResult = {
  id: string;
  username: string;
  emailId: string;
  imgUrl: string;
  wpm: number;
  deviceType: string;
  createdAt: string;
};

const fetchResults = async (
  devicetype: string
): Promise<TestResult[]> => {
  const response = await fetch(`/api/get-results/${devicetype}`, {
    method: "GET",
    headers: {
      "Cache-Control": "no-store", // Disable caching
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};


const Scores = ({ devicetype }: { devicetype: string }) => {

      const [results, setResults] = useState<TestResult[]>([]);
      const [loading, setLoading] = useState<boolean>(true);
      const [error, setError] = useState<string | null>(null);
      console.log(results);

    useEffect(() => {
      const loadResults = async () => {
      try {
        const data = await fetchResults(devicetype);
        setResults(data);
      } catch (err) {
        setError('Failed to connect to the database');
        console.error('Error fetching results:', err);
      } finally {
        setLoading(false);
      }
    };

    loadResults();
  }, []);

  if (loading) return (
    <div className='flex flex-col justify-center items-center h-full'>
      <div className="w-6 h-6 border-2 border-dashed mr-2 rounded-full animate-spin border-black"></div>
        <p className='font-medium text-lg'>Loading data, please wait...</p>
    </div>
  );
  if (error) return (
    <div className="flex flex-col justify-center items-center h-full">
      <p className="font-medium text-lg text-red-800">{error}</p>
      <p className="font-medium text-lg mt-4">You can still play the game!</p>
      <Link href="/console">
        <button
          className='bg-blue-700 py-2 px-6 rounded-full font-medium text-xl text-white'
        >
          Start Game
        </button>
      </Link>
    </div>
  );;
    
  return (
    
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
  );
}

export default Scores