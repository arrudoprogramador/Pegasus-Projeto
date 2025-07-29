import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  cabecalho: {
    backgroundColor: '#ffffff',
    paddingTop: 10,
    paddingBottom: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 10,
  },

topBarWrapper: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 10,
  backgroundColor: '#fff',
  elevation: 4, // sombra Android
  shadowColor: '#000', // sombra iOS
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
},

fixedSearchBar: {
  paddingHorizontal: 12,
  paddingVertical: 8,
  borderTopWidth: 1,
  borderColor: '#ddd',
  backgroundColor: '#fff',
},

barraPesquisa: {
  backgroundColor: '#f2f2f2',
  borderRadius: 8,
  paddingHorizontal: 12,
  height: 40,
  fontSize: 14,
},


  headerContent: {
    flexDirection: 'colum',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap:10
  },

  nav:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width:"97%"
  },

  barraPesquisa: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
    fontSize: 14,
    color: '#333',
        width:"100%"

  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    width: 24,
    height: 24,
    marginLeft: 15,
    // tintColor: '#008000', 
  },

  
  containerCarrouselImagens: {
    height: 240,
    marginVertical: 7,
    },
    carrouselImagens: {
        flex: 1,
        marginHorizontal: 15,
        borderRadius: 10,
        overflow: 'hidden',
        position: 'relative', 
    },
    carouselImage: {
        height: 340,
        resizeMode: 'cover',
    },
    carouselDotContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 8,
        width: '100%',
    },
    carouselDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(255,255,255,0.5)',
        marginHorizontal: 4,
    },
    carouselDotActive: {
        backgroundColor: '#008000',
        width: 10,
        height: 10,
    },

  image: {
    width: 400,
    height: 210,
    resizeMode: 'cover',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#bbb',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#008000',
    width: 10,
    height: 10,
  },

 
  containerCarrouselCategorias: {
    marginVertical: 10,
  },
  carrouselCategorias: {
    height: 100,
    paddingHorizontal: 10,
  },
  categoryItem: {
    width: 80,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  categoryText: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
    fontWeight: '500',
  },

  containerProdutos: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  productCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImageContainer: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  productInfo: {
    padding: 10,
  },
  productName: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
    fontWeight: '500',
  },
  productPrice: {
    fontSize: 16,
    color: '#008000',
    fontWeight: 'bold',
  },
  productDiscount: {
    fontSize: 12,
    color: '#888',
    textDecorationLine: 'line-through',
    marginLeft: 5,
  },
  productRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  ratingText: {
    fontSize: 12,
    color: '#888',
    marginLeft: 5,
  },
  soldText: {
    fontSize: 12,
    color: '#888',
    marginLeft: 10,
  },
  promoBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#008000',
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 4,
  },
  promoText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
footer: {
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentFooter: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 10,
    },
    footerIcon: {
        width: 24,
        height: 24,
        tintColor: '#fff',
    },
    footerIconActive: {
        // tintColor: '#a0e7e5', // destaque se estiver ativo
    },
    footerText: {
        fontSize: 10,
        color: '#fff',
        marginTop: 4,
    },
    footerTextActive: {
        // color: '#a0e7e5',
    },
    centralButtonWrapper: {
        top: -30, // eleva o botão
    },
centralButton: {
    backgroundColor: '#A8CEC3', // cor interna (verde-azulado)
    width: 70,
    height: 70,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 6,
    borderColor: '#fff', // borda branca
    shadowColor: '#ffffff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 15,
},

centralIcon: {
    width: 28,
    height: 28,
    tintColor: '#fff', // tom escuro para contraste
},

});