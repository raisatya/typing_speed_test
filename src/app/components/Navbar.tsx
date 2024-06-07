import { getServerSession } from 'next-auth'
import { NEXT_AUTH_CONFIG } from '@/lib/auth';
import SignInButton from "./SignInButton";

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
        <button className="w-32 sm:w-36">
          <img src="/TypeRush.svg" alt="Dlogo" className="-mt-5" />
        </button>
      </div>
      {session ? (
        <p>
          {session.user?.name}
          <img src={imageSrc} alt="Dlogo" className="-mt-5" />
        </p>
      ) : (
        <SignInButton />
      )}
    </nav>
  );
}

export default Navbar