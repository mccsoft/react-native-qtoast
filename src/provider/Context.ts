import { ReactElement, createContext } from 'react';
import type { ToastProps } from '../Toast';

export type ToastContextProps = {
  queue: ToastProps[];
  show: (newToast: ReactElement) => void;
  hide: (toastToHide: ToastProps) => void;
  clearQueue: () => void;
};

const defaultValues: ToastContextProps = {
  queue: [],
  show: () => {},
  hide: () => {},
  clearQueue: () => {},
};
export const ToastContext = createContext<ToastContextProps>(defaultValues);
