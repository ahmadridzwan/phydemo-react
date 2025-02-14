import Image from 'next/image';
import { User } from '../types/user';

interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => {
  return (
    <div className="p-6 border rounded-lg shadow-md flex flex-col items-center bg-white">
      <Image
        src={user.avatar}
        alt={`${user.first_name} ${user.last_name}`}
        width={80}
        height={80}
        className="rounded-full"
      />
      <h3 className="mt-4 text-lg font-semibold">
        {user.first_name} {user.last_name}
      </h3>
      <p className="text-sm text-gray-500 mt-2">{user.email}</p>
    </div>
  );
};

export default UserCard;
