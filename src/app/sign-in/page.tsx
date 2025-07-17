'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Mail, Lock, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const router = useRouter();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const handleSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const { error } = await signIn(data.email, data.password);
      
      if (error) {
        form.setError('root', { 
          message: error || 'Invalid email or password'
        });
      } else {
        // Redirect to home page after successful sign in
        router.push('/');
      }
    } catch (error) {
      form.setError('root', { 
        message: 'An unexpected error occurred'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-primary-950 pt-20">
        <div className="max-w-md w-full space-y-8">
          {/* Back Link */}
          <div>
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-100 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>

          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-display font-bold text-gray-100">
              Sign In
            </h1>
            <p className="mt-2 text-gray-400">
              Welcome back! Please sign in to your account.
            </p>
          </div>

          {/* Sign In Form */}
          <div className="bg-primary-900 rounded-2xl p-8 border border-primary-800">
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    {...form.register('email')}
                    type="email"
                    className="w-full pl-10 pr-4 py-3 bg-primary-800 border border-primary-700 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
                {form.formState.errors.email && (
                  <p className="mt-1 text-sm text-red-400">{form.formState.errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    {...form.register('password')}
                    type={showPassword ? 'text' : 'password'}
                    className="w-full pl-10 pr-12 py-3 bg-primary-800 border border-primary-700 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {form.formState.errors.password && (
                  <p className="mt-1 text-sm text-red-400">{form.formState.errors.password.message}</p>
                )}
              </div>

              {/* Error Message */}
              {form.formState.errors.root && (
                <div className="flex items-center gap-2 p-3 bg-red-950/30 border border-red-800/50 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
                  <p className="text-sm text-red-300">{form.formState.errors.root.message}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>

              {/* Demo Account Info */}
              <div className="bg-accent-950/30 border border-accent-800/50 rounded-lg p-3">
                <p className="text-sm text-accent-300 font-medium mb-1">Demo Account:</p>
                <p className="text-xs text-accent-400">
                  Email: demo@example.com<br />
                  Password: Any password works!
                </p>
              </div>

              {/* Create Account Link */}
              <div className="text-center">
                <p className="text-gray-400 text-sm">
                  Don't have an account?{' '}
                  <Link
                    href="/create-account"
                    className="text-accent-400 hover:text-accent-300 font-medium"
                  >
                    Create one
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 