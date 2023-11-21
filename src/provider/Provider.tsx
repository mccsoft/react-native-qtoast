import React, {
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { ToastContext } from './Context';
import { CreateToastProps, Toast, ToastProps } from '../Toast';
import { generateUniqueId } from '../helpers/toast-helpers';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

export type ToastProviderProps = {
  amountOfShownToasts?: number;
  containerStyle?: StyleProp<ViewStyle>;
  inverted?: boolean;
};

const DEFAULT_AMOUNT_OF_TOASTS = 3;

export const ToastProvider: FC<PropsWithChildren<ToastProviderProps>> = (
  props
) => {
  const [queue, setQueue] = useState<ToastProps[]>([]);
  const [shownToasts, setShownToasts] = useState<ToastProps[]>([]);

  const hide = useCallback((toastToHide?: ToastProps) => {
    if (toastToHide === undefined) return;

    setQueue((current) =>
      current.filter((toast) => toast.id !== toastToHide.id)
    );
  }, []);

  const show = useCallback(
    (newToast: CreateToastProps) => {
      setQueue((current) => {
        if (
          current.length >
          (props.amountOfShownToasts ?? DEFAULT_AMOUNT_OF_TOASTS) - 1
        )
          hide(current.at(0));

        return [...current, { ...newToast, id: generateUniqueId() }];
      });
    },
    [hide, props.amountOfShownToasts]
  );

  const clearQueue = () => setQueue([]);

  useEffect(() => {
    let q = queue.slice(0, props.amountOfShownToasts);
    if (!props.inverted) q = q.reverse();

    setShownToasts(q);
  }, [props.amountOfShownToasts, props.inverted, queue]);

  const toastContainerStyle: StyleProp<ViewStyle> = [
    style.toastContainer,
    props.containerStyle,
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
    position: 'absolute',
    width: '100%',
  },
});
