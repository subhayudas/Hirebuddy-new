import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

const SignIn = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [animateCard, setAnimateCard] = useState(false);
  const { signInWithGoogle, signInWithMicrosoft } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Trigger animation after component mounts
    setAnimateCard(true);
  }, []);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      await signInWithGoogle();
      toast({
        title: 'Success',
        description: 'Welcome to Hirebuddy!',
      });
    } catch (err) {
      setError('Failed to sign in with Google. Please try again.');
      console.error(err);
      setIsLoading(false);
    }
  };

  const handleMicrosoftSignIn = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      await signInWithMicrosoft();
      toast({
        title: 'Success',
        description: 'Welcome to Hirebuddy!',
      });
    } catch (err) {
      setError('Failed to sign in with Microsoft. Please try again.');
      console.error(err);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-gray-100 to-orange-50 p-4 sm:p-6 md:p-8">
      <motion.div 
        className="w-full max-w-7xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Left Side - Hero Section */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-orange-400 animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-r from-white via-orange-100 to-orange-300 animate-pulse"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-orange-200/30 via-white to-white animate-pulse delay-700"></div>
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-20 left-20 w-72 h-72 bg-orange-200/40 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-300/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-orange-100/50 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>
          </div>
          
          <div className="relative z-10 flex flex-col justify-center px-16 text-black">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-orange-500/80 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <h1 className="text-3xl font-black text-black">Hirebuddy</h1>
              </div>
              
              <h2 className="text-5xl font-black leading-tight mb-6 text-black">
                Ensure a Fast and
                <br />
                <span className="text-orange-600 font-black">Successful Journey</span> to
                <br />
                Your Next Career Move
              </h2>
              
              <div className="space-y-4 text-black">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-lg font-semibold">2X More Qualified Job Matches</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-lg font-semibold">60% Time Savings in Job Searches</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-lg font-semibold">50% More Interview Invites</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Sign In Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Hirebuddy</h1>
              </div>
            </div>

            {/* Sign In Card */}
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 animate-slideIn hover:shadow-orange-200/30 transition-all duration-500">
              <div className="text-center mb-8 animate-fadeIn">
                <h2 className="text-3xl font-bold text-gray-900 mb-2 hover:text-orange-600 transition-colors duration-300">Welcome to Hirebuddy</h2>
                <p className="text-gray-600 animate-fadeIn animation-delay-100">Sign in to continue your career journey</p>
              </div>

              {error && (
                <Alert variant="destructive" className="mb-6 bg-red-50/80 backdrop-blur-sm border-red-200/50">
                  <AlertDescription className="text-red-700">{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                {/* Google Sign In */}
                <Button
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  className="w-full h-14 bg-white/80 hover:bg-white text-gray-700 border border-gray-200 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.03] rounded-2xl group animate-fadeIn"
                  variant="outline"
                >
                  <div className="flex items-center justify-center gap-3">
                    <svg className="w-5 h-5 group-hover:scale-125 transition-transform duration-300 group-hover:rotate-3" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    <span className="font-medium group-hover:text-blue-600 transition-colors duration-300">Sign in with Google</span>
                  </div>
                </Button>

                {/* Microsoft Sign In */}
                <Button
                  onClick={handleMicrosoftSignIn}
                  disabled={isLoading}
                  className="w-full h-14 bg-white/80 hover:bg-white text-gray-700 border border-gray-200 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.03] rounded-2xl group animate-fadeIn animation-delay-200"
                  variant="outline"
                >
                  <div className="flex items-center justify-center gap-3">
                    <svg className="w-5 h-5 group-hover:scale-125 transition-transform duration-300 group-hover:rotate-3" viewBox="0 0 24 24">
                      <path fill="#f25022" d="M0 0h11.5v11.5H0z"/>
                      <path fill="#00a4ef" d="M12.5 0H24v11.5H12.5z"/>
                      <path fill="#7fba00" d="M0 12.5h11.5V24H0z"/>
                      <path fill="#ffb900" d="M12.5 12.5H24V24H12.5z"/>
                    </svg>
                    <span className="font-medium group-hover:text-blue-600 transition-colors duration-300">Sign in with Microsoft</span>
                  </div>
                </Button>
              </div>

              {/* Footer */}
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <Link 
                    to="/signup" 
                    className="font-semibold text-orange-600 hover:text-orange-700 transition-all duration-300 hover:underline hover:underline-offset-4 hover:scale-105 inline-block"
                  >
                    Sign up now
                  </Link>
                </p>
                
                <div className="mt-6 pt-6 border-t border-gray-200/50">
                  <p className="text-xs text-gray-500">
                    By continuing, you agree to Hirebuddy's{' '}
                    <a href="/terms" className="text-orange-600 hover:text-orange-700 transition-colors">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="/privacy" className="text-orange-600 hover:text-orange-700 transition-colors">
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Loading Overlay */}
            {isLoading && (
              <div className="absolute inset-0 bg-white/50 backdrop-blur-sm rounded-3xl flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-3 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-sm text-gray-600 font-medium">Signing you in...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignIn;