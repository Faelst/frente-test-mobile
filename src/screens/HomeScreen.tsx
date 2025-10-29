import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import SearchBar from '../components/SearchBar';
import ErrorBanner from '../components/ErrorBanner';
import LoadingBlock from '../components/LoadingBlock';
import ResultCard from '../components/ResultCard';
import PrimaryButton from '../components/PrimaryButton';
import { fetchPokemon } from '../services/pokemon';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function HomeScreen() {
    const { user, signOutUser } = useAuth();

    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [pokemonName, setPokemonName] = useState<string | null>(null);
    const [abilities, setAbilities] = useState<string[]>([]);
    const [error, setError] = useState<string>('');

    const onSearch = async () => {
        const name = (query || '').trim().toLowerCase();
        if (!name) {
            setError('Digite um nome de Pokémon.');
            return;
        }

        setLoading(true);
        setError('');
        setPokemonName(null);
        setAbilities([]);

        try {
            const result = await fetchPokemon(name);
            setPokemonName(result.pokemon);
            setAbilities(result.abilities);
        } catch (e: any) {
            if (e?.response?.status === 404) setError('Pokémon não encontrado.');
            else setError('Erro ao buscar o Pokémon.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.select({ ios: 'padding', android: undefined })}
            >
                <View style={styles.header}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.title}>Bem-vindo 👋</Text>
                        <Text style={styles.subtitle}>{user?.name}</Text>
                    </View>
                    <PrimaryButton title="Sair" onPress={signOutUser} />
                </View>

                <View style={styles.inner}>
                    <SearchBar
                        value={query}
                        onChange={(t) => {
                            setQuery(t);
                            if (error) setError('');
                        }}
                        onSubmit={onSearch}
                        loading={loading}
                    />

                    {loading ? <LoadingBlock /> : <ErrorBanner message={error} />}

                    {!loading && (
                        <ResultCard pokemonName={pokemonName} abilities={abilities} />
                    )}
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#0b1020',
    },
    container: { flex: 1, backgroundColor: '#0b1020' },
    header: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 8,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    title: { color: '#fff', fontSize: 22, fontWeight: '700' },
    subtitle: { color: '#cbd5e1', fontSize: 14 },
    inner: { flex: 1, padding: 16, gap: 16 },
});
