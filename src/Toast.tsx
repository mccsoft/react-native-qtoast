import React, { type FC, type PropsWithChildren } from 'react';
import { View } from 'react-native';

export type ToastProps = {
  id: string;
};

export const Toast: FC<PropsWithChildren<ToastProps>> = (props) => {
  return <View>{props.children}</View>;
};
