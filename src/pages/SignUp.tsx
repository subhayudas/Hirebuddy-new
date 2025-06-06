import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

const SignUp = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithGoogle, signInWithMicrosoft } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      await signInWithGoogle();
      toast({
        title: 'Welcome to HireBuddy!',
        description: 'Your account has been created successfully.',
      });
    } catch (err) {
      setError('Failed to sign up with Google. Please try again.');
      console.error(err);
      setIsLoading(false);
    }
  };

  const handleMicrosoftSignUp = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      await signInWithMicrosoft();
      toast({
        title: 'Welcome to HireBuddy!',
        description: 'Your account has been created successfully.',
      });
    } catch (err) {
      setError('Failed to sign up with Microsoft. Please try again.');
      console.error(err);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>
        </div>
        
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h1 className="text-3xl font-bold">HireBuddy</h1>
            </div>
            
            <h2 className="text-5xl font-bold leading-tight mb-6">
              Start Your
              <br />
              <span className="text-orange-200">Career Journey</span>
              <br />
              Today
            </h2>
            
            <p className="text-xl text-orange-100 mb-8 leading-relaxed">
              Join thousands of professionals who have found their dream jobs with HireBuddy's intelligent matching system.
            </p>
            
            <div className="space-y-4 text-orange-100">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-orange-200 rounded-full"></div>
                <span className="text-lg">AI-Powered Job Matching</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-orange-200 rounded-full"></div>
                <span className="text-lg">Personalized Career Insights</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-orange-200 rounded-full"></div>
                <span className="text-lg">Expert Interview Preparation</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Sign Up Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="w-full max-w-md relative">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">HireBuddy</h1>
            </div>
          </div>

          {/* Sign Up Card */}
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h2>
              <p className="text-gray-600">Join HireBuddy and accelerate your career</p>
            </div>

            {error && (
              <Alert variant="destructive" className="mb-6 bg-red-50/80 backdrop-blur-sm border-red-200/50">
                <AlertDescription className="text-red-700">{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-4">
              {/* Google Sign Up */}
              <Button
                onClick={handleGoogleSignUp}
                disabled={isLoading}
                className="w-full h-14 bg-white/80 hover:bg-white text-gray-700 border border-gray-200 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02] rounded-2xl group"
                variant="outline"
              >
                <div className="flex items-center justify-center gap-3">
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24">
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
                  <span className="font-medium">Sign up with Google</span>
                </div>
              </Button>

              {/* Microsoft Sign Up */}
              <Button
                onClick={handleMicrosoftSignUp}
                disabled={isLoading}
                className="w-full h-14 bg-white/80 hover:bg-white text-gray-700 border border-gray-200 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02] rounded-2xl group"
                variant="outline"
              >
                <div className="flex items-center justify-center gap-3">
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24">
                    <path fill="#f25022" d="M0 0h11.5v11.5H0z"/>
                    <path fill="#00a4ef" d="M12.5 0H24v11.5H12.5z"/>
                    <path fill="#7fba00" d="M0 12.5h11.5V24H0z"/>
                    <path fill="#ffb900" d="M12.5 12.5H24V24H12.5z"/>
                  </svg>
                  <span className="font-medium">Sign up with Microsoft</span>
                </div>
              </Button>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white/70 text-gray-500 rounded-full">OR</span>
                </div>
              </div>

              {/* Continue as Guest */}
              <Button
                onClick={() => navigate('/dashboard')}
                className="w-full h-14 bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white font-semibold rounded-2xl transition-all duration-300 hover:shadow-lg hover:scale-[1.02] group"
              >
                <span className="group-hover:scale-105 transition-transform duration-300">
                  Continue as Guest
                </span>
              </Button>
            </div>

            {/* Features Preview */}
            <div className="mt-8 p-4 bg-gradient-to-r from-orange-50 to-orange-100/50 rounded-2xl border border-orange-200/30">
              <h3 className="font-semibold text-gray-900 mb-3 text-center">What you'll get:</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-700">Smart job alerts</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-700">Resume builder</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-700">Interview prep</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-700">Career insights</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link 
                  to="/signin" 
                  className="font-semibold text-orange-600 hover:text-orange-700 transition-colors duration-300"
                >
                  Sign in now
                </Link>
              </p>
              
              <div className="mt-6 pt-6 border-t border-gray-200/50">
                <p className="text-xs text-gray-500">
                  By signing up, you agree to HireBuddy's{' '}
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
                <p className="text-sm text-gray-600 font-medium">Creating your account...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;