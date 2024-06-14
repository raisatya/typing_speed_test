import LeaderboardComponent from "@/app/components/LeaderboardCard";
import Navbar from "@/app/components/Navbar";

const MobileLeaderBoardPage = async () => {

  return (
    <div className="blurryBackground bg-no-repeat bg-fixed bg-cover max-w-8xl h-screen flex flex-col justify-start items-center">
      <Navbar />
      <LeaderboardComponent devicetype="mobile" />
    </div>
  );
};

export default MobileLeaderBoardPage;
