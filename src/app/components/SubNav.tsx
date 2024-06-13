"use client"

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { isMobile } from '@/utils/detectDevice'
import { usePathname } from 'next/navigation'

const SubNav = () => {

    const [isMobileDevice, setIsMobileDevice] = useState<boolean>(false);
    const [isActive, setIsActive] = useState<boolean>(false);
    const pathName = usePathname();

    useEffect(() => {
      setIsMobileDevice(isMobile());
      if((pathName == '/leaderboard/desktop') || (pathName === '/leaderboard/mobile')) setIsActive(true);
    }, []);

    const leaderboardLink = isMobileDevice ? '/leaderboard/mobile' : '/leaderboard/desktop';
    return (
      <div className='hover:bg-gray-200 p-2 rounded-xl'>
        <Link href={leaderboardLink}>
          <p className={`font-medium cursor-pointer ${isActive ? "text-blue-700" : ""}`}>Leaderboard</p>
        </Link>
      </div>
    );
}

export default SubNav