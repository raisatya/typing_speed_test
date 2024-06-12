import { getServerSession } from 'next-auth'
import { NEXT_AUTH_CONFIG } from '@/lib/auth';
import SignInButton from "./SignInButton";
import Link from 'next/link';

async function getUser() {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  return session;
}

const Navbar = async () => {
  const session = await getUser();

  const imageSrc = session?.user?.image || "/TypeRush.svg";
  return (
    <nav className="flex justify-between items-center p-3 bg-transparent border-b w-full">
      <div className="flex items-center md:gap-x-12">
        <Link href={"/"}>
          <img src="/TypeRush.svg" alt="Dlogo" className="-mt-4 w-32 sm:w-36" />
        </Link>
        <Link href={"/leaderboard/mobile"}>
          <p className="font-medium cursor-pointer">Leaderboard</p>
        </Link>
      </div>
      {session ? (
        <div className="flex justify-end items-center space-x-2">
          <p className="font-medium cursor-default">{session.user?.name}</p>
          <img
            src={imageSrc}
            alt="Dlogo"
            className="w-10 h-10 rounded-full border"
          />
        </div>
      ) : (
        <SignInButton />
      )}
    </nav>
  );
}

export default Navbar