'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

interface NavbarProps {
  title?: string;
}

export function Navbar({ title }: NavbarProps) {
  const { user, signOut } = useAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {title && <h1 className="text-xl font-semibold">{title}</h1>}
          </div>

          <div className="flex items-center">
            {user ? (
              <button
                onClick={signOut}
                className="text-gray-500 hover:text-gray-700 px-4 py-2 rounded-md border border-gray-300 hover:border-gray-400 transition-colors"
              >
                Sign out
              </button>
            ) : (
              <div className="space-x-4">
                <Link
                  href="/login"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
