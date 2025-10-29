import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';

export default function LoadingBlock() {
    return (
        <View style={styles.wrapper}>
            <ActivityIndicator size="large" />
            <Text style={styles.text}>Buscando...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: { alignItems: 'center', gap: 8 },
    text: { color: '#cbd5e1' },
});
