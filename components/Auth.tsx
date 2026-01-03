'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const { signup, login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password);
        setSuccess('✅ Success! Check your email.');
      }
    } catch (err: any) {
      setError(err.message || 'Bir hata oluştu');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-medicine-silver flex flex-col-2 items-center justify-center">
      
      <div className="bg-[#ffeef3] p-8  rounded-2xl shadow-md shadow-pink-300 w-full max-w-md ">
        <div className="text-3xl font-bold text-right ">
            <Image
                alt="logo" src="/dia.png"  height={200}width={170} className=' ml-24 text-white'/>
        
        </div>
     

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 mt">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-pink-300 hover:border hover:border-pink-500 rounded-lg  focus:border-transparent text-gray-900"
              placeholder="example@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-pink-300 hover:border hover:border-pink-500 rounded-lg  text-gray-900"
              placeholder="••••••••"
              required
              minLength={6}
            />
            <p className="text-xs text-gray-500 mt-1">At least 6 characters</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              ⚠️ {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#710F3D] text-white py-3 rounded-lg font-medium hover:bg-[#B383A0] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? '⏳ Loading...' : isLogin ? ' Sign in' : ' Sign up'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
              setSuccess('');
            }}
            className="text-[#710F3D] hover:text-indigo-700 text-sm font-medium"
          >
            {isLogin
              ? 'New to DIA? Create an account'
              : 'Already have an account? Sign in '}
          </button>
        </div>
      </div>
    </div>
  );
}
