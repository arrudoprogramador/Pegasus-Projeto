import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import style from './style';

export default function HistoricoPedido() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const carregarPedidos = async () => {
      try {
        // 🚫 Descomente isso quando sua API estiver funcionando
        // const response = await api.get('/pedidos');
        // setPedidos(response.data);

        // ✅ Dados simulados
        setPedidos([
          {
            id: 12345,
            data: '01/09/2025',
            valor_total: '89,90',
            status: 'Entregue',
          },
          {
            id: 12344,
            data: '28/08/2025',
            valor_total: '120,50',
            status: 'Cancelado',
          },
          {
            id: 12343,
            data: '25/08/2025',
            valor_total: '74,30',
            status: 'Em andamento',
          },
        ]);
      } catch (error) {
        console.error('Erro ao carregar pedidos:', error);
      } finally {
        setLoading(false);
      }
    };

    carregarPedidos();
  }, []);

  if (loading) {
    return (
      <View style={style.container}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={style.pedidoCard}>
      <Text style={style.pedidoId}>Pedido #{item.id}</Text>
      <Text style={style.pedidoData}>Data: {item.data}</Text>
      <Text style={style.pedidoValor}>Total: R$ {item.valor_total}</Text>
      <Text
        style={[
          style.pedidoStatus,
          item.status === 'Entregue'
            ? style.statusEntregue
            : item.status === 'Cancelado'
            ? style.statusCancelado
            : style.statusAndamento,
        ]}
      >
        Status: {item.status}
      </Text>
      <TouchableOpacity
        style={style.botaoDetalhes}
        onPress={() => navigation.navigate('DetalhesPedido', { pedidoId: item.id })}
      >
        <Text style={style.botaoDetalhesTexto}>Ver Detalhes</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={style.container}>
      <Text style={style.titulo}>Histórico de Pedidos</Text>
      <FlatList
        data={pedidos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}
