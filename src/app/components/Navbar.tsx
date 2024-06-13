import { getServerSession } from 'next-auth'
import { NEXT_AUTH_CONFIG } from '@/lib/auth';
import SignInButton from "./SignInButton";
import Link from 'next/link';
import SubNav from './SubNav';
import SignOutButton from './SignOutButton';

async function getUser() {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  return session;
}

const Navbar = async () => {
  const session = await getUser();

  const imageSrc = session?.user?.image || "/TypeRush.svg";

  return (
    <nav className="flex justify-between items-center py-3 px-3 sm:px-8 bg-transparent border-b w-full">
      <div className="flex items-center sm:space-x-6">
        <Link href={"/"}>
          <img src="/TypeRush.svg" alt="Dlogo" className="-mt-3 w-32" />
        </Link>
        <SubNav />
      </div>
      {session ? (
        <div className="flex justify-end items-center space-x-2">
          <div className='flex flex-col justify-center items-end'>
            <p className="flex justify-end font-medium cursor-default w-24 sm:w-48 truncate">{session.user?.name}</p>
            <SignOutButton/>
          </div>
          <div className="hidden sm:flex justify-center items-center bg-blue-200 font-medium text-lg tracking-wide w-10 h-10 rounded-full ring-1 ring-gray-300 ring-offset-2 sm:ring-offset-4 ring-offset-slate-100">
            {session.user?.name?.at(0)}
            {session.user?.name?.at(session.user.name?.indexOf(" ") + 1)}
          </div>
        </div>
      ) : (
        <SignInButton />
      )}
    </nav>
  );
}

export default Navbar