import React, { ReactElement, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useToast } from '../../src/provider/useToast';

export const RootComponent = () => {
  const { show: showToast, clearQueue: clearToastQueue } = useToast();
  const [index, setIndex] = useState<number>(0);

  return (
    <>
      <View style={style.container}>
        <Button
          title="press me"
          onPress={() => {
            showToast({
              children: <BasicToast index={index} />,
              timeout: 1000,
            });
            setIndex((x) => x + 1);
          }}
        />
        <Button title="clear query" onPress={clearToastQueue} />
      </View>
    </>
  );
};

const BasicToast = (props: { index: number }): ReactElement => {
  return (
    <View>
      <Text>Le toast {props.index}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: 16,
  },
});
