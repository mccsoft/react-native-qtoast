import { useContext } from 'react';
import { ToastContext, ToastContextProps } from './Context';

export const useToast = (): ToastContextProps => useContext(ToastContext);
