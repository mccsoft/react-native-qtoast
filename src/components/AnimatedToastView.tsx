import React from 'react';
import { PropsWithChildren } from 'react';
import { ViewStyle } from 'react-native';
import { Animated } from 'react-native';
import { screenWidth } from '../helpers/toast-helpers';
import { CommonToastProps, ToastOptions } from '../Toast';

export const animateShowing = (animationValue: Animated.Value) =>
  new Promise<void>((resolve) => {
    Animated.spring(animationValue, {
      toValue: 0,
      useNativeDriver: true,
    }).start(() => resolve());
  });

export const animateHiding = (animationValue: Animated.Value) =>
  new Promise<void>((resolve) => {
    Animated.spring(animationValue, {
      toValue: screenWidth,
      useNativeDriver: true,
    }).start(() => resolve());
  });

export const AnimatedToastView = (
  props: PropsWithChildren<{ position: Animated.ValueXY }>
) => {
  const containerStyle: ViewStyle = {
    transform: [
      { translateX: props.position.x },
      { translateY: props.position.y },
    ],
  };

  return <Animated.View style={containerStyle}>{props.children}</Animated.View>;
};

export const createAnimatedToastConfig = (
  data: CommonToastProps
): CommonToastProps => {
  const animationValue = new Animated.ValueXY({
    x: screenWidth,
    y: 0,
  });

  return {
    renderToast: (options: ToastOptions) => (
      <AnimatedToastView position={animationValue}>
        {data.renderToast(options)}
      </AnimatedToastView>
    ),

    onShow: async () => {
      await animateShowing(animationValue.x);
      await data.onShow?.();
    },

    onHide: async () => {
      await animateHiding(animationValue.x);
      await data.onHide?.();
    },

    timeout: data.timeout,
  };
};
