import { Card, CardHeader, CardFooter } from "@/components/ui/card";
import Typography from "@/components/ui/Typography";

interface UserCardProps {
  user: {
    handle: string;
    rating: number;
    maxRating: number;
    rank: string;
    maxRank: string;
    avatar: string;
  };
}

const UserCard: React.FC<UserCardProps> = ({ user }) => (
  <Card>
    {/* Card Header */}
    <CardHeader className="flex items-center space-x-4 p-4">
      <img src={user.avatar} alt={user.handle} className="rounded-full w-12 h-12" />
      <Typography variant="h2" className="text-xl font-bold">{user.handle}</Typography>
    </CardHeader>

    {/* User Details */}
    <div className="p-4 grid gap-2">
      <div className="flex justify-between">
        <Typography className="font-semibold">Rating:</Typography>
        <Typography>{user.rating}</Typography>
      </div>
      <div className="flex justify-between">
        <Typography className="font-semibold">Max Rating:</Typography>
        <Typography>{user.maxRating}</Typography>
      </div>
      <div className="flex justify-between">
        <Typography className="font-semibold">Rank:</Typography>
        <Typography>{user.rank}</Typography>
      </div>
      <div className="flex justify-between">
        <Typography className="font-semibold">Max Rank:</Typography>
        <Typography>{user.maxRank}</Typography>
      </div>
    </div>

    {/* Optional Footer */}
    <CardFooter className="p-4">
      <Typography className="text-sm text-gray-500">Data fetched from Codeforces API</Typography>
    </CardFooter>
  </Card>
);

export default UserCard;
