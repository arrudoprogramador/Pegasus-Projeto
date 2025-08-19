// style.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },

  fixedSearchBar: {
  paddingHorizontal: 12,
  paddingVertical: 8,
  borderBottomWidth: 1,       // Para separar visualmente da lista abaixo
  borderColor: '#ddd',
  backgroundColor: '#fff',
  zIndex: 10,
},

barraPesquisa: {
  backgroundColor: '#f5f5f5',  // tom neutro claro para o fundo do input
  borderRadius: 8,
  paddingVertical: 8,
  paddingHorizontal: 15,
  fontSize: 14,
  color: '#333',
  width: '100%',
  // sombra sutil para dar profundidade
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 2,
  elevation: 2,
},


  title: {
    color: '#333',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 40,
    paddingHorizontal: 20,
  },

  listContent: {
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 32,
  },

  gridContainer: {
    justifyContent: 'space-between',
  },

productCard: {
  width: '48%',
  backgroundColor: '#fff',
  borderRadius: 12,
  marginBottom: 16,
  padding: 10,

  // iOS
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.1,
  shadowRadius: 4,

  // ANDROID
  elevation: 4,
},

wishlistButton: {
  position: 'absolute',
  top: 8,
  right: 8,
  zIndex: 2,
  backgroundColor: '#ffffff', 
  borderRadius: 16,
  padding: 6,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 2,
  elevation: 2,
},


  productImage: {
    width: '100%',
    height: 140,
    borderRadius: 8,
    resizeMode: 'contain',
    backgroundColor: '#fff',
    marginBottom: 8,
  },

  productInfo: {
    paddingHorizontal: 4,
  },

  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222',
    height: 36,
    marginBottom: 6,
  },

  priceContainer: {
    marginBottom: 6,
  },

  currentPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#28a745',
  },

  originalPrice: {
    fontSize: 12,
    color: '#aaa',
    textDecorationLine: 'line-through',
    marginTop: 2,
  },

  discountTag: {
    fontSize: 11,
    fontWeight: '600',
    color: '#fff',
    backgroundColor: '#ff6f00',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    marginTop: 6,
  },

  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },

  ratingText: {
    fontSize: 12,
    color: '#555',
    marginLeft: 4,
    marginRight: 4,
  },

  soldText: {
    fontSize: 12,
    color: '#999',
  },

  shippingTag: {
    backgroundColor: '#e0f7fa',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginTop: 6,
    alignSelf: 'flex-start',
  },

  shippingText: {
    fontSize: 11,
    color: '#00796b',
  },

  addToCartButton: {
    backgroundColor: '#28a745',
    borderRadius: 6,
    paddingVertical: 8,
    marginTop: 10,
    alignItems: 'center',
  },

  addToCartText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },

  // Lista vazia
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
  },

  emptyText: {
    fontSize: 20,
    color: '#555',
    fontWeight: 'bold',
    marginTop: 16,
  },

  emptySubtext: {
    fontSize: 14,
    color: '#888',
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 40,
  },

  keepShoppingButton: {
    marginTop: 24,
    backgroundColor: '#A8CEC3',
    borderRadius: 6,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },

  keepShoppingText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});
