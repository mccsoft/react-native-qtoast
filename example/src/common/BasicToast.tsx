import React from 'react';
import { ReactElement } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';

export const BasicToast = (props: {
  message: string;
  pos: Animated.ValueXY;
}): ReactElement => {
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
    </Animated.View>
  );
};

const OwnStyles = StyleSheet.create({
  toast: {
    minHeight: 60,
    borderRadius: 10,
    marginHorizontal: 16,
    borderWidth: 2,
    justifyContent: 'center',
    padding: 16,
  },

  message: {
    fontWeight: '400',
  },
});
