import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AbilityList from './AbilityList';

type Props = {
    pokemonName: string | null;
    abilities: string[];
};

export default function ResultCard({ pokemonName, abilities }: Props) {
    if (!pokemonName) return null;

    return (
        <View style={styles.card}>
            <Text style={styles.title}>
                Pokémon: <Text style={styles.name}>{pokemonName}</Text>
            </Text>
            <AbilityList abilities={abilities} />
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: '#0f1530',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#1e2550',
        padding: 12,
    },
    title: { color: '#cbd5e1', fontSize: 16, marginBottom: 8 },
    name: { color: '#fff', fontWeight: '700', textTransform: 'capitalize' },
});
