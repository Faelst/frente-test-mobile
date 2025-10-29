import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import PrimaryButton from './PrimaryButton';

type Props = {
    value: string;
    onChange: (t: string) => void;
    onSubmit: () => void;
    loading?: boolean;
};

export default function SearchBar({ value, onChange, onSubmit, loading }: Props) {
    return (
        <View style={styles.wrapper}>
            <TextInput
                placeholder="Digite o nome do Pokémon (ex.: pikachu)"
                placeholderTextColor="#99a"
                autoCapitalize="none"
                value={value}
                onChangeText={onChange}
                onSubmitEditing={onSubmit}
                style={styles.input}
            />
            <PrimaryButton title={loading ? 'Buscando…' : 'Pesquisar'} onPress={onSubmit} disabled={loading} />
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: { gap: 12 },
    input: {
        backgroundColor: '#141a32',
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 12,
        color: '#fff',
        borderWidth: 1,
        borderColor: '#2a3050',
    },
});
