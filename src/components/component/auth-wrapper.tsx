import React, { useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';

const AuthWrapper = ({children} : {children: any}) => {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchToken = async () => {
      if (isLoaded && isSignedIn) {
        const token = await getToken({ template: 'MocketJWT' });
        console.log("token", token)
        setToken(token);
        setLoading(false);
      }
    };
    fetchToken();
  }, [isLoaded, isSignedIn, getToken]);

  if (loading || !isLoaded || !isSignedIn) {
    return <div>Loading...</div>;
  }

  return children({ token });
};

export default AuthWrapper;
