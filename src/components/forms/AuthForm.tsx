import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { authSchema, type AuthFormData } from '@/schemas/auth';
import { FormField } from './FormField';
import { PasswordField } from './PasswordField';
import Link from 'next/link';

interface AuthFormProps {
  onSubmit: (data: AuthFormData) => Promise<void>;
  type: 'login' | 'register';
  error?: string;
}

export function AuthForm({ onSubmit, type, error }: AuthFormProps) {
  const methods = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
    mode: 'onChange',
    criteriaMode: 'all',
  });

  const handleSubmit = async (data: AuthFormData) => {
    try {
      await onSubmit(data);
    } catch (error) {
      methods.setError('root', {
        message: 'An error occurred during submission',
      });
      console.error('Submission Error:', error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)} className="space-y-6">
        {(error || methods.formState.errors.root) && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error || methods.formState.errors.root?.message}
          </div>
        )}
        <FormField
          name="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
        />
        <PasswordField
          name="password"
          label="Password"
          placeholder="Enter your password"
          showRequirements={type === 'register'}
        />

        <button
          type="submit"
          disabled={methods.formState.isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
        >
          {methods.formState.isSubmitting
            ? 'Processing...'
            : type === 'login'
              ? 'Sign in'
              : 'Register'}
        </button>

        <div className="text-center">
          {type === 'login' ? (
            <Link
              href="/register"
              className="text-indigo-600 hover:text-indigo-500"
            >
              Don&apos;t have an account? Register
            </Link>
          ) : (
            <Link
              href="/login"
              className="text-indigo-600 hover:text-indigo-500"
            >
              Already have an account? Sign in
            </Link>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
