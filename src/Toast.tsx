import React, { useEffect, type FC, useRef, useCallback } from 'react';
import { View } from 'react-native';
import { useToast } from './provider/useToast';

export type ToastOptions = {
  id: string;
  hide: () => Promise<void>;
};

export type CommonToastProps = {
  timeout?: number;
  onHide?: () => Promise<void>;
  onShow?: () => Promise<void>;
  renderToast: (options: ToastOptions) => React.ReactElement;
  prefixId?: string;
};

export type ToastProps = CommonToastProps & {
  id: string;
  paused?: boolean;
};

export type CreateToastProps = CommonToastProps & {
  animated?: boolean;
};

export const Toast: FC<ToastProps> = props => {
  const { hide } = useToast();
  const timeoutEnd = useRef<number | null>(null);
  const remainingTimeout = useRef<typeof props.timeout>(props.timeout);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onHide = useCallback(async () => {
    await props.onHide?.();
    hide(props.id);
  }, [hide, props]);

  useEffect(() => {
    if (props.paused) {
      if (timer.current && timeoutEnd.current) {
        clearTimeout(timer.current);
        remainingTimeout.current = timeoutEnd.current - new Date().getTime();

        timer.current = null;
      }

      return;
    }

    if (props.timeout == null) return;

    timer.current =
      timer.current ?? setTimeout(async () => await onHide(), remainingTimeout.current);

    timeoutEnd.current = timeoutEnd.current ?? new Date().getTime() + props.timeout;
  }, [hide, onHide, props, props.paused]);

  return (
    <View onLayout={() => props.onShow?.()}>
      {props.renderToast({ id: props.id, hide: onHide })}
    </View>
  );
};
