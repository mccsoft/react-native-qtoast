import React, { ReactElement, useState } from 'react';
import {
  Animated,
  Button,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useToast } from '../../src/provider/useToast';

export const RootComponent = () => {
  const { show: showToast, clearQueue: clearToastQueue } = useToast();
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
          title="press me"
          onPress={() => {
            showToast({
              children: <BasicToast index={index} pos={animationValue} />,
              timeout: 3000,
              onShow: animateShowing,
              onHide: animateHiding,
            });
            setIndex((x) => x + 1);
          }}
        />
        <Button title="clear query" onPress={clearToastQueue} />
      </View>
    </>
  );
};

const BasicToast = (props: {
  index: number;
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
        <Text style={OwnStyles.message}>message amogus {props.index}</Text>
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
