import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import { selectESimBySlug } from './slices/eSimSlice';
import { ESim } from './slices/eSimSlice';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Custom hook to get eSIM by slug
export const useESimBySlug = (slug: string): ESim | undefined => {
  return useAppSelector((state) => selectESimBySlug(state, slug));
};