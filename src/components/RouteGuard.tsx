'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

const publicPaths = ['/login', '/register'];

const isPublicPath = (path: string) => {
  return publicPaths.includes(path) || path === '/';
};

export function RouteGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      if (user && pathname === '/') {
        router.replace('/users');
      } else if (!user && !isPublicPath(pathname)) {
        router.replace('/login');
      }
    }
  }, [user, loading, pathname, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user && !isPublicPath(pathname)) {
    return null;
  }

  return <>{children}</>;
}
