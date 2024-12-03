import React from 'react';
import { useForm } from 'react-hook-form';
import { LogIn } from 'lucide-react';
import { useStore } from '../../store/useStore';

interface LoginFormData {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const setUser = useStore((state) => state.setUser);

  const onSubmit = (data: LoginFormData) => {
    // TODO: Integrate with backend
    setUser({
      id: '1',
      email: data.email,
      name: 'Demo User',
      role: 'parent'
    });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="card max-w-md w-full">
        <div className="flex items-center justify-center mb-8">
          <LogIn className="h-8 w-8 text-primary mr-2" />
          <h2 className="text-2xl font-bold text-navy">Welcome Back</h2>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              className="input-field"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              {...register('password', { required: 'Password is required' })}
              className="input-field"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <button type="submit" className="btn-primary w-full">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};