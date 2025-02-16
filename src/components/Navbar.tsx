'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { ReactNode } from 'react';
import { Button } from './ui/Button';

interface NavbarProps {
  title?: string;
  leftIcon?: ReactNode;
}

export function Navbar({ title, leftIcon }: NavbarProps) {
  const { user, signOut } = useAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {leftIcon}
            {title && <h1 className="ml-2 text-xl font-semibold">{title}</h1>}
          </div>

          <div className="flex items-center">
            {user ? (
              <Button onClick={signOut} variant="outline">
                Sign out
              </Button>
            ) : (
              <div className="space-x-4">
                <Link href="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link href="/register">
                  <Button variant="primary">Register</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
