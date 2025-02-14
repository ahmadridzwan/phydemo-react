'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import Loading from '../components/Loading';
import UserList from '../components/UserList';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return <Loading useTimer className="h-screen bg-background" />;
  }

  if (!user) {
    return null; // Router will handle redirect
  }

  return <UserList />;
}
