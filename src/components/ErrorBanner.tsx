import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = { message: string };

export default function ErrorBanner({ message }: Props) {
    if (!message) return null;
    return (
        <View style={styles.wrapper}>
            <Text style={styles.text}>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#3f1d1d',
        borderColor: '#7f2727',
        borderWidth: 1,
        borderRadius: 12,
        padding: 12,
    },
    text: { color: '#fecaca' },
});
