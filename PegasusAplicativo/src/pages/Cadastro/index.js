import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Pressable } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import style from './style';

export default function Cadastro() {
    const navigation = useNavigation();
    
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMensagem, setModalMensagem] = useState('');

    const fazerCadastro = async () => {
        if (!nome || !email || !senha) {
            setModalMensagem('Preencha todos os campos obrigatórios.');
            setModalVisible(true);
            return;
        }

        const dados = new FormData();
        dados.append('nome', nome);
        dados.append('email', email);
        dados.append('password', senha);

        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/conta/adicionar',
                dados,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (response.status === 201 || response.data?.mensagem?.includes("sucesso")) {
                const token = response.data.token;
                if (token) {
                    await AsyncStorage.setItem('userToken', token);
                    console.log("Token salvo com sucesso!");
                }

                setModalMensagem('Cadastro realizado com sucesso!');
                setModalVisible(true);
                navigation.navigate("Login");
            } else {
                setModalMensagem('Cadastro realizado, mas houve um aviso inesperado.');
                setModalVisible(true);
            }
        } catch (error) {
            console.error("Erro:", JSON.stringify(error.response?.data || error.message, null, 2));

            // Extrai erros do Laravel (campo `errors`)
            const errors = error.response?.data?.errors;
            if (errors) {
                const mensagens = Object.values(errors).flat().join('\n');
                setModalMensagem(mensagens);
            } else if (error.response?.data?.message) {
                setModalMensagem(error.response.data.message);
            } else {
                setModalMensagem('Erro ao cadastrar. Verifique os dados e tente novamente.');
            }

            setModalVisible(true);
        }
    };

    return (
        <View style={style.container}>
            <TextInput 
                style={style.input} 
                placeholder="Nome" 
                value={nome} 
                onChangeText={setNome} 
            />
            <TextInput 
                style={style.input} 
                placeholder="Email" 
                value={email} 
                onChangeText={setEmail} 
                keyboardType="email-address"
            />
            <TextInput 
                style={style.input} 
                placeholder="Senha" 
                value={senha} 
                onChangeText={setSenha} 
                secureTextEntry
            />

            <View style={style.buttons}>
                <TouchableOpacity style={style.button} onPress={fazerCadastro}>
                    <Text style={style.buttonText}>Cadastre-se</Text>
                </TouchableOpacity>
            </View>

            <View>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                    <Text >Já possui uma conta? Faça login</Text>
                </TouchableOpacity>
            </View>

            {/* Modal de resposta */}
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
                                    navigation.navigate("Login");
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