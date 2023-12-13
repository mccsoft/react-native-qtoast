import * as React from 'react';

import { RootComponent } from './RootComponent';
import { ToastProvider } from '../../src/provider/Provider';

export default function App() {
  return (
    <ToastProvider containerStyle={{ paddingTop: 40, gap: 8 }} position="top">
      <RootComponent />
    </ToastProvider>
  );
}
