import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { createContext, useEffect, useReducer } from 'react';

type AuthState = {
  isAuthenticated: boolean;
};

type AuthAction = { type: 'LOGIN' } | { type: 'LOGOUT' };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return { isAuthenticated: true };
    case 'LOGOUT':
      return { isAuthenticated: false };
    default:
      return state;
  }
};

const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}>({
  state: { isAuthenticated: false },
  dispatch: () => {},
});

const AuthProvider = ({ children }: { children: any }) => {
  const navigate = useNavigation();

  const [state, dispatch] = useReducer(authReducer, {
    isAuthenticated: true,
  });

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        console.log('[AuthContext] Token found');
        dispatch({ type: 'LOGIN' });
        navigate.navigate('Home' as never);
      } else {
        navigate.navigate('Login' as never);
      }
    };
    checkToken();
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
