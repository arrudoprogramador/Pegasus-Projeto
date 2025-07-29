import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import style from './style.js';


export default function ProductDetail() {
  const navigation = useNavigation();

  return (
    <View style={style.container}>
      {/* Header */}

      {/* Produto */}
      <View style={style.productContainer}>
        <View style={style.productHeader}>
          <View>
            <Text style={style.brand}>NIKE</Text>
            <Text style={style.name}>Air Max TN</Text>
            <Text style={style.description}>lorem aaaaaaaaaaaaaaaaaaaaaa</Text>
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
            source={require('../../../assets/airMaxTN.jpeg')}
            style={style.productImage}
            resizeMode="contain"
          />
        </View>

        {/* Seletores */}
        <View style={style.selectors}>
          <View style={style.selector}>
            <Text style={style.selectorLabel}>Cor</Text>
            <View style={[style.circle, { backgroundColor: '#ccc' }]} />
          </View>

          <View style={style.selector}>
            <Text style={style.selectorLabel}>Tamanho</Text>
            <View style={style.sizeCircle}>
              <Text style={style.sizeText}>47</Text>
            </View>
          </View>

          <View style={style.selector}>
            <Text style={style.selectorLabel}>Zomm</Text>
            <View style={style.circle} />
          </View>
        </View>
      </View>

      {/* Rodapé */}
      <View style={style.footer}>
        <View style={style.rating}>
          <Text style={style.stars}>★ ★ ★ ★ ☆</Text>
          <Text style={style.ratingText}>4.1</Text>
        </View>

        <Text style={style.price}>R$ 125,90</Text>

        <TouchableOpacity style={style.addButton}>
          <Text style={style.plus}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
