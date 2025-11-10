import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext.jsx';
import { motion } from 'framer-motion';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await register(name, email, password);
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full space-y-10 bg-white p-10 rounded-lg shadow-2xl border border-gray-100"
      >
        <div>
          <Link to="/" className="flex justify-center mb-8">
            {/* Logo: Sophisticated look with a golden/yellow accent - Matches Login.jsx */}
            <span className="text-4xl font-serif font-bold tracking-widest text-gray-900 transition-colors uppercase">
              TYMLY
              <span className="block w-full h-0.5 bg-yellow-600 mx-auto mt-1 transform scale-x-75"></span>
            </span>
          </Link>
          <h2 className="text-center text-3xl font-serif font-light text-gray-900 tracking-wider">
            Begin Your Collection
          </h2>
          <p className="mt-4 text-center text-sm text-gray-500 font-light">
            Create an account to manage your profile and purchases.
            <br />
            Or{' '}
            <Link 
              to="/login" 
              className="font-medium text-yellow-700 hover:text-yellow-600 border-b border-yellow-700 hover:border-yellow-600 transition-colors"
            >
              sign in to your existing account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Error Message */}
          {error && (
            <div className="rounded-sm bg-red-50 p-4 border border-red-300">
              <div className="flex">
                <div className="text-sm font-medium text-red-800">{error}</div>
              </div>
            </div>
          )}
          
          <div className="space-y-4">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="sr-only">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-sm focus:outline-none focus:ring-yellow-600 focus:border-yellow-600 sm:text-sm transition duration-150 ease-in-out"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {/* Email Input */}
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-sm focus:outline-none focus:ring-yellow-600 focus:border-yellow-600 sm:text-sm transition duration-150 ease-in-out"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {/* Password Input */}
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-sm focus:outline-none focus:ring-yellow-600 focus:border-yellow-600 sm:text-sm transition duration-150 ease-in-out"
                placeholder="Password (min 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* Confirm Password Input */}
            <div>
              <label htmlFor="confirm-password" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-sm focus:outline-none focus:ring-yellow-600 focus:border-yellow-600 sm:text-sm transition duration-150 ease-in-out"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              // Button: Dark/Black background with golden hover effect - Matches Login.jsx
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-sm text-white bg-gray-900 hover:bg-yellow-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-600 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 uppercase tracking-widest"
            >
              {loading ? (
                <span className="flex items-center">
                  <Loader2 size={16} className="mr-2 animate-spin" /> 
                  Creating Account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

