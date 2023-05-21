import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsLoggedIn,
  setAuthStatusFalse,
  setAuthStatusTrue,
} from '../redux/slices/authSlice';
import MainTabs from './MainNavigation';
import AuthStack from './AuthNavigation';

function AppNavigation() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getToken() {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        dispatch(
          setAuthStatusTrue({
            token,
          }),
        );
      } else {
        dispatch(setAuthStatusFalse());
      }
    }
    getToken();
  }, [dispatch]);

  return (
    <NavigationContainer>
      {isLoggedIn ? <MainTabs /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default AppNavigation;
