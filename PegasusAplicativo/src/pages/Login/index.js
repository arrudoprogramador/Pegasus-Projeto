import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Pressable } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import style from './style';

export default function Login() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMensagem, setModalMensagem] = useState('');
    
    const handleLogin = async () => {
        if (!email || !senha) {
            setModalMensagem('Por favor, preencha todos os campos.');
            setModalVisible(true);
            return;
        }
    
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', {
                email,
                password: senha
            });
    
            const token = response.data.token;
    
            if (token) {
                await AsyncStorage.setItem('authToken', token); 
                setModalMensagem('Login realizado com sucesso!');
                setModalVisible(true);
                navigation.navigate('Home'); // Navega automaticamente após login
            } else {
                setModalMensagem('Token não recebido. Tente novamente.');
                setModalVisible(true);
            }
    
        } catch (error) {
            let errorMessage = 'Erro ao fazer login. Verifique os dados e tente novamente.';
            
            if (error.response) {
                if (error.response.status === 401) {
                    errorMessage = 'Email ou senha incorretos';
                } else if (error.response.data?.message) {
                    errorMessage = error.response.data.message;
                }
            }
            
            setModalMensagem(errorMessage);
            setModalVisible(true);
        }
    };

    return (
        <View style={style.container}>
            <TextInput 
                style={style.input} 
                placeholder="Email" 
                value={email} 
                onChangeText={setEmail} 
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput 
                style={style.input} 
                placeholder="Senha" 
                value={senha} 
                onChangeText={setSenha} 
                secureTextEntry
            />

            <View style={style.buttons}>
                <TouchableOpacity style={style.button} onPress={handleLogin}>
                    <Text style={style.buttonText}>Fazer Login</Text>
                </TouchableOpacity>
            </View>

            <Modal 
                animationType="fade" 
                transparent={true} 
                visible={modalVisible} 
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={style.modalContainer}>
                    <View style={style.modalContent}>
                        <Text style={style.modalText}>{modalMensagem}</Text>
                        <Pressable 
                            style={style.modalButton} 
                            onPress={() => {
                                setModalVisible(false);
                                if (modalMensagem.includes("sucesso")) {
                                    navigation.navigate("Home");
                                }
                            }}
                        >
                            <Text style={style.modalButtonText}>OK</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
}