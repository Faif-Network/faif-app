import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';

type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
};

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

export const useAuth = () => React.useContext(AuthContext);

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = await AsyncStorage.getItem('token');
      setIsAuthenticated(token != null);
    };

    checkAuthentication();
  }, []);

  const handleSetIsAuthenticated = async (isAuthenticated: boolean) => {
    setIsAuthenticated(isAuthenticated);
    if (!isAuthenticated) {
      await AsyncStorage.removeItem('token');
    }
  };

  const value = {
    isAuthenticated,
    setIsAuthenticated: handleSetIsAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
