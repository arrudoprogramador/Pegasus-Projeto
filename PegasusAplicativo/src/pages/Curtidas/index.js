import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Dimensions,Animated,RefreshControl, Easing, TextInput} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';


const { width } = Dimensions.get('window');

const mockFavorites = [
  {
    id: '1',
    name: 'Tênis Nike Air Max 270',
    price: 799.99,
    originalPrice: 899.99,
    discount: 11,
    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/air-max-270-mens-shoes-KkLcGR.png',
    rating: 4.8,
    sold: 1245,
    freeShipping: true,
    isWishlisted: true
  },
  {
    id: '2',
    name: 'Tênis Nike Air Max 270',
    price: 799.99,
    originalPrice: 899.99,
    discount: 11,
    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/air-max-270-mens-shoes-KkLcGR.png',
    rating: 4.8,
    sold: 1245,
    freeShipping: true,
    isWishlisted: true
  },
  {
    id: '3',
    name: 'Tênis Nike Air Max 270',
    price: 799.99,
    originalPrice: 899.99,
    discount: 11,
    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/air-max-270-mens-shoes-KkLcGR.png',
    rating: 4.8,
    sold: 1245,
    freeShipping: true,
    isWishlisted: true
  },
  {
    id: '4',
    name: 'Tênis Nike Air Max 270',
    price: 799.99,
    originalPrice: 899.99,
    discount: 11,
    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/air-max-270-mens-shoes-KkLcGR.png',
    rating: 4.8,
    sold: 1245,
    freeShipping: true,
    isWishlisted: true
  },
  {
    id: '5',
    name: 'Relógio Casio G-Shock',
    price: 599.99,
    originalPrice: 699.99,
    discount: 14,
    image: 'https://casio.vteximg.com.br/arquivos/ids/157086-1000-1000/DW5600E-1V.png?v=637569028089700000',
    rating: 4.9,
    sold: 567,
    freeShipping: false,
    isWishlisted: true
  },
  
];

export default function Curtidas() {
  const navigation = useNavigation();
  const [favorites, setFavorites] = useState(mockFavorites);
  const [refreshing, setRefreshing] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideUpAnim = useState(new Animated.Value(30))[0];
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
const [filteredFavorites, setFilteredFavorites] = useState(favorites);


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

useEffect(() => {
  const filtered = favorites.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  setFilteredFavorites(filtered);
}, [searchQuery, favorites]);


  useEffect(() => {
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
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const toggleWishlist = (id) => {
    setFavorites(favorites.map(item => 
      item.id === id ? { ...item, isWishlisted: !item.isWishlisted } : item
    ));
  };

  const removeItem = (id) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }).start(() => {
      setFavorites(favorites.filter(item => item.id !== id));
      fadeAnim.setValue(1);
    });
  };

  const renderItem = ({ item }) => (
    <Animated.View 
      style={[
        styles.productCard,
        { 
          opacity: fadeAnim,
          transform: [{ translateY: slideUpAnim }]
        }
      ]}
    >
      <TouchableOpacity 
        style={styles.wishlistButton}
        onPress={() => removeItem(item.id)
        }
      >
        <Ionicons 
          name={item.isWishlisted ? 'heart' : 'heart-outline'} 
          size={24} 
          color={item.isWishlisted ? '#e60023' : '#ccc'} 
        />
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate('Produto', { id: item.id })}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
      </TouchableOpacity>
      
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
        
        <View style={styles.priceContainer}>
          <Text style={styles.currentPrice}>R$ {item.price.toFixed(2)}</Text>
          {item.originalPrice && (
            <Text style={styles.originalPrice}>R$ {item.originalPrice.toFixed(2)}</Text>
          )}
          {item.discount && (
            <Text style={styles.discountTag}>{item.discount}% OFF</Text>
          )}
        </View>
        
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={14} color="#FFD700" />
          <Text style={styles.ratingText}>{item.rating}</Text>
          <Text style={styles.soldText}> | {item.sold} vendidos</Text>
        </View>
        
        {item.freeShipping && (
          <View style={styles.shippingTag}>
            <Text style={styles.shippingText}>Frete grátis</Text>
          </View>
        )}
        
        <TouchableOpacity 
          style={styles.addToCartButton}
          onPress={() => console.log('Add to cart', item.id)}
        >
          <Text style={styles.addToCartText}>Adicionar ao carrinho</Text>
        </TouchableOpacity>
      </View>
      
    </Animated.View>
  );

  if (isAuthenticated) {
  return (
    <View style={styles.container}>
    
    <View style={styles.fixedSearchBar}>
  <TextInput
    style={styles.barraPesquisa}
    placeholder="Buscar produto..."
    placeholderTextColor="#999"
    value={searchQuery}
    onChangeText={text => setSearchQuery(text)}
  />
</View>

      <FlatList
      data={filteredFavorites}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.gridContainer}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#FF0000', '#00FF00', '#0000FF']}
            tintColor="#FF0000"
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyList}>
            <Ionicons name="heart-dislike-outline" size={64} color="#ddd" />
            <Text style={styles.emptyText}>Nenhum item favoritado</Text>
            <Text style={styles.emptySubtext}>Salve seus produtos favoritos aqui</Text>
            <TouchableOpacity 
              style={styles.keepShoppingButton}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.keepShoppingText}>Continuar comprando</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
    } else{
        return(
            <View style={styles.container}>
                <Text style={styles.title}>faça login para adicionar produtos ao carrinho</Text>
            </View>
        )
    }

}