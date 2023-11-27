import * as React from 'react';

import { RootComponent } from './RootComponent';
import { ToastProvider } from '@mccsoft/react-native-qtoast';

export default function App() {
  return (
    <ToastProvider containerStyle={{ paddingTop: 40, gap: 8 }}>
      <RootComponent />
    </ToastProvider>
  );
}
