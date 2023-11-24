import React from 'react';
import { ReactElement } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

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
      <View style={OwnStyles.messageContainer}>
        <Text style={OwnStyles.message}>{props.message}</Text>
      </View>
    </Animated.View>
  );
};

const OwnStyles = StyleSheet.create({
  toast: {
    minHeight: 60,
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 4,
    marginHorizontal: 16,
  },

  messageContainer: {
    paddingTop: 16,
  },

  message: {
    fontWeight: '400',
    lineHeight: 17,
  },
});
