import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Pressable, ImageBackground, Image } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import style from './style';

export default function Cadastro() {
    const navigation = useNavigation();
    
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaVisivel, setSenhaVisivel] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMensagem, setModalMensagem] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    const fazerCadastro = async () => {
        if (!nome || !email || !senha || !setConfirmarSenha) {
            setModalMensagem('Preencha todos os campos obrigatórios.');
            setModalVisible(true);
            return;
        }

        if (senha !== confirmarSenha){
            setModalMensagem('As senhas não coincidem.');
            setModalVisible(true)
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
        <ImageBackground
            source={require('../../../assets/bg1.jpg')}
            style={style.background}
            resizeMode='cover'
        >
        <View style={style.imageOverlay}/>

        <View style={style.overlay}>
            <View style={style.pai}>
                <View style={style.text}>
                    <Text style={style.title}>Cadastro</Text>
                    <Text style={style.subtitle}>Crie sua conta</Text>
                </View>        

        <View style={style.inputs}>
            <TextInput 
                style={style.input} 
                placeholder="Nome" 
                value={nome} 
                onChangeText={setNome}
                placeholderTextColor="#E0E0E0"
            />
            <TextInput 
                style={style.input} 
                placeholder="Email" 
                value={email} 
                onChangeText={setEmail} 
                keyboardType="email-address"
                autoCapitalize='none'
                placeholderTextColor="#E0E0E0"
            />
            <View style={style.inputWrapper}>
            <TextInput 
                style={style.input} 
                placeholder="Senha" 
                value={senha} 
                onChangeText={setSenha} 
                secureTextEntry={!senhaVisivel}
                placeholderTextColor="#E0E0E0"
            />

            <TouchableOpacity
                style={style.eyeIcon}
                onPress={() => setSenhaVisivel(!senhaVisivel)}
                >
            <Image 
                source={
                    senhaVisivel
                        ? require('../../../assets/olhoA.png')
                        : require('../../../assets/olhoF.png')
                }
                style={[style.icon, { tintColor: '#ffffff', width: 20, height: 20}]}
            />
            </TouchableOpacity>
            </View>

            <View style={style.inputWrapper}>
            <TextInput 
                style={style.input} 
                placeholder="Confirmar Senha" 
                value={confirmarSenha} 
                onChangeText={setConfirmarSenha}
                secureTextEntry={!senhaVisivel}
                placeholderTextColor="#E0E0E0"
            />
            <TouchableOpacity
                style={style.eyeIcon}
                onPress={() => setSenhaVisivel(!senhaVisivel)}
            >
                <Image 
                source={
                    senhaVisivel
                    ? require('../../../assets/olhoA.png')
                    : require('../../../assets/olhoF.png')
                }
                style={[style.icon, { tintColor: '#ffffff', width: 20, height: 20 }]}
                />
            </TouchableOpacity>
            </View>


            <View style={style.text}>
            <Text style={style.subText}>
              Já possui uma conta?{' '}
              <Text style={style.linkText} onPress={() => navigation.navigate("Login")}>
                Login
              </Text>
            </Text>
          </View>
        </View>


            <View style={style.buttons}>
                <TouchableOpacity style={style.button} onPress={fazerCadastro}>
                    <Text style={style.buttonText}>Cadastre-se</Text>
                </TouchableOpacity>
            </View>
            
                      <View style={style.socialIcons}>
                        <TouchableOpacity>
                          <Image source={require('../../../assets/apple.png')} style={style.icon} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                          <Image source={require('../../../assets/google.png')} style={style.icon} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                          <Image source={require('../../../assets/face.png')} style={style.icon} />
                        </TouchableOpacity>
                      </View>
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
        </ImageBackground>
    );
}