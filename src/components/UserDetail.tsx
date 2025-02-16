'use client';

import Image from 'next/image';
import { User } from '../types/user';
import { Navbar } from './Navbar';
import { useRouter } from 'next/navigation';
import { Button } from './ui/Button';

interface UserDetailProps {
  user: User;
}

const UserDetail = ({ user }: UserDetailProps) => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        title="User Details"
        leftIcon={
          <Button
            onClick={() => router.back()}
            variant="ghost"
            icon={
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            }
          />
        }
      />
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex flex-col items-center">
            <Image
              src={user.avatar}
              alt={`${user.first_name} ${user.last_name}`}
              width={120}
              height={120}
              className="rounded-full"
            />
            <h1 className="mt-6 text-2xl font-bold">
              {user.first_name} {user.last_name}
            </h1>
            <p className="mt-2 text-gray-600">{user.email}</p>
          </div>

          <div className="mt-8 border-t pt-6">
            <h2 className="text-lg font-semibold mb-4">
              Additional Information
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="text-sm text-gray-500">ID</label>
                <p>{user.id}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">First Name</label>
                <p>{user.first_name}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Last Name</label>
                <p>{user.last_name}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Email</label>
                <p>{user.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
