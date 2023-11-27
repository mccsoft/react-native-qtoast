import React, {
  useEffect,
  type FC,
  type PropsWithChildren,
  useRef,
} from 'react';
import { View } from 'react-native';
import { useToast } from './provider/useToast';

export type CommonToastProps = PropsWithChildren<{
  timeout?: number;
  onHide?: () => Promise<void>;
  onShow?: () => Promise<void>;
}>;

export type ToastProps = CommonToastProps & {
  id: string;
  paused?: boolean;
};

export type CreateToastProps = CommonToastProps;

export const Toast: FC<ToastProps> = (props) => {
  const { hide } = useToast();
  const timeoutEnd = useRef<number | null>(null);
  const remainingTimeout = useRef<typeof props.timeout>(props.timeout);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

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
      timer.current ??
      setTimeout(async () => {
        await props.onHide?.();
        hide(props.id);
      }, remainingTimeout.current);

    timeoutEnd.current =
      timeoutEnd.current ?? new Date().getTime() + props.timeout;
  }, [hide, props, props.paused]);

  return <View onLayout={() => props.onShow?.()}>{props.children}</View>;
};
