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

  const hide = useCallback(
    async (id?: string) => {
      if (id === undefined) {
        await Promise.all(
          shownToasts.map(async (toast) => await toast.onHide?.())
        );
      } else {
        await shownToasts.find((x) => x.id === id)?.onHide?.();
      }

      setQueue((current) =>
        id === undefined ? [] : current.filter((toast) => toast.id !== id)
      );
    },
    [shownToasts]
  );

  const show = useCallback((newToast: CreateToastProps): string => {
    const _id = generateUniqueId();
    setQueue((current) => [...current, { ...newToast, id: _id }]);

    return _id;
  }, []);

  const togglePause = useCallback(
    (id: string | undefined, pause: boolean) => {
      const pausedToasts = shownToasts.map((toast) =>
        toast.id !== id && id !== undefined
          ? toast
          : { ...toast, paused: pause }
      );

      setShownToasts(pausedToasts);
    },
    [shownToasts]
  );

  const pause = useCallback(
    (id?: string) => togglePause(id, true),
    [togglePause]
  );

  const unpause = useCallback(
    (id?: string) => togglePause(id, false),
    [togglePause]
  );

  const getSliceFromQuery = useCallback(() => {
    let q = queue.slice(
      0,
      props.amountOfShownToasts ?? DEFAULT_AMOUNT_OF_TOASTS
    );

    shownToasts.forEach((toast) => {
      q = q.map((x) => (x.id === toast.id ? toast : x));
    });

    return props.inverted ? q : q.reverse();
  }, [props.amountOfShownToasts, props.inverted, queue, shownToasts]);

  useEffect(() => {
    setShownToasts(getSliceFromQuery());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queue]);

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
        pause,
        unpause,
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
