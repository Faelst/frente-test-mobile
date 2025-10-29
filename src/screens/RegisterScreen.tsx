import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '../components/FormInput';
import PrimaryButton from '../components/PrimaryButton';
import { signUp } from '../services/auth';
import { registerSchema, RegisterSchema } from '../validation/AuthSchema';

export default function RegisterScreen({ navigation }: any) {
    const {
        handleSubmit,
        register,
        setValue,
        formState: { errors },
    } = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
    });

    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: RegisterSchema) => {
        try {
            setLoading(true);
            const result = await signUp(data);

            if (result.success) {
                Alert.alert('Cadastro realizado!', 'Você já pode fazer login.');
                navigation.replace('Login');
            } else {
                Alert.alert('Erro no cadastro', 'Não foi possível criar sua conta.');
            }
        } catch (e: any) {
            console.error(e);
            Alert.alert('Erro no cadastro', e?.response?.data?.message || 'Falha ao registrar.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastro</Text>

            <FormInput
                label="Nome"
                {...register('name')}
                onChangeText={(v) => setValue('name', v)}
                error={errors.name}
            />

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

            <FormInput
                label="Confirmar senha"
                secureTextEntry
                {...register('confirmPassword')}
                onChangeText={(v) => setValue('confirmPassword', v)}
                error={errors.confirmPassword}
            />

            <PrimaryButton title={loading ? 'Cadastrando...' : 'Cadastrar'} onPress={handleSubmit(onSubmit)} disabled={loading} />

            <Text style={styles.switch}>
                Já tem conta?{' '}
                <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
                    Entrar
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
