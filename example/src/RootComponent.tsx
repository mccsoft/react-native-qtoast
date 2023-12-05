import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useToast } from '@mccsoft/react-native-qtoast';
import { AppButton } from './common/AppButton';
import { showToast as showToastFromHelper } from './showToastHelper';
import { BasicToast } from './common/BasicToast';
import { ToastOptions } from '../../src/Toast';

export const RootComponent = () => {
  const {
    hide: hideToasts,
    pause: pauseToasts,
    unpause: unpauseToasts,
  } = useToast();
  const [index, setIndex] = useState<number>(0);

  const showToastOnPress = (message: string, timeout?: number) => {
    showToastFromHelper({
      renderToast: (options: ToastOptions) => (
        <BasicToast message={message} options={options} />
      ),
      timeout: timeout,
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
