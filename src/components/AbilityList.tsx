import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

type Props = {
    abilities: string[];
};

export default function AbilityList({ abilities }: Props) {
    if (!abilities.length) {
        return <Text style={styles.empty}>Sem habilidades disponíveis.</Text>;
    }

    return (
        <FlatList
            data={abilities}
            keyExtractor={(item) => item}
            contentContainerStyle={{ gap: 6, paddingVertical: 4 }}
            renderItem={({ item, index }) => (
                <View style={styles.item}>
                    <Text style={styles.index}>{index + 1}.</Text>
                    <Text style={styles.name}>{item}</Text>
                </View>
            )}
        />
    );
}

const styles = StyleSheet.create({
    empty: { color: '#94a3b8' },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#11183a',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
    },
    index: { color: '#93c5fd', width: 28, fontWeight: '700' },
    name: { color: '#e2e8f0', textTransform: 'lowercase' },
});
