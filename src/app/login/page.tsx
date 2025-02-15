'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AuthHeader } from '@/components/AuthHeader';
import { AuthForm } from '@/components/forms/AuthForm';
import type { AuthFormData } from '@/schemas/auth';

export default function LoginPage() {
  const { signIn } = useAuth();
  const [error, setError] = useState<string>('');

  const handleSubmit = async (data: AuthFormData) => {
    try {
      setError('');
      await signIn(data.email, data.password);
    } catch (error) {
      setError(`Invalid email or password. Error: ${error}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AuthHeader />
      <div className="flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <AuthForm onSubmit={handleSubmit} type="login" error={error} />
        </div>
      </div>
    </div>
  );
}
