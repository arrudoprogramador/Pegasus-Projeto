import {View, TextInput, Button, Image, } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import style from './style';

export default function Cadastro(){
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');


    fazerCadastro() = async () => {
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

    // 💡 Extrai erros do Laravel (campo `errors`)
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

    return(
        <View>
        <TextInput style={style.input} placeholder="Nome" value={nome} onChangeText={setNome} />


        <View style={style.buttons}>
        <TouchableOpacity style={style.button} onPress={handleCadastro}>
          <Text style={style.buttonText}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>

      {/* Modal de resposta */}
      <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
          <View style={{ width: '80%', backgroundColor: '#fff', borderRadius: 10, padding: 20, alignItems: 'center', elevation: 5 }}>
            <Text style={{ fontSize: 18, marginBottom: 15 }}>{modalMensagem}</Text>
            <Pressable style={{ backgroundColor: '#4CAF50', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5 }} onPress={() => {
              setModalVisible(false);
              if (modalMensagem.includes("sucesso")) {
                navigation.navigate("Login");
              }
            }}>
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
    );
}
}