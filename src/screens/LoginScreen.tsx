import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '../components/FormInput';
import PrimaryButton from '../components/PrimaryButton';
import { useAuth } from '../context/AuthContext';
import { loginSchema, LoginSchema } from '../validation/AuthSchema';

export default function LoginScreen({ navigation }: any) {
    const { signInUser } = useAuth();
    const { handleSubmit, register, setValue, formState: { errors } } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
    });
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: LoginSchema) => {
        try {
            setLoading(true);
            await signInUser(data);
        } catch (e: any) {
            Alert.alert('Erro no login', e?.response?.data?.message || 'Falha ao autenticar.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Entrar</Text>

            <FormInput
                label="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                {...register('email')}
                onChangeText={(v) => setValue('email', v)}
                error={errors.email}
            />

            <FormInput
                label="Senha"
                secureTextEntry
                {...register('password')}
                onChangeText={(v) => setValue('password', v)}
                error={errors.password}
            />

            <PrimaryButton title={loading ? 'Entrando...' : 'Entrar'} onPress={handleSubmit(onSubmit)} disabled={loading} />

            <Text style={styles.switch}>
                Não tem conta?{' '}
                <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
                    Cadastre-se
                </Text>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0b1020', padding: 20, justifyContent: 'center', gap: 16 },
    title: { color: '#fff', fontSize: 28, fontWeight: '700', textAlign: 'center', marginBottom: 20 },
    switch: { color: '#cbd5e1', textAlign: 'center' },
    link: { color: '#3b82f6', fontWeight: '700' },
});
