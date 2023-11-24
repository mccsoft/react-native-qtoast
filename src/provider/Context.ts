import { createContext } from 'react';
import type { CreateToastProps, ToastProps } from '../Toast';

export type ToastContextProps = {
  queue: ToastProps[];
  show: (newToast: CreateToastProps) => string;
  hide: (id?: string) => void;
  pause: (id?: string) => void;
  unpause: (id?: string) => void;
};

const defaultValues: ToastContextProps = {
  queue: [],
  show: () => '',
  hide: () => {},
  pause: () => {},
  unpause: () => {},
};
export const ToastContext = createContext<ToastContextProps>(defaultValues);
