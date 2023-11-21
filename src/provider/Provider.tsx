import React, {
  FC,
  PropsWithChildren,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { ToastContext } from './Context';
import { AnimatedToastProps, Toast, ToastProps } from '../Toast';
import { Animated } from 'react-native';
import { generateUniqueId } from '../helpers/toast-helpers';

export type ToastProviderProps = {
  amountOfShownToasts: number;
};

export const ToastProvider: FC<PropsWithChildren<ToastProviderProps>> = (
  props
) => {
  const [queue, setQueue] = useState<ToastProps[]>([]);
  const [shownToasts, setShownToasts] = useState<AnimatedToastProps[]>([]);

  const selectShownToasts = useCallback((): AnimatedToastProps[] => {
    const q = queue.slice(0, props.amountOfShownToasts).reverse();

    return q.map(
      (t, index): AnimatedToastProps => ({
        ...t,
        animatedPositionValue: new Animated.ValueXY({
          x: 20,
          y: 40 * (index + 1),
        }),
      })
    );
  }, [props.amountOfShownToasts, queue]);

  const hide = useCallback((toastToHide?: ToastProps) => {
    if (toastToHide === undefined) return;

    setQueue((current) =>
      current.filter((toast) => toast.id !== toastToHide.id)
    );
  }, []);

  const show = useCallback(
    (newToast: ReactElement) => {
      setQueue((current) => {
        if (current.length > props.amountOfShownToasts - 1) hide(current.at(0));

        return [...current, { children: newToast, id: generateUniqueId() }];
      });
    },
    [hide, props.amountOfShownToasts]
  );
  const clearQueue = () => setQueue([]);

  useEffect(() => setShownToasts(selectShownToasts()), [selectShownToasts]);

  return (
    <ToastContext.Provider
      value={{
        queue,
        show,
        hide,
        clearQueue,
      }}
    >
      {shownToasts.map((t) => (
        <Toast key={t.id} {...t} />
      ))}
      {props.children}
    </ToastContext.Provider>
  );
};
