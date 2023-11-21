import React, { type FC, type PropsWithChildren } from 'react';
import { View } from 'react-native';
import { useToast } from './provider/useToast';

type CommonProps = {
  timeout: number;
  onHide?: () => void;
};

export type ToastProps = CommonProps & {
  id: string;
};

export type CreateToastProps = PropsWithChildren<CommonProps>;

export const Toast: FC<PropsWithChildren<ToastProps>> = (props) => {
  const { hide } = useToast();

  setTimeout(() => {
    props.onHide?.();
    hide(props);
  }, props.timeout);

  return <View>{props.children}</View>;
};
