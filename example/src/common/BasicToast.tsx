import React from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { AppButton } from './AppButton';
import { ToastOptions } from '../../../src/Toast';

export const BasicToast = (props: {
  pos: Animated.ValueXY;
  message: string;
  options: ToastOptions;
}) => {
  return (
    <Animated.View
      style={[
        OwnStyles.toast,
        {
          transform: [{ translateX: props.pos.x }, { translateY: props.pos.y }],
        },
      ]}
    >
      <Text style={OwnStyles.message}>{props.message}</Text>
      <AppButton onPress={async () => await props.options.hide()}>
        <Text>Close</Text>
      </AppButton>
    </Animated.View>
  );
};

const OwnStyles = StyleSheet.create({
  toast: {
    minHeight: 60,
    borderRadius: 10,
    marginHorizontal: 16,
    borderWidth: 2,
    justifyContent: 'space-between',
    padding: 16,
    flexDirection: 'row',
  },

  message: {
    fontWeight: '400',
  },
});
