import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppButton } from './AppButton';
import { ToastOptions } from '../../../src/Toast';

export const BasicToast = (props: { message: string; options: ToastOptions }) => {
  return (
    <View style={OwnStyles.toast}>
      <Text style={OwnStyles.message}>{props.message}</Text>
      <AppButton onPress={async () => await props.options.hide()}>
        <Text>Close</Text>
      </AppButton>
    </View>
  );
};

const OwnStyles = StyleSheet.create({
  toast: {
    minHeight: 60,
    borderRadius: 10,
    marginHorizontal: 16,
    borderWidth: 2,
    justifyContent: 'space-between',
    padding: 16,
    flexDirection: 'row',
  },

  message: {
    fontWeight: '400',
  },
});
