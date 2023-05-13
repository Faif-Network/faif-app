import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import fetcher from '../fetcher';

export interface IUpdateProfileRequest {
  email: string;
  password: string;
}
