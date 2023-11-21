import React, {
  FC,
  PropsWithChildren,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { ToastContext } from './Context';
import { Toast, ToastProps } from '../Toast';
import { generateUniqueId } from '../helpers/toast-helpers';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

export type ToastProviderProps = {
  amountOfShownToasts: number;
  position?: 'top' | 'bottom';
  initialIndentation?: number;
  gap?: number;
};

export const ToastProvider: FC<PropsWithChildren<ToastProviderProps>> = (
  props
) => {
  const [queue, setQueue] = useState<ToastProps[]>([]);
  const [shownToasts, setShownToasts] = useState<ToastProps[]>([]);

  const selectShownToasts = useCallback(
    () => queue.slice(0, props.amountOfShownToasts).reverse(),
    [props.amountOfShownToasts, queue]
  );

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

  const toastContainerStyle: StyleProp<ViewStyle> = [
    style.toastContainer,
    {
      paddingTop: props.initialIndentation ?? 16,
      gap: props.gap ?? 4,
    },
  ];

  return (
    <ToastContext.Provider
      value={{
        queue,
        show,
        hide,
        clearQueue,
      }}
    >
      <View style={toastContainerStyle}>
        {shownToasts.map((t) => (
          <Toast key={t.id} {...t} />
        ))}
      </View>
      {props.children}
    </ToastContext.Provider>
  );
};

const style = StyleSheet.create({
  toastContainer: {
    flexGrow: 1,
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    borderWidth: 2,
  },
});
