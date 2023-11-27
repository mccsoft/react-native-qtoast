import React, { useState } from 'react';
import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';
import { useToast } from 'react-native-qtoast';
import { AppButton } from './common/AppButton';
import { BasicToast } from './common/BasicToast';

export const RootComponent = () => {
  const {
    show: showToast,
    hide: hideToasts,
    pause: pauseToasts,
    unpause: unpauseToasts,
  } = useToast();
  const [index, setIndex] = useState<number>(0);

  const screenWidth = Dimensions.get('screen').width;

  const animationValue = new Animated.ValueXY({
    x: screenWidth,
    y: 0,
  });

  const animateShowing = () =>
    new Promise<void>((resolve) => {
      Animated.spring(animationValue, {
        toValue: 0,
        useNativeDriver: true,
      }).start(() => resolve());
    });

  const animateHiding = () =>
    new Promise<void>((resolve) => {
      Animated.spring(animationValue.x, {
        toValue: screenWidth,
        useNativeDriver: true,
      }).start(() => resolve());
    });

  const showToastOnPress = (message: string, timeout?: number) => {
    showToast({
      children: <BasicToast message={message} pos={animationValue} />,
      timeout: timeout,
      onShow: animateShowing,
      onHide: animateHiding,
    });
  };

  return (
    <>
      <View style={OwnStyles.appContainer}>
        <StyledAppButton
          onPress={() => {
            showToastOnPress(`Message toast number ${index}`, 5000);
            setIndex((x) => x + 1);
          }}
          message="Show toast"
        />
        <StyledAppButton
          onPress={() => {
            showToastOnPress(`I'm permanent`);
          }}
          message="Show permanent toast"
        />

        <StyledAppButton
          onPress={() => pauseToasts()}
          message="Pause all toasts"
        />
        <StyledAppButton
          onPress={() => unpauseToasts()}
          message="Unpause all toasts"
        />

        <StyledAppButton onPress={() => hideToasts()} message="Clear queue" />
      </View>
    </>
  );
};

const StyledAppButton = (props: { message: string; onPress: () => void }) => (
  <AppButton onPress={props.onPress} style={OwnStyles.button}>
    <Text>{props.message}</Text>
  </AppButton>
);

const OwnStyles = StyleSheet.create({
  appContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    gap: 16,
    paddingVertical: 40,
    paddingHorizontal: 20,
  },

  button: {
    padding: 16,
  },
});
