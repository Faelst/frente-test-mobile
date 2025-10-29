import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';

type Props = {
    title: string;
    onPress: () => void;
    style?: ViewStyle;
    disabled?: boolean;
};

export default function PrimaryButton({ title, onPress, style, disabled }: Props) {
    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            style={({ pressed }) => [styles.button, style, pressed && { opacity: 0.9 }, disabled && { opacity: 0.6 }]}
        >
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#3b82f6',
        borderRadius: 12,
        paddingVertical: 12,
        alignItems: 'center',
    },
    text: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
