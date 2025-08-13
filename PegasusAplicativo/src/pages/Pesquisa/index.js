import React, { useState, useEffect, useCallback } from "react";
import {
  View, Text, TextInput, TouchableOpacity, FlatList, Image,
  ActivityIndicator, Modal, ScrollView, StyleSheet
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import Slider from "@react-native-community/slider";
import styles from './style';


export default function Pesquisa() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ category: "", size: "", color: "", priceRange: [0, 1000] });
  const [showFilter, setShowFilter] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categorias = [{ id: 1, nome: "Camisetas" }, { id: 2, nome: "Calçados" }];
  const cores = [{ id: 1, nome: "Vermelho", codigo: "#FF0000" }, { id: 2, nome: "Azul", codigo: "#0000FF" }];
  const tamanhos = [{ id: 1, nome: "P" }, { id: 2, nome: "M" }, { id: 3, nome: "G" }];

  const apiKey = (() => {
    let uri = "http://192.168.18.33:8000";
    if (__DEV__) {
      const hostUri = Constants.expoConfig?.hostUri;
      const localIP = hostUri ? hostUri.split(":")[0] : "localhost";
      uri = `http://${localIP}:8000`;
    }
    return uri;
  })();

  const buscarProdutos = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiKey}/api/visualizarProdutos`);
      if (!response.ok) throw new Error("Erro ao buscar produtos");
      const data = await response.json();
      const produtosComFavorito = data.data.map(item => ({ ...item, favorited: false }));
      setProducts(produtosComFavorito);
    } catch (err) {
      console.error(err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [apiKey]);

  useEffect(() => { buscarProdutos(); }, [buscarProdutos]);

  const toggleFavorite = useCallback(id => {
    setProducts(prev => prev.map(item => (item.id === id ? { ...item, favorited: !item.favorited } : item)));
  }, []);

  const filteredProducts = products.filter(item => {
    const matchSearch = item.nome.toLowerCase().includes(search.toLowerCase());
    const matchPrice = item.preco >= filters.priceRange[0] && item.preco <= filters.priceRange[1];
    return matchSearch && matchPrice; 
  });

  const renderProduct = ({ item }) => (
    <View style={styles.productCard}>
      <Image source={{ uri: item.foto }} style={styles.productImage} resizeMode="cover" />
      
      {/* Badges */}
      <View style={styles.badgesContainer}>
        {item.promocao && <Text style={[styles.badge, { backgroundColor: "#E53935" }]}>Promo</Text>}
        {item.novidade && <Text style={[styles.badge, { backgroundColor: "#4CAF50" }]}>Novo</Text>}
        {item.destaque && <Text style={[styles.badge, { backgroundColor: "#FFC107" }]}>Destaque</Text>}
      </View>

      <Text style={styles.productName} numberOfLines={1}>{item.nome}</Text>
      <Text style={styles.productBrand}>{item.marca}</Text>
      <Text style={styles.productDesc} numberOfLines={2}>{item.descricao}</Text>

      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text style={styles.productPrice}>R$ {parseFloat(item.preco).toFixed(2)}</Text>
        {item.preco_original > 0 && <Text style={styles.productOriginalPrice}>R$ {parseFloat(item.preco_original).toFixed(2)}</Text>}
      </View>

      <Text style={styles.stock}>{item.estoque > 0 ? "Disponível" : "Esgotado"}</Text>

      <TouchableOpacity onPress={() => toggleFavorite(item.id)} style={styles.favoriteButton}>
        <Ionicons name={item.favorited ? "heart" : "heart-outline"} size={22} color={item.favorited ? "red" : "#555"} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#F8F9FA" }}>
      {/* Barra de pesquisa */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={22} color="#999" style={{ marginRight: 8 }} />
        <TextInput placeholder="Buscar produtos..." value={search} onChangeText={setSearch} style={{ flex: 1, fontSize: 16 }} />
        <TouchableOpacity onPress={() => setShowFilter(true)}>
          <Ionicons name="options-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#000" style={{ marginTop: 50 }} />
      ) : filteredProducts.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 50, fontSize: 16 }}>Nenhum produto encontrado</Text>
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between", paddingHorizontal: 10 }}
          contentContainerStyle={{ paddingVertical: 10 }}
          renderItem={renderProduct}
        />
      )}

      {/* Modal de filtros */}
      <Modal visible={showFilter} animationType="slide" transparent={true}>
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filtros</Text>
              <TouchableOpacity onPress={() => setShowFilter(false)}>
                <Ionicons name="close" size={28} color="#333" />
              </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
              <Text style={styles.label}>Preço: R$ {filters.priceRange[0]} - R$ {filters.priceRange[1]}</Text>
              <Slider
                minimumValue={0}
                maximumValue={1000}
                step={1}
                value={filters.priceRange[1]}
                onValueChange={val => setFilters({ ...filters, priceRange: [0, val] })}
              />
            </ScrollView>
            <View style={styles.modalFooter}>
              <TouchableOpacity onPress={() => setFilters({ category: "", size: "", color: "", priceRange: [0, 1000] })}
                style={[styles.footerButton, { backgroundColor: "#ccc" }]}>
                <Text>Limpar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowFilter(false)}
                style={[styles.footerButton, { backgroundColor: "#111" }]}>
                <Text style={{ color: "#fff" }}>Aplicar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}