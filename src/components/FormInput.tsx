import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { FieldError } from 'react-hook-form';

type Props = TextInputProps & {
    label?: string;
    error?: FieldError;
};

export default function FormInput({ label, error, ...rest }: Props) {
    return (
        <View style={styles.wrapper}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                {...rest}
                placeholderTextColor="#999"
                style={[
                    styles.input,
                    error && { borderColor: '#f87171', backgroundColor: '#2d1b1b' },
                ]}
            />
            {error && <Text style={styles.error}>{error.message}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: { width: '100%', gap: 4 },
    label: { color: '#cbd5e1', fontWeight: '600' },
    input: {
        backgroundColor: '#141a32',
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 12,
        color: '#fff',
        borderWidth: 1,
        borderColor: '#2a3050',
    },
    error: { color: '#fca5a5', fontSize: 12, marginTop: 2 },
});
