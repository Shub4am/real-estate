import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';
import { useAuth } from '@/contexts/AuthContext';

export default function AuthPage() {
  const [tab, setTab] = useState('login');
  const router = useRouter();
  const { currentUser } = useAuth();

  // If user is already authenticated, redirect to dashboard
  useEffect(() => {
    if (currentUser) {
      router.push('/');
    }
  }, [currentUser, router]);

  const handleSuccess = () => {
    // Redirect to homepage after successful auth
    router.push('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Real Estate App</h1>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setTab('login')}
              className={`w-1/2 py-4 text-center font-medium ${
                tab === 'login'
                  ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setTab('signup')}
              className={`w-1/2 py-4 text-center font-medium ${
                tab === 'signup'
                  ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              Sign Up
            </button>
          </div>

          <div className="p-6">
            {tab === 'login' ? (
              <LoginForm onSuccess={handleSuccess} />
            ) : (
              <SignupForm onSuccess={handleSuccess} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 