import React, { PropsWithChildren } from 'react';
import { Pressable, PressableProps, StyleProp, StyleSheet, ViewStyle } from 'react-native';

export type ButtonProps = PropsWithChildren<PressableProps> & {
  style?: StyleProp<ViewStyle>;
};

export const AppButton = (props: ButtonProps) => {
  return (
    <Pressable
      style={state => [OwnStyles.pressable, props.style, { opacity: state.pressed ? 0.5 : 1 }]}
      onPress={props.onPress}
    >
      {props.children}
    </Pressable>
  );
};

const OwnStyles = StyleSheet.create({
  pressable: {
    backgroundColor: 'pink',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
