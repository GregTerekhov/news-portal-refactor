import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, TypedDispatch } from './store';

export const useAppDispatch = () => useDispatch<TypedDispatch<RootState>>();

// export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
