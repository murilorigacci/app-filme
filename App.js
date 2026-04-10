import 'react-native-gesture-handler';
import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
} from 'react-native';

// Importação correta para evitar o aviso de depreciação
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ListaFilmes from './pages/listaFilmes';

const Stack = createStackNavigator();

function LoginScreen({ navigation }) {
    return (
        /* Usamos o SafeAreaView da nova biblioteca aqui */
        <SafeAreaView style={styles.container}>
            <ImageBackground
                source={require('./assets/login.png')}
                style={styles.background}
                resizeMode="cover">

                <Text style={styles.logo}>Movly</Text>

                <View style={styles.card}>
                    <Text style={styles.title}>Cadastro</Text>

                    <Text style={styles.label}>Nome de Usuário</Text>
                    <TextInput
                        placeholder="Seu Nome"
                        placeholderTextColor="#999"
                        style={styles.input}
                    />

                    <Text style={styles.label}>E-Mail ou Telefone</Text>
                    <TextInput
                        placeholder="seunome@gmail.com"
                        placeholderTextColor="#999"
                        keyboardType="email-address"
                        style={styles.input}
                    />

                    <Text style={styles.label}>Senha</Text>
                    <TextInput
                        placeholder="escreva sua senha"
                        placeholderTextColor="#999"
                        secureTextEntry={true}
                        style={styles.input}
                    />

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('Lista')}
                    >
                        <Text style={styles.buttonText}>Cadastrar-se</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

export default function App() {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Lista" component={ListaFilmes} />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000'
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#3f0202',
        marginBottom: 20,
    },
    card: {
        width: '85%',
        backgroundColor: 'rgba(122, 0, 0, 0.85)',
        borderRadius: 20,
        padding: 20,
    },
    title: {
        fontSize: 32,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    label: {
        color: '#fff',
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
    },
    input: {
        backgroundColor: '#ddd',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        color: '#333',
    },
    button: {
        marginTop: 25,
        backgroundColor: '#a00000',
        paddingVertical: 12,
        borderRadius: 15,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
