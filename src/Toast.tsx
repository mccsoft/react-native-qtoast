import React, { type FC, type PropsWithChildren } from 'react';
import { Animated, type ViewStyle } from 'react-native';

export type ToastProps = {
  id: string;
};

export type AnimatedToastProps = ToastProps & {
  animatedPositionValue: Animated.ValueXY;
};

export const Toast: FC<PropsWithChildren<AnimatedToastProps>> = (props) => {
  const positionTransformStyle: ViewStyle = {
    transform: [
      {
        translateY: props.animatedPositionValue.y,
      },
    ],
  };

  return (
    <Animated.View style={[style, positionTransformStyle]}>
      {props.children}
    </Animated.View>
  );
};

const style: ViewStyle = {
  position: 'absolute',
  alignSelf: 'center',
};
