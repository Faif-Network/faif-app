import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';

interface AuthContextProps {
  auth: boolean;
  setAuth: (token: string) => Promise<void>;
}

// Create a context
const AuthContext = createContext<AuthContextProps>({
  auth: false,
  setAuth: () => Promise.resolve(),
});

const AuthProvider = ({ children }: { children: any }) => {
  const [auth, setAuthState] = useState(false);

  // Get current auth state from AsyncStorage
  const getAuthState = async () => {
    try {
      console.log('[AuthProvider] getAuthState');
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setAuthState(true);
      }
      console.log('[AuthProvider] getAuthState', token);
    } catch (err) {
      console.log(err);
      setAuthState(false);
    }
  };

  // Update AsyncStorage & context state
  const setAuth = async (token: string) => {
    try {
      await AsyncStorage.setItem('token', token);
      if (token) {
        setAuthState(true);
      } else {
        setAuthState(false);
      }
    } catch (error) {
      Promise.reject(error);
      await AsyncStorage.removeItem('token');
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
