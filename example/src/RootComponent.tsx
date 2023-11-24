import React, { ReactElement, useState } from 'react';
import {
  Animated,
  Button,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useToast } from 'react-native-qtoast';

export const RootComponent = () => {
  const {
    show: showToast,
    hide: hideToasts,
    pause: pauseToasts,
    unpause: unpauseToast,
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

  return (
    <>
      <View style={OwnStyles.appContainer}>
        <Button
          title="Show toast"
          onPress={() => {
            showToast({
              children: (
                <BasicToast
                  message={`message number ${index}`}
                  pos={animationValue}
                />
              ),
              timeout: 1000,
              onShow: animateShowing,
              onHide: animateHiding,
            });
            setIndex((x) => x + 1);
          }}
        />
        <Button
          title="Show toast w/out timeout"
          onPress={() => {
            showToast({
              children: (
                <BasicToast
                  message="I am not gonna leave by myself"
                  pos={animationValue}
                />
              ),
              onShow: animateShowing,
              onHide: animateHiding,
            });
            setIndex((x) => x + 1);
          }}
        />
        <Button title="Pause all" onPress={() => pauseToasts()} />
        <Button title="Unpause all" onPress={() => unpauseToast()} />
        <Button title="Clear query" onPress={() => hideToasts()} />
      </View>
    </>
  );
};

const BasicToast = (props: {
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
  appContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 16,
  },

  messageContainer: {
    paddingTop: 16,
  },

  message: {
    fontWeight: '400',
    lineHeight: 17,
  },

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
});
