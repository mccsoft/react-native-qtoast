import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { ToastContext, ToastContextProps } from './Context';
import { CreateToastProps, Toast, ToastProps } from '../Toast';
import { generateUniqueId } from '../helpers/toast-helpers';
import { StyleSheet, View } from 'react-native';
import { createAnimatedToastConfig } from '../components/InteractiveToastView';
import { StyleProp } from 'react-native';
import { ViewStyle } from 'react-native';

export type ToastProviderProps = PropsWithChildren<{
  containerStyle?: StyleProp<ViewStyle>;
  amountOfShownToasts?: number;
}>;

const DEFAULT_AMOUNT_OF_TOASTS = 3;

export let ToastAccessor: ToastContextProps;

export const ToastProvider = (props: ToastProviderProps) => {
  const [queue, setQueue] = useState<ToastProps[]>([]);
  const [shownToasts, setShownToasts] = useState<ToastProps[]>([]);
  const providerRef = useRef<ToastContextProps>();
  const shownToastsRef = useRef(shownToasts);

  useLayoutEffect(() => {
    shownToastsRef.current = shownToasts;
  });

  const hide = useCallback(async (id?: string) => {
    const toasts = shownToastsRef.current;
    if (id === undefined) {
      await Promise.all(toasts.map(async (toast) => await toast.onHide?.()));
    } else {
      await toasts.find((x) => x.id === id)?.onHide?.();
    }

    setQueue((current) =>
      id === undefined ? [] : current.filter((toast) => toast.id !== id)
    );
  }, []);

  const show = useCallback((newToast: CreateToastProps): string => {
    const animatedToast = newToast.animated
      ? createAnimatedToastConfig(newToast)
      : newToast;

    const _id = generateUniqueId();
    setQueue((current) => [...current, { ...animatedToast, id: _id }]);

    return _id;
  }, []);

  const togglePause = useCallback((id: string | undefined, pause: boolean) => {
    const pausedToasts = shownToastsRef.current.map((toast) =>
      toast.id !== id && id !== undefined ? toast : { ...toast, paused: pause }
    );

    setShownToasts(pausedToasts);
  }, []);

  const pause = useCallback(
    (id?: string) => togglePause(id, true),
    [togglePause]
  );

  const unpause = useCallback(
    (id?: string) => togglePause(id, false),
    [togglePause]
  );

  const getSliceFromQueue = useCallback(() => {
    let q = queue.slice(
      0,
      props.amountOfShownToasts ?? DEFAULT_AMOUNT_OF_TOASTS
    );

    shownToastsRef.current.forEach((toast) => {
      q = q.map((x) => (x.id === toast.id ? toast : x));
    });

    return q.reverse();
  }, [props.amountOfShownToasts, queue]);

  useEffect(() => {
    setShownToasts(getSliceFromQueue());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queue]);

  useEffect(() => {
    providerRef.current = {
      queue,
      show,
      hide,
      pause,
      unpause,
    };

    ToastAccessor = providerRef.current;
  }, [hide, pause, queue, show, unpause]);

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
      <View style={[style.toastContainer, props.containerStyle]}>
        {shownToasts.map((toast) => (
          <Toast key={toast.id} {...toast} />
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
