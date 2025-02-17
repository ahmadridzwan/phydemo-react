'use client';

import { useRouter } from 'next/navigation';
import { AuthHeader } from '@/components/AuthHeader';
import { AuthForm } from '@/components/forms/AuthForm';
import { signUp } from '@/utils/auth';
import type { AuthFormData } from '@/schemas/auth';
import { useState } from 'react';

export default function Register() {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = async (data: AuthFormData) => {
    try {
      await signUp(data.email, data.password);
      router.push('/');
      router.refresh();
    } catch {
      setError(`Failed to create account.`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AuthHeader />
      <div className="flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Create a new account
          </h2>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          <AuthForm onSubmit={handleSubmit} type="register" />
        </div>
      </div>
    </div>
  );
}
