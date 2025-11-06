// src/logIn.tsx
import React, { useState } from 'react';
import {
    View, Text, TextInput, Pressable, ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

export default function LogIn() {
    const navigation = useNavigation<any>();
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');

    return (
        <ImageBackground
            source={require('../image/onBoard_5.jpg')}
            style={{ flex: 1 }}
            resizeMode="cover"
        >
            <LinearGradient
                colors={['rgba(0,0,0,0.15)', 'rgba(0,0,0,0.15)', 'rgba(3,75,25,0.57)']}
                style={{ flex: 1 }}
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        margin: 20,
                        backgroundColor: '#fff',
                        borderRadius: 30,
                        padding: 24,
                    }}
                >
                    <Text style={{ fontSize: 24, fontWeight: '700', color: '#0a3b2f' }}>
                        Welcome Back!
                    </Text>
                    <Text style={{ color: '#666', marginBottom: 20 }}>
                        Your meal plan is ready when you are
                    </Text>

                    <Text style={{ fontWeight: '700', color: '#0a3b2f' }}>Email</Text>
                    <TextInput
                        placeholder="you@example.com"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        style={{
                            borderWidth: 1, borderColor: '#ccc', borderRadius: 10,
                            padding: 10, marginBottom: 14,
                        }}
                    />

                    <Text style={{ fontWeight: '700', color: '#0a3b2f' }}>Password</Text>
                    <TextInput
                        placeholder="••••••••"
                        secureTextEntry
                        value={pwd}
                        onChangeText={setPwd}
                        style={{
                            borderWidth: 1, borderColor: '#ccc', borderRadius: 10,
                            padding: 10, marginBottom: 10,
                        }}
                    />

                    <Pressable onPress={() => console.log('Forgot password')}>
                        <Text style={{ textAlign: 'right', color: '#0a3b2f', marginBottom: 20 }}>
                            Forgot password?
                        </Text>
                    </Pressable>

                    <Pressable
                        onPress={() => navigation.navigate('Tabs')} // hoặc 'Home' tùy route bạn đặt
                        style={{
                            backgroundColor: '#0a3b2f',
                            paddingVertical: 14,
                            borderRadius: 14,
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ color: '#fff', fontWeight: '700' }}>Login</Text>
                    </Pressable>

                    {/* Divider "or" */}
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginVertical: 20,
                        }}
                    >
                        <View style={{ flex: 1, height: 1, backgroundColor: '#ccc' }} />
                        <Text style={{ marginHorizontal: 10, color: '#666' }}>or</Text>
                        <View style={{ flex: 1, height: 1, backgroundColor: '#ccc' }} />
                    </View>

                    <Pressable onPress={() => console.log('Guest')}>
                        <Text style={{ textAlign: 'center', color: '#0a3b2f' }}>
                            Continue as Guest
                        </Text>
                    </Pressable>

                    <Text style={{ textAlign: 'center', marginTop: 16, color: '#555' }}>
                        New here?{' '}
                        <Text style={{ color: '#0a3b2f', fontWeight: '700' }}>Create Account</Text>
                    </Text>
                </View>
            </LinearGradient>
        </ImageBackground>
    );
}
