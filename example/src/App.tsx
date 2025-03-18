import { RootComponent } from './RootComponent';
import { ToastProvider } from '../../src/provider/Provider';
import React from 'react';

export default function App() {
  return (
    <ToastProvider containerStyle={{ paddingTop: 40, gap: 8 }} position="top">
      <RootComponent />
    </ToastProvider>
  );
}
