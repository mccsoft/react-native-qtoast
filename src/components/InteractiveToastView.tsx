import React, { useMemo } from 'react';
import { PropsWithChildren } from 'react';
import { screenWidth } from '../helpers/toast-helpers';
import { CommonToastProps, ToastOptions } from '../Toast';
import {
  GestureResponderEvent,
  PanResponderGestureState,
  ViewStyle,
  Animated,
  PanResponder,
  I18nManager,
} from 'react-native';

const { isRTL } = I18nManager;

const ANIMATION_DIRECTION_RIGHT = 1;
const ANIMATION_DIRECTION_LEFT = -1;
let animationDirection = isRTL ? ANIMATION_DIRECTION_LEFT : ANIMATION_DIRECTION_RIGHT;

const animateShowing = (animationValue: Animated.Value) =>
  new Promise<void>(resolve => {
    Animated.spring(animationValue, {
      toValue: 0 * animationDirection,
      useNativeDriver: true,
    }).start(() => resolve());
  });

const animateHiding = (animationValue: Animated.Value) =>
  new Promise<void>(resolve => {
    Animated.spring(animationValue, {
      toValue: screenWidth * animationDirection,
      useNativeDriver: true,
    }).start(() => resolve());
  });

export const InteractiveToastView = (
  props: PropsWithChildren<{
    position: Animated.ValueXY;
    options: ToastOptions;
  }>
) => {
  const containerStyle: ViewStyle = {
    transform: [{ translateX: props.position.x }, { translateY: props.position.y }],
  };

  const responderRef = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (event: GestureResponderEvent, gesture: PanResponderGestureState) => {
          Animated.event([null, { dx: props.position.x }], {
            useNativeDriver: false,
          })(event, gesture);
        },
        onPanResponderTerminate: () => false,
        onPanResponderTerminationRequest: () => false,
        onPanResponderRelease: async (_, gesture: PanResponderGestureState) => {
          if (Math.abs(gesture.dx) >= 0.3 * screenWidth) {
            animationDirection = ANIMATION_DIRECTION_LEFT;
            if (Math.sign(gesture.dx) !== -1) {
              animationDirection = ANIMATION_DIRECTION_RIGHT;
            }
            await props.options.hide();
          } else {
            Animated.spring(props.position.x, {
              toValue: 0,
              bounciness: 20,
              useNativeDriver: true,
            }).start();
          }
        },
      }),
    [props.options, props.position.x]
  );

  return (
    <Animated.View style={containerStyle} {...responderRef.panHandlers}>
      {props.children}
    </Animated.View>
  );
};

export const createAnimatedToastConfig = (data: CommonToastProps): CommonToastProps => {
  const animationValue = new Animated.ValueXY({
    x: isRTL ? -screenWidth : screenWidth,
    y: 0,
  });

  return {
    ...data,

    renderToast: (options: ToastOptions) => (
      <InteractiveToastView position={animationValue} options={options}>
        {data.renderToast(options)}
      </InteractiveToastView>
    ),

    onShow: async () => {
      await animateShowing(animationValue.x);
      await data.onShow?.();
    },

    onHide: async () => {
      await animateHiding(animationValue.x);
      await data.onHide?.();
    },
  };
};
