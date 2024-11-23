import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface RatingChartProps {
  ratings: Array<{ contestId: number; contestName: string; newRating: number }>;
}

const RatingChart: React.FC<RatingChartProps> = ({ ratings }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={ratings}>
        <XAxis dataKey="contestName" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="newRating" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default RatingChart;
