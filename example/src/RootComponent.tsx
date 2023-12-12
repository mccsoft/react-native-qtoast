import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppButton } from './common/AppButton';
import { showToast as showToastFromHelper } from './showToastHelper';
import { BasicToast } from './common/BasicToast';
import { ToastOptions } from '../../src/Toast';
import { useToast } from '../../src/provider/useToast';

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

  const buttons: { message: string; onPress: () => void }[] = useMemo(
    () => [
      {
        onPress: () => {
          showToastOnPress(`Message toast number ${index}`, 5000);
          setIndex((x) => x + 1);
        },
        message: 'Show toast',
      },
      {
        onPress: () => {
          showToastOnPress(`I'm permanent`);
        },
        message: 'Show permanent toast',
      },
      {
        onPress: () => pauseToasts(),
        message: 'Pause all toasts',
      },
      {
        onPress: () => unpauseToasts(),
        message: 'Unpause all toasts',
      },
      {
        onPress: () => hideToasts(),
        message: 'Clear queue',
      },
    ],
    [hideToasts, index, pauseToasts, unpauseToasts]
  );

  return (
    <>
      <View style={OwnStyles.appContainer}>
        {buttons.map((button) => (
          <StyledAppButton {...button} key={button.message} />
        ))}
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
