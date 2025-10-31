'use client';

import { getUserRequest } from '@/state/auth/auth-slice';
import { RootState } from '@/state/store';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const { user, loading, error, initialized } = useSelector(
    (state: RootState) => state.auth,
  );

  useEffect(() => {
    // Only fetch user if not already initialized
    if (!initialized) {
      dispatch(getUserRequest());
    }
  }, [dispatch, initialized]);

  // Show loading while checking authentication
  if (loading || !initialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show unauthorized page only after loading is complete and no user is found
  if (!user && !loading && initialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Authentication Required
          </h2>
          <p className="text-gray-600 mb-6">
            Please log in to access this page.
          </p>
          {error && <p className="text-red-600 mb-4 text-sm">{error}</p>}
          <a
            href="/signin"
            className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Go to Sign In
          </a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
