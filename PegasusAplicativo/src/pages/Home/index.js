import { StatusBar } from "expo-status-bar";
import style from './style.js';
import { TextInput, Dimensions, Text, View, TouchableOpacity, Image, FlatList, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect, useRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

export default function Home() {
    const navigation = useNavigation();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const categories = [
        { id: '1', name: "Tênis", image: require("../../../assets/category-sneakers.png") },
        { id: '2', name: "Camisetas", image: require("../../../assets/category-tshirt.png") },
        { id: '3', name: "Shorts", image: require("../../../assets/category-shorts.png") },
        { id: '4', name: "Acessórios", image: require("../../../assets/category-accessories.png") },
        { id: '5', name: "Esportes", image: require("../../../assets/category-sports.png") },
        { id: '6', name: "Promoções", image: require("../../../assets/category-discount.png") },
    ];

    const products = [
        { id: '1', name: "Tênis Air Max TN", price: "R$ 799,90", discount: "R$ 999,90", image: require("../../../assets/airMaxTN.jpeg"), rating: 4.8, sold: 125, promo: "20% OFF" },
        { id: '2', name: "Camiseta Dry-Fit", price: "R$ 129,90", discount: "R$ 159,90", image: require("../../../assets/dryfit-shirt.jpg"), rating: 4.5, sold: 89, promo: "18% OFF" },
        { id: '3', name: "Short de Corrida", price: "R$ 149,90", discount: "", image: require("../../../assets/running-shorts.jpg"), rating: 4.7, sold: 42 },
        { id: '4', name: "Meias Esportivas", price: "R$ 39,90", discount: "R$ 49,90", image: require("../../../assets/sport-socks.jpg"), rating: 4.3, sold: 210, promo: "PROMO" },
    ];

    const carouselImages = [
        require("../../../assets/banner1p.jpg"),
        require("../../../assets/banner2.jpg"),
        require("../../../assets/banner3.jpg"),
    ];

    const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);
    const flatListRef = useRef(null);

    const handleScroll = (event) => {
        const slideSize = event.nativeEvent.layoutMeasurement.width;
        const index = Math.round(event.nativeEvent.contentOffset.x / slideSize);
        setActiveCarouselIndex(index);
    };

    const botoes = [
        { nome: "Home", imagem: require("../../../assets/home.png"), tela: "Home" },
        { nome: "Carrinho", imagem: require("../../../assets/carrinho.png"), tela: "Carrinho" },
        { nome: "Perfil", imagem: require("../../../assets/usuario.png"), tela: "Cadastro" },
    ];

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = await AsyncStorage.getItem('authToken');
                setIsAuthenticated(!!token);
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
        <LinearGradient colors={['#001F54', '#074b94']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={style.footer}>
            <View style={style.contentFooter}>
                {botoes.map((item) => (
                    <TouchableOpacity
                        key={item.nome}
                        style={{ alignItems: 'center' }}
                        onPress={() => navigation.navigate(item.tela)}
                    >
                        <Image source={item.imagem} style={style.footerIcon} />
                        <Text style={style.footerText}>{item.nome}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </LinearGradient>
    );

    if (!isAuthenticated) {
        return (
            <View style={style.container}>
                <StatusBar style="dark" />
                <View style={style.cabecalho}>
                    <View style={style.headerContent}>
                        <TextInput style={style.barraPesquisa} placeholder="Buscar produtos esportivos..." placeholderTextColor="#888" />
                        <View style={style.headerIcons}>
                            <TouchableOpacity onPress={() => navigation.navigate('Carrinho')}>
                                <Image source={require('../../../assets/carrinho.png')} style={style.headerIcon} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('Bate-papo')}>
                                <Image source={require('../../../assets/batePapo.png')} style={[style.headerIcon, { marginLeft: 15 }]} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={style.containerCarrouselImagens}>
                        <FlatList
                            ref={flatListRef}
                            data={carouselImages}
                            horizontal
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(_, index) => index.toString()}
                            onScroll={handleScroll}
                            renderItem={({ item }) => <Image source={item} style={style.image} />}
                        />
                        <View style={style.dotsContainer}>
                            {carouselImages.map((_, index) => (
                                <View key={index} style={[style.dot, index === activeCarouselIndex && style.activeDot]} />
                            ))}
                        </View>
                    </View>

                    <View style={style.containerCarrouselCategorias}>
                        <Text style={style.sectionTitle}>Categorias</Text>
                        <FlatList
                            data={categories}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={style.carrouselCategorias}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={style.categoryItem}>
                                    <View style={style.categoryIcon}>
                                        <Image source={item.image} style={style.categoryImage} />
                                    </View>
                                    <Text style={style.categoryText}>{item.name}</Text>
                                </TouchableOpacity>
                            )}
                            keyExtractor={item => item.id}
                        />
                    </View>

                    <View style={style.containerProdutos}>
                        <Text style={style.sectionTitle}>Destaques</Text>
                        <View style={style.productsGrid}>
                            {products.map((product) => (
                                <TouchableOpacity
                                    key={product.id}
                                    style={style.productCard}
                                    onPress={() => navigation.navigate('ProductDetail', { product })}
                                >
                                    {product.promo && (
                                        <View style={style.promoBadge}>
                                            <Text style={style.promoText}>{product.promo}</Text>
                                        </View>
                                    )}
                                    <View style={style.productImageContainer}>
                                        <Image source={product.image} style={style.productImage} />
                                    </View>
                                    <View style={style.productInfo}>
                                        <Text style={style.productName} numberOfLines={2}>{product.name}</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={style.productPrice}>{product.price}</Text>
                                            {product.discount && <Text style={style.productDiscount}>{product.discount}</Text>}
                                        </View>
                                        <View style={style.productRating}>
                                            <Image source={require('../../../assets/star-filled.png')} style={{ width: 14, height: 14, tintColor: '#FFD700' }} />
                                            <Text style={style.ratingText}>{product.rating}</Text>
                                            <Text style={style.soldText}>| Vendidos: {product.sold}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </ScrollView>

                {renderFooter()}
            </View>
        );
    } else {
        return (
            <View style={style.container}>
                <StatusBar style="dark" />
                <View style={style.cabecalho}>
                    <Text style={style.welcomeText}>Bem-vindo de volta!</Text>
                    <TouchableOpacity onPress={handleLogout} style={style.logoutButton}>
                        <Text style={style.logoutText}>Sair</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={style.loggedInContent}>
                        <Text style={style.sectionTitle}>Seus favoritos</Text>
                        <View style={style.containerCarrouselImagens}>
                            <FlatList
                                ref={flatListRef}
                                data={carouselImages}
                                horizontal
                                pagingEnabled
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(_, index) => index.toString()}
                                onScroll={handleScroll}
                                renderItem={({ item }) => <Image source={item} style={style.image} />}
                            />
                            <View style={style.dotsContainer}>
                                {carouselImages.map((_, index) => (
                                    <View key={index} style={[style.dot, index === activeCarouselIndex && style.activeDot]} />
                                ))}
                            </View>
                        </View>

                        <View style={style.personalizedSection}>
                            <Text style={style.personalizedTitle}>Recomendados para você</Text>
                            {/* Conteúdo personalizado para logado */}
                        </View>
                    </View>
                </ScrollView>

                {renderFooter()}
            </View>
        );
    }
}
