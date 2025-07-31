import { StatusBar } from "expo-status-bar";
import { TextInput, Dimensions, Text, View, TouchableOpacity, Image, FlatList, ScrollView,Animated,Easing} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect, useRef } from 'react';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';



const { width } = Dimensions.get('window');

const mockProducts = [
  {
    id: '1',
    name: 'Air Jordan 1 Retro High OG',
    color: 'Black/White',
    size: '42',
    price: 799.99,
    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/air-jordan-1-retro-high-og-shoes.png',
    quantity: 1
  },
  {
    id: '2',
    name: 'Nike Air Force 1 \'07',
    color: 'White',
    size: '41',
    price: 599.99,
    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/air-force-1-07-shoes.png',
    quantity: 2
  },
  {
    id: '3',
    name: 'Nike Dunk Low Retro',
    color: 'Black/White',
    size: '40',
    price: 699.99,
    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/dunk-low-retro-shoes.png',
    quantity: 1
  }
];

export default function Carrinho() {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideUpAnim = useRef(new Animated.Value(30)).current;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  

  useEffect(() => {
const carregarCarrinho = async () => {
  try {
    const dados = await AsyncStorage.getItem('carrinho');
    const produtos = dados ? JSON.parse(dados) : [];

    // Sanitiza os produtos: garante que price seja número
    const produtosSanitizados = produtos.map(p => ({
      ...p,
      price: typeof p.price === 'number' ? p.price : parseFloat(p.price) || 0,
      quantity: typeof p.quantity === 'number' ? p.quantity : parseInt(p.quantity) || 1,
    }));

    setProducts(produtosSanitizados);

    const newTotal = produtosSanitizados.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotal(newTotal);
  } catch (error) {
    console.error('Erro ao carregar o carrinho:', error);
  }
};

    // Animação de entrada
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }),
      Animated.timing(slideUpAnim, {
        toValue: 0,
        duration: 600,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true
      })
    ]).start();

      carregarCarrinho();
  }, []);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    setProducts(products.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

   useEffect(() => {
  const checkAuth = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      setIsAuthenticated(false);
    }
  };

  checkAuth();
}, []);


  const removeItem = (id) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }).start(() => {
      setProducts(products.filter(item => item.id !== id));
      fadeAnim.setValue(1);
    });
  };

const renderItem = ({ item }) => (
  <Animated.View 
    style={[
      styles.productCard,
      { opacity: fadeAnim, transform: [{ translateY: slideUpAnim }] }
    ]}
  >
    <Image source={{ uri: item.image || `http://192.168.18.33:8000/img/produtos/${item.foto}` }} style={styles.productImage} />
    
    <View style={styles.productInfo}>
      <Text style={styles.productName}>{item.nome}</Text>
      <Text style={styles.productDetails}>Cor: {item.cor} | Tamanho: {item.tamanho}</Text>
      
      <View style={styles.quantityContainer}>
        <TouchableOpacity 
          onPress={() => updateQuantity(item.id, item.quantity - 1)}
          style={styles.quantityButton}
        >
          <Feather name="minus" size={18} color="#000" />
        </TouchableOpacity>
        
        <Text style={styles.quantityText}>{item.quantity}</Text>
        
        <TouchableOpacity 
          onPress={() => updateQuantity(item.id, item.quantity + 1)}
          style={styles.quantityButton}
        >
          <Feather name="plus" size={18} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
    
    <View style={styles.priceContainer}>
      <Text style={styles.productPrice}>R$ {Number(item.preco).toFixed(2)}</Text>
      <TouchableOpacity 
        onPress={() => removeItem(item.id)}
        style={styles.removeButton}
      >
        <MaterialCommunityIcons name="trash-can-outline" size={20} color="#e74c3c" />
      </TouchableOpacity>
    </View>
  </Animated.View>
);


  if (isAuthenticated) {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Lista de Produtos */}
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyCart}>
            <Feather name="shopping-bag" size={48} color="#ddd" />
            <Text style={styles.emptyText}>Seu carrinho está vazio</Text>
          </View>
        }
      />
      
      {/* Resumo do Pedido */}
      {products.length > 0 && (
        <Animated.View 
          style={[
            styles.summaryContainer,
            { opacity: fadeAnim, transform: [{ translateY: slideUpAnim }] }
          ]}
        >
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>R$ {total.toFixed(2)}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Frete</Text>
            <Text style={styles.summaryValue}>Grátis</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>R$ {total.toFixed(2)}</Text>
          </View>
          
          <TouchableOpacity style={styles.checkoutButton}>
            <Text style={styles.checkoutText}>Prosseguir Compra</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
    } else{
        return(
            <Text>Faça login para adicionar produtos ao carrinho, meu patrão</Text>
        )
    }
}