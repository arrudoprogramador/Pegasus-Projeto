import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";

export default function Pesquisa() {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ category: "", size: "", color: "", priceRange: [0, 500] });
  const [showFilter, setShowFilter] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  let apiKey = "http://192.168.18.33:8000"; 

  if (__DEV__) {
    const hostUri = Constants.expoConfig?.hostUri;
    const localIP = hostUri ? hostUri.split(':')[0] : 'localhost';
    apiKey = `http://${localIP}:8000`;
  }

  useEffect(() => {
    buscarProdutos();
  }, []);

  const buscarProdutos = async () => {
    try {
      setLoading(true);
      console.log("📡 Buscando produtos...");

      const response = await fetch(`${apiKey}/api/visualizarProdutos`, {
        method: "GET",
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error("Erro ao buscar produtos");

      const data = await response.json();
      console.log("✅ Produtos recebidos:", data);

      // ⚠️ Laravel provavelmente retorna algo como { data: [...] }
      setProducts(data.data || []); // pega os produtos
    } catch (error) {
      console.error("❌ Erro ao buscar produtos:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Alternar favorito no estado (UI)
  const toggleFavorite = (id) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, favorited: !item.favorited } : item
      )
    );
  };

  // ✅ Card do Produto
  const renderProduct = ({ item }) => (
    <View
      style={{
        backgroundColor: "#fff",
        width: "48%",
        borderRadius: 12,
        padding: 8,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      }}
    >
      <Image
        source={{ uri: `${apiKey}/img/produtos/${item.foto}` }}
        style={{ width: "100%", height: 130, borderRadius: 10 }}
        resizeMode="cover"
      />

      <Text style={{ fontWeight: "600", fontSize: 14, marginTop: 5 }} numberOfLines={1}>
        {item.nome}
      </Text>

      <Text style={{ fontSize: 15, fontWeight: "bold", color: "#111" }}>
        R$ {parseFloat(item.preco).toFixed(2)}
      </Text>

      {/* Botão Favoritar */}
      <TouchableOpacity
        onPress={() => toggleFavorite(item.id)}
        style={{ position: "absolute", top: 10, right: 10 }}
      >
        <Ionicons
          name={item.favorited ? "heart" : "heart-outline"}
          size={22}
          color={item.favorited ? "red" : "#555"}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#F8F9FA" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          backgroundColor: "#fff",
          elevation: 3,
        }}
      >
        <Ionicons name="search" size={22} color="#999" style={{ marginRight: 8 }} />
        <TextInput
          placeholder="Buscar roupas, calçados..."
          value={search}
          onChangeText={setSearch}
          style={{ flex: 1, fontSize: 16 }}
        />
        <TouchableOpacity onPress={() => setShowFilter(true)}>
          <Ionicons name="options-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* 🔄 Loading ou lista */}
      {loading ? (
        <ActivityIndicator size="large" color="#000" style={{ marginTop: 50 }} />
      ) : products.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 50, fontSize: 16 }}>
          Nenhum produto encontrado
        </Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between", paddingHorizontal: 10 }}
          contentContainerStyle={{ paddingVertical: 10 }}
          renderItem={renderProduct}
        />
      )}
    </View>
  );
}
