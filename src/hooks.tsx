import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootStateType, AppDispatchType } from './store/configureStore';

export const useCustomAppDispatch = () => useDispatch<AppDispatchType>();
export const useCustomAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;
