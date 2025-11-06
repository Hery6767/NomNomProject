// navigations/index.tsx
import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainStack from './stack';
import {
  KeyboardAvoidingView, Platform,
} from 'react-native';

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <MainStack />
      </KeyboardAvoidingView>
    </NavigationContainer >
  );
}
