'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

const publicPaths = ['/login', '/register'];

export function RouteGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleNavigation = async () => {
      console.log('Auth state changed:', { user, loading, pathname });

      if (!loading) {
        if (!user && !publicPaths.includes(pathname)) {
          router.replace('/login');
        } else if (user && publicPaths.includes(pathname)) {
          router.replace('/');
        }
      }
    };

    handleNavigation();
  }, [user, loading, pathname, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
