'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, User, Mail, Phone, Lock, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const registerSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function CreateAccountPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const router = useRouter();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    }
  });

  const handleSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      const { error } = await signUp(data.email, data.password, {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
      });
      
      if (error) {
        form.setError('root', { 
          message: error || 'Failed to create account'
        });
      } else {
        // Redirect to home page after successful account creation
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
      
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-primary-950 pt-20 pb-12">
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
              Create Account
            </h1>
            <p className="mt-2 text-gray-400">
              Join Demo Smoke and start shopping today!
            </p>
          </div>

          {/* Create Account Form */}
          <div className="bg-primary-900 rounded-2xl p-8 border border-primary-800">
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    First Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      {...form.register('firstName')}
                      type="text"
                      className="w-full pl-10 pr-4 py-3 bg-primary-800 border border-primary-700 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                      placeholder="First name"
                    />
                  </div>
                  {form.formState.errors.firstName && (
                    <p className="mt-1 text-sm text-red-400">{form.formState.errors.firstName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Last Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      {...form.register('lastName')}
                      type="text"
                      className="w-full pl-10 pr-4 py-3 bg-primary-800 border border-primary-700 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                      placeholder="Last name"
                    />
                  </div>
                  {form.formState.errors.lastName && (
                    <p className="mt-1 text-sm text-red-400">{form.formState.errors.lastName.message}</p>
                  )}
                </div>
              </div>

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

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number <span className="text-gray-500">(optional)</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    {...form.register('phone')}
                    type="tel"
                    className="w-full pl-10 pr-4 py-3 bg-primary-800 border border-primary-700 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    placeholder="(555) 123-4567"
                  />
                </div>
                {form.formState.errors.phone && (
                  <p className="mt-1 text-sm text-red-400">{form.formState.errors.phone.message}</p>
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
                    placeholder="Create a password"
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

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    {...form.register('confirmPassword')}
                    type={showPassword ? 'text' : 'password'}
                    className="w-full pl-10 pr-4 py-3 bg-primary-800 border border-primary-700 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    placeholder="Confirm your password"
                  />
                </div>
                {form.formState.errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-400">{form.formState.errors.confirmPassword.message}</p>
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
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>

              {/* Demo Info */}
              <div className="bg-accent-950/30 border border-accent-800/50 rounded-lg p-3">
                <p className="text-sm text-accent-300 font-medium mb-1">Demo Mode:</p>
                <p className="text-xs text-accent-400">
                  This is a demo app. Any information you enter will be stored locally in your browser only.
                </p>
              </div>

              {/* Sign In Link */}
              <div className="text-center">
                <p className="text-gray-400 text-sm">
                  Already have an account?{' '}
                  <Link
                    href="/sign-in"
                    className="text-accent-400 hover:text-accent-300 font-medium"
                  >
                    Sign in
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