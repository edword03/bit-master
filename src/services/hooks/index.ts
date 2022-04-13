import {
  useSelector as selectorHook,
  useDispatch as dispatchHook,
  TypedUseSelectorHook,
} from 'react-redux';
import { AppDispatch, AppThunk, RootState } from '../types';

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();