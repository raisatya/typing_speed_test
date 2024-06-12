// app/components/LeaderBoardDisplayComponent.tsx

type TestResult = {
  id: string;
  username: string;
  emailId: string;
  imgUrl: string;
  wpm: number;
  deviceType: string;
  createdAt: string;
};

type LeaderBoardDisplayComponentProps = {
  results: TestResult[];
};

const LeaderBoardDisplayComponent: React.FC<
  LeaderBoardDisplayComponentProps
> = ({ results }) => {
  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <ul>
        {results.map((result) => (
          <li key={result.id}>
            User: {result.username}, WPM: {result.wpm}, Date:{" "}
            {new Date(result.createdAt).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeaderBoardDisplayComponent;
