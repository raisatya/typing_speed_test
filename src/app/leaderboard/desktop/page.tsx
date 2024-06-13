import LeaderBoardDisplayComponent from "@/app/components/LeaderBoardDisplayComponent";
import Navbar from "@/app/components/Navbar";

const DesktopLeaderBoardPage = async () => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/get-results/desktop`, {
    cache: 'no-store',
    next: { tags: ["Desktop"] },
  });
  const results = await res.json();

  return (
    <div className="blurryBackground bg-no-repeat bg-cover max-w-8xl h-screen flex flex-col justify-start items-center">
      <Navbar />
      <LeaderBoardDisplayComponent results={results} />
    </div>
  );
};

export default DesktopLeaderBoardPage;