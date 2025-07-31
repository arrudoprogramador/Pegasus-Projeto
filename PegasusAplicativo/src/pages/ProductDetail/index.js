import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import style from './style.js';

export default function ProductDetail() {
  const navigation = useNavigation();
  const route = useRoute();
  const { product } = route.params;




const adicionarAoCarrinho = async () => {
  try {
    const carrinhoAtual = await AsyncStorage.getItem('carrinho');
    const carrinho = carrinhoAtual ? JSON.parse(carrinhoAtual) : [];

    const existente = carrinho.find(item => item.id === product.id);

    if (existente) {
      existente.quantity += 1;
    } else {
      carrinho.push({ ...product, quantity: 1 });
    }

    await AsyncStorage.setItem('carrinho', JSON.stringify(carrinho));
    alert('Produto adicionado ao carrinho!');
  } catch (error) {
    console.error('Erro ao adicionar ao carrinho:', error);
  }
};

  return (
    <View style={style.container}>
      {/* Produto */}
      <View style={style.productContainer}>
        <View style={style.productHeader}>
          <View>
            <Text style={style.brand}>{product.marca || 'Marca não informada'}</Text>
            <Text style={style.name}>{product.nome}</Text>
            <Text style={style.description}>{product.descricao || 'Sem descrição.'}</Text>
          </View>

          {/* Favorito com badge */}
          <View style={style.favoriteWrapper}>
            <View style={style.badge}>
              <Text style={style.badgeText}>2</Text>
            </View>
            <TouchableOpacity>
              <View style={style.circle}></View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Imagem */}
        <View style={style.imageContainer}>
          <Image
            source={{ uri: `http://192.168.18.33:8000/img/produtos/${product.foto}` }}
            style={style.productImage}
            resizeMode="contain"
          />
        </View>

        {/* Seletores */}
        <View style={style.selectors}>
          <View style={style.selector}>
            <Text style={style.selectorLabel}>Cor</Text>
            <View style={[style.circle, { backgroundColor: product.cor || '#ccc' }]} />
          </View>

          <View style={style.selector}>
            <Text style={style.selectorLabel}>Tamanho</Text>
            <View style={style.sizeCircle}>
              <Text style={style.sizeText}>{product.tamanho || 'Único'}</Text>
            </View>
          </View>

          <View style={style.selector}>
            <Text style={style.selectorLabel}>Zoom</Text>
            <View style={style.circle} />
          </View>
        </View>
      </View>

      {/* Rodapé */}
      <View style={style.footer}>
        <View style={style.rating}>
          <Text style={style.stars}>★ ★ ★ ★ ☆</Text>
          <Text style={style.ratingText}>{product.avaliacao || '4.0'}</Text>
        </View>

<Text style={style.price}>
  R$ {product.preco ? Number(product.preco).toFixed(2) : '0.00'}
</Text>

        <TouchableOpacity style={style.addButton} onPress={adicionarAoCarrinho}>
          <Text style={style.plus}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
