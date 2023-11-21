import * as React from 'react';

import { ToastProvider } from 'react-native-qtoast';
import { RootComponent } from './RootComponent';

export default function App() {
  return (
    <ToastProvider containerStyle={{ paddingTop: 40 }}>
      <RootComponent />
    </ToastProvider>
  );
}
