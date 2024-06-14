import LeaderboardComponent from "@/app/components/LeaderboardCard";
import Navbar from "@/app/components/Navbar";


const DesktopLeaderBoardPage = async () => {


  return (
    <div className="blurryBackground bg-no-repeat bg-cover max-w-8xl h-screen flex flex-col justify-start items-center">
      <Navbar />
      <LeaderboardComponent devicetype="desktop"/>
    </div>
  );
};

export default DesktopLeaderBoardPage;

/*

  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/get-results/desktop`, {
    cache: 'no-store',
    next: { tags: ["Desktop"] },
  });
  const results = await res.json();

*/
//      <LeaderBoardDisplayComponent devicetype="desktop" results={results} />
