'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import UserDetail from '@/components/UserDetail';
import Loading from '@/components/Loading';
import { User } from '@/types/user';
import { fetchUserById } from '@/services/api';

export default function UserDetailPage() {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await fetchUserById(id as string);
        setUser(userData);
      } catch (error) {
        setError(`Failed to load user details. Error: ${error}`);
      }
    };

    loadUser();
  }, [id]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="bg-red-100 text-red-700 p-4 rounded-md">{error}</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loading className="h-16" />
      </div>
    );
  }

  return <UserDetail user={user} />;
}
