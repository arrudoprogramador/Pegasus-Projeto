import React, { useEffect, useState } from 'react';
import {
  StatusBar,
  Text,
  Modal,
  TextInput,
  View,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import { Ionicons, Feather, FontAwesome, Entypo, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import style from './style';

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

  let apiKey = 'http://192.168.18.33:8000';
  if (__DEV__) {
    if (Platform.OS === 'web') {
      apiKey = 'http://127.0.0.1:8000';
    } else {
      const hostUri = Constants.expoConfig?.hostUri;
      const localIP = hostUri ? hostUri.split(':')[0] : 'localhost';
      apiKey = `http://${localIP}:8000`;
    }
  }

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
      } finally {
        setLoading(false);
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

      const response = await fetch(`${apiKey}/api/conta/atualizar/${userId}`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      });

      if (response.ok) {
        const res = await api.get('/user');
        setUsuario(res.data);
        setNome(res.data.nome);
        setEmail(res.data.email);

        setModalEditarVisible(false);
        setSucessoModalVisible(true);
      } else {
        const json = await response.json();
        Alert.alert('Erro', `Erro ao atualizar perfil: ${JSON.stringify(json.errors || json.message)}`);
      }
    } catch (error) {
      console.error('Erro na atualização:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao atualizar.');
    } finally {
      setLoading(false);
    }
  };

  const sairDaConta = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      navigation.navigate('Home');
    } catch (error) {
      console.error('Erro ao sair da conta:', error);
    }
  };

  if (loading || !usuario) {
    return (
      <View style={style.container}>
        <ActivityIndicator size="large" color="#008000" />
      </View>
    );
  }

const options = [
  { label: 'Histórico de Pedidos', icon: <Ionicons name="calendar-outline" size={20} color="#555" />, action: () => {} },
  { label: 'Método de Pagamento', icon: <Feather name="credit-card" size={20} color="#555" />, action: () => {} },
  { label: 'Meus Endereços', icon: <Entypo name="location-pin" size={20} color="#555" />, action: () => {} },
  { label: 'Meus Cupons', icon: <MaterialIcons name="card-giftcard" size={20} color="#555" />, action: () => {} },
  { label: 'Favoritos', icon: <FontAwesome name="heart-o" size={20} color="#555" />, action: () => {} },
  
{ label: 'Informações pessoais', icon: <FontAwesome name="user" size={20} color="#555" />, action: () => {} },
{ label: 'Segurança e Acesso', icon: <FontAwesome name="lock" size={20} color="#555" />, action: () => {} },
{ label: 'Notificações', icon: <FontAwesome name="bell" size={20} color="#555" />, action: () => {} },
{ label: 'Ajuda e Suporte', icon: <FontAwesome name="question-circle" size={20} color="#555" />, action: () => {} },


  // filtros para pesquisas 
  { label: 'Tamanhos e Medidas', icon: <FontAwesome name="ruler" size={20} color="#555" />, action: () => {} },
{ label: 'Preferências de Estilo', icon: <FontAwesome name="th-large" size={20} color="#555" />, action: () => {} },

  { label: 'Sair da Conta', icon: <Feather name="log-out" size={20} color="#555" />, action: sairDaConta },
];


  return (
    <View style={style.container}>
      <LinearGradient colors={['#001', '#003']} style={style.header} start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}>
        <Text style={style.headerText}>Meu Perfil</Text>
      </LinearGradient>

      <View style={style.profileCard}>
        <Image
          source={{ uri: usuario.avatar || '' }}
          style={style.profileImage}
        />
        <View style={{ flex: 1 }}>
          <Text style={style.profileName}>{usuario.nome}</Text>
          <Text style={style.profileEmail}>{usuario.email}</Text>
        </View>
        <TouchableOpacity onPress={() => setModalEditarVisible(true)} style={style.editIcon}>
          <Feather name="edit" size={18} color="#555" />
        </TouchableOpacity>
      </View>

      <ScrollView style={style.optionsContainer}>
        {options.map((opt, idx) => (
          <TouchableOpacity key={idx} style={style.option} onPress={opt.action}>
            <View style={style.optionLeft}>
              {opt.icon}
              <Text style={style.optionText}>{opt.label}</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#ccc" />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Modals... (mesmos que você já possui) */}
      <Modal visible={modalEditarVisible} animationType="slide" transparent>
        <View style={style.modalContainer}>
          <View style={style.modalContent}>
            <Text style={style.modalTitle}>Editar Perfil</Text>
            <TextInput style={style.inputField} value={nome} onChangeText={setNome} placeholder="Nome" />
            <TextInput style={style.inputField} value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" />
            <View style={style.inputFieldContainer}>
              <TextInput
                style={{ flex: 1 }}
                placeholder="Senha (deixe em branco para manter)"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry={!senhaVisivel}
              />
              <TouchableOpacity onPress={() => setSenhaVisivel(!senhaVisivel)}>
                <Ionicons name={senhaVisivel ? 'eye-off' : 'eye'} size={24} color="gray" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={style.saveButton} onPress={atualizarPerfil}>
              <Text style={style.saveButtonText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.cancelButton} onPress={() => setModalEditarVisible(false)}>
              <Text style={style.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal transparent animationType="fade" visible={modalLogoutVisible} onRequestClose={() => setModalLogoutVisible(false)}>
        <View style={style.modalContainer}>
          <View style={style.modalContent}>
            <Text style={style.modalTitle}>Deseja sair da conta?</Text>
            <View style={style.modalButtonContainer}>
              <TouchableOpacity style={style.modalCancelButton} onPress={() => setModalLogoutVisible(false)}>
                <Text style={style.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={style.modalConfirmButton} onPress={sairDaConta}>
                <Text style={style.modalButtonTextConfirm}>Sair</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={sucessoModalVisible} transparent animationType="fade" onRequestClose={() => setSucessoModalVisible(false)}>
        <View style={style.modalContainer}>
          <View style={style.modalContent}>
            <Text style={style.modalTitle}>Perfil atualizado com sucesso!</Text>
            <TouchableOpacity style={style.saveButton} onPress={() => setSucessoModalVisible(false)}>
              <Text style={style.saveButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <StatusBar style="auto" />
    </View>
  );
}
