import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, Modal, TextInput, View, ActivityIndicator, Alert, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import api from '../../services/api'; 
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'react-native';

export default function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [userId, setUserId] = useState(null);
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [modalEditarVisible, setModalEditarVisible] = useState(false);
  const [modalLogoutVisible, setModalLogoutVisible] = useState(false);
  const [sucessoModalVisible, setSucessoModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation(); 
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const buscarDados = async () => {
      try {
        const response = await api.get('/user');
        const userData = response.data;

        setUsuario(userData);
        setNome(userData.nome);
        setEmail(userData.email);
        setUserId(userData.id);

      } catch (error) {
        console.error('Erro ao buscar dados do perfil', error);
      }
    };

    buscarDados();
  }, []);

  const atualizarPerfil = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('nome', nome);
      formData.append('email', email);
      formData.append('password', senha);
      formData.append('_method', 'PUT');

      const response = await fetch(`http://127.0.0.1:8000/api/conta/atualizar/${userId}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: formData,
      });

      const json = await response.json();

      if (response.ok) {
        const res = await api.get('/user');
        setUsuario(res.data);
        setNome(res.data.nome);
        setEmail(res.data.email);

        setModalEditarVisible(false);
        setSucessoModalVisible(true);
      } else {
        console.warn(json);
        Alert.alert('Erro', 'Erro ao atualizar perfil: ' + JSON.stringify(json.errors || json.message));
      }
    } catch (error) {
      console.error('Erro na atualização:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao atualizar.');
    } finally {
      setLoading(false);
    }
  };

  const renderFooter = () => (
    <LinearGradient
      colors={['#000']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.footer}
    >
      <View style={styles.contentFooter}>
        {botoes.map((item, index) => (
          item.central ? (
            <TouchableOpacity 
              key={index}
              style={styles.centralButtonWrapper}
              onPress={() => navigation.navigate(item.tela)}
            >
              <View style={styles.centralButton}>
                <Image source={item.imagem} style={styles.centralIcon} />
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              key={index}
              style={{ alignItems: 'center' }}
              onPress={() => navigation.navigate(item.tela)}
            >
              <Image
                source={item.imagem}
                style={[
                  styles.footerIcon,
                  navigation.isFocused(item.tela) && styles.footerIconActive
                ]}
              />
              <Text style={[
                styles.footerText,
                navigation.isFocused(item.tela) && styles.footerTextActive
              ]}>
                {item.nome}
              </Text>
            </TouchableOpacity>
          )
        ))}
      </View>
    </LinearGradient>
  );

  const botoes = [
    { nome: "Home", imagem: require("../../../assets/homeee.png"), tela: "Home" },
    { nome: "Pesquisar", imagem: require("../../../assets/lupa.png") },
    { nome: "", imagem: require("../../../assets/sacola.png"), tela: "Carrinho", central: true },
    { nome: "Curtidas", imagem: require("../../../assets/coracao.png"), tela: "coracao" },
    { nome: "Usuário", imagem: require("../../../assets/user.png"), tela: (isAuthenticated) ? "Perfil" : "Login"},
  ];

  const sairDaConta = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      setUsuario(null);
      navigation.navigate('EscolherLogin');
    } catch (error) {
      console.error('Erro ao sair da conta:', error);
    }
  };

  if (!usuario) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#008000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Olá, {usuario.nome}</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Email</Text>
        <Text style={styles.infoValue}>{usuario.email}</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={() => setModalEditarVisible(true)} activeOpacity={0.8}>
        <Text style={styles.logoutButtonText}>Editar informações</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={() => setModalLogoutVisible(true)} activeOpacity={0.8}>
        <Text style={styles.logoutButtonText}>Sair</Text>
      </TouchableOpacity>

      

      {/* Modal de Edição */}
      <Modal visible={modalEditarVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Perfil</Text>
            
            <TextInput
              value={nome}
              onChangeText={setNome}
              placeholder="Nome"
              style={styles.inputField}
            />
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              keyboardType="email-address"
              style={[styles.inputField, { flex: 1 }]}
            />
            <View style={styles.inputFieldContainer}>
              <TextInput
                value={senha}
                onChangeText={setSenha}
                placeholder="Senha (deixe em branco para manter)"
                secureTextEntry={!senhaVisivel}
                style={{ flex: 1, paddingVertical: 10 }}
              />
              <TouchableOpacity onPress={() => setSenhaVisivel(!senhaVisivel)}>
                <Ionicons
                  name={senhaVisivel ? 'eye-off' : 'eye'}
                  size={24}
                  color="gray"
                  style={{ marginLeft: 10, marginRight: 5 }}
                />
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity onPress={atualizarPerfil} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Salvar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalEditarVisible(false)} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal de Logout */}
      <Modal
        transparent
        animationType="fade"
        visible={modalLogoutVisible}
        onRequestClose={() => setModalLogoutVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Deseja sair da conta?</Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                onPress={() => setModalLogoutVisible(false)}
                style={styles.modalCancelButton}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={sairDaConta}
                style={styles.modalConfirmButton}
              >
                <Text style={styles.modalButtonTextConfirm}>Sair</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal de Sucesso */}
      <Modal
        visible={sucessoModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setSucessoModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Perfil atualizado com sucesso!</Text>
            <TouchableOpacity
              onPress={() => setSucessoModalVisible(false)}
              style={styles.saveButton}
            >
              <Text style={styles.saveButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <StatusBar style="auto" />
    </View>
  );
}