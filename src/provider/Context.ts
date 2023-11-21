import { createContext } from 'react';
import type { CreateToastProps, ToastProps } from '../Toast';

export type ToastContextProps = {
  queue: ToastProps[];
  show: (newToast: CreateToastProps) => void;
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
