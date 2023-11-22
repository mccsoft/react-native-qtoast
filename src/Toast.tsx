import React, {
  useEffect,
  type FC,
  type PropsWithChildren,
  useRef,
} from 'react';
import { View } from 'react-native';
import { useToast } from './provider/useToast';

type CommonProps = {
  timeout?: number;
  onHide?: () => Promise<void>;
  onShow?: () => Promise<void>;
};

export type ToastProps = CommonProps & {
  id: string;
  paused?: boolean;
};

export type CreateToastProps = PropsWithChildren<CommonProps>;

export const Toast: FC<PropsWithChildren<ToastProps>> = (props) => {
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

    return () => {
      clearTimeout(timer.current ?? undefined);
      timer.current = null;
    };
  }, [hide, props, props.paused]);

  return <View onLayout={() => props.onShow?.()}>{props.children}</View>;
};
