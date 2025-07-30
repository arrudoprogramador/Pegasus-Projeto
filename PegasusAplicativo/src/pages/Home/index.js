import { StatusBar } from "expo-status-bar";
import style from './style.js';
import { TextInput, Dimensions, Text, View, Platform, TouchableOpacity, Image, FlatList, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect, useRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

const { width } = Dimensions.get('window');

export default function Home() {
    const navigation = useNavigation();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [products, setProducts] = useState([]);
    const searchInputRef = useRef(null);
    const [loading, setLoading] = useState(true);

    let apiKey = "http://192.168.18.33:8000";

    if (__DEV__) {
        if (Platform.OS === 'web') {
            apiKey = 'http://localhost:8000';
        } else {
            const hostUri = Constants.expoConfig?.hostUri;
            const localIP = hostUri ? hostUri.split(':')[0] : 'localhost';
            apiKey = `http://${localIP}:8000`;
        }
    } else {
        apiKey = "http://192.168.18.33:8000";
    }

    const categories = [
        { id: '1', name: "Tênis", image: require("../../../assets/category-sneakers.png") },
        { id: '2', name: "Camisetas", image: require("../../../assets/category-tshirt.png") },
        { id: '3', name: "Shorts", image: require("../../../assets/category-shorts.png") },
        { id: '4', name: "Acessórios", image: require("../../../assets/category-accessories.png") },
        { id: '5', name: "Esportes", image: require("../../../assets/category-sports.png") },
        { id: '6', name: "Promoções", image: require("../../../assets/category-discount.png") },
    ];

    useEffect(() => {
        buscarProdutos();
    }, []);

    const buscarProdutos = async () => {
        try {
            setLoading(true);
            console.log('Iniciando busca de produtos...');
            
            const response = await fetch(`${apiKey}/api/visualizarProdutos`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) throw new Error('Erro ao buscar produtos');

            const data = await response.json();
            console.log('✅ Produtos recebidos:', data);

            // ✅ Corrigido: pega só o array de produtos
            setProducts(data.data);

        } catch (error) {
            console.error('❌ Erro ao buscar produtos:', error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    }

    const carouselImages = [
        require("../../../assets/banner3.jpg"),
        require("../../../assets/banner2.jpg"),
        require("../../../assets/banner1p.jpg"),
    ];

    const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);
    const flatListRef = useRef(null);

    const handleScroll = (event) => {
        const slideSize = event.nativeEvent.layoutMeasurement.width;
        const index = Math.round(event.nativeEvent.contentOffset.x / slideSize);
        setActiveCarouselIndex(index);
    };

    const botoes = [
        { nome: "Home", imagem: require("../../../assets/homeee.png"), tela: "PerfilProduto" },
        { nome: "Pesquisar", imagem: require("../../../assets/lupa.png") },
        { nome: "", imagem: require("../../../assets/sacola.png"), tela: "Carrinho", central: true },
        { nome: "Curtidas", imagem: require("../../../assets/coracao.png"), tela: "Curtidas" },
        { nome: "Usuário", imagem: require("../../../assets/user.png"), tela: (isAuthenticated) ? "Perfil" : "Login"},
    ];

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

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('authToken');
            setIsAuthenticated(false);
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    };

    const renderFooter = () => (
        <LinearGradient
            colors={['#000', '#001']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={style.footer}
        >
            <View style={style.contentFooter}>
                {botoes.map((item, index) => (
                    item.central ? (
                        <TouchableOpacity 
                            key={index}
                            style={style.centralButtonWrapper}
                            onPress={() => navigation.navigate(item.tela)}
                        >
                            <View style={style.centralButton}>
                                <Image source={item.imagem} style={style.centralIcon} />
                            </View>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            key={index}
                            style={{ alignItems: 'center' }}
                            onPress={() => {
                                if (item.nome === "Pesquisar") {
                                    setShowSearchBar(true);
                                    setTimeout(() => {
                                        searchInputRef.current?.focus();
                                    }, 100);
                                } else if (item.tela) {
                                    navigation.navigate(item.tela);
                                }
                            }}
                        >
                            <Image
                                source={item.imagem}
                                style={[
                                    style.footerIcon,
                                    navigation.isFocused?.(item.tela) && style.footerIconActive
                                ]}
                            />
                            <Text style={[
                                style.footerText,
                                navigation.isFocused?.(item.tela) && style.footerTextActive
                            ]}>
                                {item.nome}
                            </Text>
                        </TouchableOpacity>
                    )
                ))}
            </View>
        </LinearGradient>
    );

    if (loading) {
        return (
            <View style={style.container}>
                <Text>Carregando...</Text>
            </View>
        );
    }

    if (!isAuthenticated) {
        return (
        <View style={style.container}>
            <StatusBar style="dark" />

            {/* Cabeçalho fixo */}
            <View style={style.cabecalho}>
            <View style={style.headerContent}>
                <View style={style.nav}>
                <Text>logo</Text>
                <View style={style.headerIcons}>
                    <TouchableOpacity onPress={() => navigation.navigate('Notificações')}>
                    <Image
                        source={require('../../../assets/sino.png')}
                        style={style.headerIcon}
                    />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Bate-papo')}>
                    <Image
                        source={require('../../../assets/batePapo.png')}
                        style={[style.headerIcon, { marginLeft: 15 }]}
                    />
                    </TouchableOpacity>
                </View>
                </View>
            </View>
            </View>

            {/* Barra de pesquisa fixa */}
            <View style={style.fixedSearchBar}>
            <TextInput
                ref={searchInputRef}
                style={style.barraPesquisa}
                placeholder="Buscar produtos esportivos..."
                placeholderTextColor="#62a894"
            />
            </View>

            {/* FlatList principal */}
            <FlatList
            data={products} // os produtos vêm do backend
            keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())}
            numColumns={2}
            contentContainerStyle={{ paddingBottom: 100 }}
            
            // 🔥 Cabeçalho com carrossel e categorias
            ListHeaderComponent={
                <>
                {/* 🔹 Carrossel de imagens */}
                <View style={style.containerCarrouselImagens}>
                    <FlatList
                    ref={flatListRef}
                    data={carouselImages}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(_, index) => index.toString()}
                    onScroll={handleScroll}
                    renderItem={({ item }) => (
                        <Image source={item} style={style.image} />
                    )}
                    />
                    <View style={style.dotsContainer}>
                    {carouselImages.map((_, index) => (
                        <View
                        key={index}
                        style={[style.dot, index === activeCarouselIndex && style.activeDot]}
                        />
                    ))}
                    </View>
                </View>

                {/* 🔹 Categorias */}
                <View style={style.containerCarrouselCategorias}>
                    <Text style={style.sectionTitle}>Categorias</Text>
                    <FlatList
                    data={categories}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={style.carrouselCategorias}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={style.categoryItem}>
                        <View style={style.categoryIcon}>
                            <Image source={item.image} style={style.categoryImage} />
                        </View>
                        <Text style={style.categoryText}>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                    />
                </View>

                {/* 🔹 Seção de produtos */}
                <Text style={style.sectionTitle}>Destaques</Text>
                </>
            }

            // 🔥 Renderização de cada produto
            renderItem={({ item }) => (
                <TouchableOpacity
                style={style.productCard}
                onPress={() => navigation.navigate('ProductDetail', { product: item })}
                >
                {item.promo && (
                    <View style={style.promoBadge}>
                    <Text style={style.promoText}>{item.promo}</Text>
                    </View>
                )}

                <View style={style.productImageContainer}>
                    <Image
                    source={{ uri: `${apiKey}/img/produtos/${item.foto}` }}
                    style={style.productImage}
                    />
                </View>

                <View style={style.productInfo}>
                    <Text style={style.productName} numberOfLines={2}>
                    {item.nome}
                    </Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={style.productPrice}>R$ {item.preco}</Text>
                    </View>
                </View>
                </TouchableOpacity>
            )}
            />

            {/* Footer fixo */}
            {renderFooter()}
        </View>
        );
        } else {
        
           return (
            <View style={style.container}>
                <StatusBar style="dark" />

                {/* Cabeçalho fixo */}
                <View style={style.cabecalho}>
                <View style={style.headerContent}>
                    <View style={style.nav}>
                    <Text>logo</Text>
                    <View style={style.headerIcons}>
                        <TouchableOpacity onPress={() => navigation.navigate('Notificações')}>
                        <Image
                            source={require('../../../assets/sino.png')}
                            style={style.headerIcon}
                        />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Bate-papo')}>
                        <Image
                            source={require('../../../assets/batePapo.png')}
                            style={[style.headerIcon, { marginLeft: 15 }]}
                        />
                        </TouchableOpacity>
                    </View>
                    </View>
                </View>
                </View>

                {/* Barra de pesquisa fixa */}
                <View style={style.fixedSearchBar}>
                <TextInput
                    ref={searchInputRef}
                    style={style.barraPesquisa}
                    placeholder="Buscar produtos esportivos..."
                    placeholderTextColor="#62a894"
                />
                </View>

                {/* FlatList principal */}
                <FlatList
                data={products} // os produtos vêm do backend
                keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())}
                numColumns={2}
                contentContainerStyle={{ paddingBottom: 100 }}
                
                // 🔥 Cabeçalho com carrossel e categorias
                ListHeaderComponent={
                    <>
                    {/* 🔹 Carrossel de imagens */}
                    <View style={style.containerCarrouselImagens}>
                        <FlatList
                        ref={flatListRef}
                        data={carouselImages}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(_, index) => index.toString()}
                        onScroll={handleScroll}
                        renderItem={({ item }) => (
                            <Image source={item} style={style.image} />
                        )}
                        />
                        <View style={style.dotsContainer}>
                        {carouselImages.map((_, index) => (
                            <View
                            key={index}
                            style={[style.dot, index === activeCarouselIndex && style.activeDot]}
                            />
                        ))}
                        </View>
                    </View>

                    {/* 🔹 Categorias */}
                    <View style={style.containerCarrouselCategorias}>
                        <Text style={style.sectionTitle}>Categorias</Text>
                        <FlatList
                        data={categories}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={style.carrouselCategorias}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={style.categoryItem}>
                            <View style={style.categoryIcon}>
                                <Image source={item.image} style={style.categoryImage} />
                            </View>
                            <Text style={style.categoryText}>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                        />
                    </View>

                    {/* 🔹 Seção de produtos */}
                    <Text style={style.sectionTitle}>Destaques</Text>
                    </>
                }

                // 🔥 Renderização de cada produto
                renderItem={({ item }) => (
                    <TouchableOpacity
                    style={style.productCard}
                    onPress={() => navigation.navigate('ProductDetail', { product: item })}
                    >
                    {item.promo && (
                        <View style={style.promoBadge}>
                        <Text style={style.promoText}>{item.promo}</Text>
                        </View>
                    )}

                    <View style={style.productImageContainer}>
                        <Image
                        source={{ uri: `${apiKey}/img/produtos/${item.foto}` }}
                        style={style.productImage}
                        />
                    </View>

                    <View style={style.productInfo}>
                        <Text style={style.productName} numberOfLines={2}>
                        {item.nome}
                        </Text>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={style.productPrice}>R$ {item.preco}</Text>
                        </View>
                    </View>
                    </TouchableOpacity>
                )}
                />

                {/* Footer fixo */}
                {renderFooter()}
            </View>
        );
        
    }
}
