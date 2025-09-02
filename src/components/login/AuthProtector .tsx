import { useEffect } from 'react';
import { supabase } from '../../core/supabaseClient';

interface AuthProtectorProps {
  allowedRoles?: string[];
  redirectPath?: string;
}

const AuthProtector: React.FC<AuthProtectorProps> = ({ 
  allowedRoles = [], 
  redirectPath = '/unauthorized' 
}) => {
  useEffect(() => {
    const checkAccess = async () => {
      try {
        // Get the current session from Supabase
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError || !session) {
          // Save the current route before redirecting
          sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
          window.location.href = '/';
          return;
        }

        const token = session.access_token;

        // Fetch profile from the API endpoint
        const res = await fetch("/api/auth/sign-in", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        const data = await res.json();
        
        if (!res.ok) {
          // If API call fails, check if it's an auth issue
          if (res.status === 401 || res.status === 403) {
            // Clear the invalid session
            await supabase.auth.signOut();
            sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
            window.location.href = '/';
          } else {
            // Other errors, redirect to unauthorized
            const lastAuthorized = sessionStorage.getItem('lastAuthorizedRoute') || '/';
            sessionStorage.setItem('unauthorizedRedirect', lastAuthorized);
            window.location.href = redirectPath;
          }
          return;
        }

        const profile = data.profile;
        
        if (!profile || (allowedRoles.length > 0 && !allowedRoles.includes(profile.role))) {
          // Save the last authorized route
          const lastAuthorized = sessionStorage.getItem('lastAuthorizedRoute') || '/';
          sessionStorage.setItem('unauthorizedRedirect', lastAuthorized);
          window.location.href = redirectPath;
        } else {
          // Save the current route as authorized
          sessionStorage.setItem('lastAuthorizedRoute', window.location.pathname);
        }
      } catch (err) {
        // If authentication fails, redirect to login
        sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
        window.location.href = '/';
      }
    };

    checkAccess();
  }, [allowedRoles, redirectPath]);

  return null;
};

export default AuthProtector;