import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Pressable, ImageBackground, Image, Platform} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import style from './style';

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMensagem, setModalMensagem] = useState('');
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  let apiKey = "http://192.168.18.33:8000";
    
      if (__DEV__) {
        if (Platform.OS === 'web') {
          apiKey = 'http://127.0.0.1:8000';
        } else {
          const hostUri = Constants.expoConfig?.hostUri;
          const localIP = hostUri ? hostUri.split(':')[0] : 'localhost';
          apiKey = `http://${localIP}:8000`;
        }
      } else {
        apiKey = "http://192.168.18.33:8000";
      }

  const handleRedefinirSenha = () => navigation.navigate('RedefinirSenha');
  const handleCadastrar = () => navigation.navigate('Cadastro');

  const handleLogin = async () => {
    if (!email || !senha) {
      setModalMensagem('Por favor, preencha todos os campos.');
      setModalVisible(true);
      return;
    }

    try {
      const response = await axios.post(`${apiKey}/api/login`, {
        email,
        password: senha,
      });

      const token = response.data.token;

      if (token) {
        await AsyncStorage.setItem('authToken', token);
        setModalMensagem('Login realizado com sucesso!');
        setModalVisible(true);
        navigation.navigate('Home');
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
    <ImageBackground
      source={require('../../../assets/bg1.jpg')}
      style={style.background}
      resizeMode="cover"
    >
      <View style={style.imageOverlay} />

      <View style={style.overlay}>
        <View style={style.pai}>
          <View style={style.text}>
            <Text style={style.title}>Login</Text>
            <Text style={style.subtitle}>Bem-vindo de volta</Text>
          </View>

          <View style={style.inputs}>
            <TextInput
              style={style.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
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
                  style={[style.icon, { tintColor: '#FFFFFF', width: 20, height: 20 }]}
                />
              </TouchableOpacity>
            </View>
                      <View style={style.text}>
            <Text style={style.subText}>
              Esqueceu a senha?{' '}
              <Text style={style.linkText} onPress={handleRedefinirSenha}>
                Redefinir
              </Text>
            </Text>

            <Text style={style.subText}>
              Não tem conta?{' '}
              <Text style={style.linkText} onPress={handleCadastrar}>
                Cadastrar
              </Text>
            </Text>
          </View>
          </View>



          <View style={style.buttons}>
            <TouchableOpacity style={style.button} onPress={handleLogin}>
              <Text style={style.buttonText}>Entrar</Text>
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
                  if (modalMensagem.includes('sucesso')) {
                    navigation.navigate('Home');
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
