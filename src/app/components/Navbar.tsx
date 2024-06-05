"use client"

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-3 bg-transparent border-b w-full">
      <div className="flex items-center md:gap-x-12">
        <button className="w-32 sm:w-36">
          <img src="/TypeRush.svg" alt="Dlogo" className="-mt-5"/>
        </button>
      </div>
      <button className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 outline-none">
        <span>Sign In</span>
      </button>
    </nav>
  );
}

export default Navbar