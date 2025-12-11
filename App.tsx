// App.tsx
import React from 'react';
import AppNavigator from './core/navigations/index';
import { KeyboardAvoidingView, Platform } from 'react-native';

export default function App() {
  return <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
    <AppNavigator />;
  </KeyboardAvoidingView>
}
