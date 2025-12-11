// navigations/Stack.tsx
import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

// Import các màn hình
import OnBoard from '../src/onBoard';
import LogIn from '../src/logIn';
import Home from '../src/home';
import Tabs from './tab';


// ✅ Khai báo kiểu cho Navigator
export type RootStackParamList = {
    OnBoard: undefined;
    LogIn: undefined;
    Home: undefined;
};
const Stack = createStackNavigator<RootStackParamList>();

export default function MainStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                transitionSpec: {
                    open: { animation: 'timing', config: { duration: 600 } },
                    close: { animation: 'timing', config: { duration: 300 } },
                },
                cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
            }}
        >
            <Stack.Screen name="OnBoard" component={OnBoard} />
            <Stack.Screen name="LogIn" component={LogIn} />
            <Stack.Screen name="Home" component={Tabs} />
        </Stack.Navigator >
    );
}
