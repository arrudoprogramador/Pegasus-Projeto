import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import style from './style.js';
import React, { useState } from 'react';
import { Modal, Pressable } from 'react-native';



export default function ProductDetail() {
  const navigation = useNavigation();
  const route = useRoute();
  const { product } = route.params;
  const [selectedColor, setSelectedColor] = useState(product.cor || '');
  const [selectedSize, setSelectedSize] = useState(product.tamanho || '');
  const [modalCorVisible, setModalCorVisible] = useState(false);
  const [modalTamanhoVisible, setModalTamanhoVisible] = useState(false);


  const corHex = {
  'Preto': '#000',
  'Branco': '#fff',
  'Azul': '#3498db',
  'Vermelho': '#e74c3c',
};


const adicionarAoCarrinho = async () => {
  try {

    if (!selectedColor || !selectedSize) {
      alert('Selecione cor e tamanho antes de adicionar ao carrinho.');
      return;
    }

    const carrinhoAtual = await AsyncStorage.getItem('carrinho');
    const carrinho = carrinhoAtual ? JSON.parse(carrinhoAtual) : [];

    const existente = carrinho.find(item => item.id === product.id &&
      item.cor === selectedColor &&
      item.tamanho === selectedSize
    );

    if (existente) {
      existente.quantity += 1;
    } else {
      carrinho.push({  ...product,
        cor: selectedColor,
        tamanho: selectedSize,
        quantity: 1
      });
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
  {/* Cor */}
  <View style={style.selector}>
    <Text style={style.selectorLabel}>Cor</Text>
    <TouchableOpacity style={style.colorRow} onPress={() => setModalCorVisible(true)}>
    <View style={[style.colorCircle, { backgroundColor: corHex[selectedColor] || '#ccc' }]} />
      <Text style={style.sizeText}>{selectedColor || 'Selecionar'}</Text>
    </TouchableOpacity>
  </View>

  {/* Tamanho */}
  <View style={style.selector}>
    <Text style={style.selectorLabel}>Tamanho</Text>
    <TouchableOpacity onPress={() => setModalTamanhoVisible(true)}>
      <Text style={style.sizeText}>{selectedSize || 'Selecionar'}</Text>
    </TouchableOpacity>
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


      {/* // modal da cor */}
<Modal
  visible={modalCorVisible}
  transparent
  animationType="slide"
  onRequestClose={() => setModalCorVisible(false)}
>
  <View style={style.modalOverlay}>
    <View style={style.modalContent}>
      <View style={style.modalHeader}>
        <Text style={style.modalTitle}>Selecione uma cor</Text>
        <TouchableOpacity onPress={() => setModalCorVisible(false)}>
          <Text style={style.closeButton}>✕</Text>
        </TouchableOpacity>
      </View>

      {['Preto', 'Branco', 'Azul', 'Vermelho'].map(cor => (
        <TouchableOpacity
          key={cor}
          onPress={() => {
            setSelectedColor(cor);
            setModalCorVisible(false);
          }}
        >
          <Text style={style.modalOption}>{cor}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
</Modal>




{/* // modal do tamanho  */}
<Modal
  visible={modalTamanhoVisible}
  transparent
  animationType="slide"
  onRequestClose={() => setModalTamanhoVisible(false)}
>
  <View style={style.modalOverlay}>
    <View style={style.modalContent}>
      <View style={style.modalHeader}>
        <Text style={style.modalTitle}>Selecione um tamanho</Text>
        <TouchableOpacity onPress={() => setModalTamanhoVisible(false)}>
          <Text style={style.closeButton}>✕</Text>
        </TouchableOpacity>
      </View>

      {['37', '38', '39', '40', '41', '42'].map(tam => (
        <TouchableOpacity
          key={tam}
          onPress={() => {
            setSelectedSize(tam);
            setModalTamanhoVisible(false);
          }}
        >
          <Text style={style.modalOption}>{tam}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
</Modal>


</View>

  );
}

