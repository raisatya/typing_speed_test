import Navbar from './components/Navbar';
import SlidingText from "./components/SlidingText";

const Home = () => {
  return (
    <div className="blurryBackground bg-no-repeat bg-cover max-w-8xl h-screen flex flex-col justify-start items-center">
      <Navbar />
      <div className="flex flex-col justify-start mt-24 items-center h-full">
        <SlidingText/>
      </div>
    </div>
  );
}

export default Home