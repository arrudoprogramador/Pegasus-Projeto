import { StyleSheet } from 'react-native';

export default StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#f5f5f5', 
  },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    elevation: 2,
  },

  title:{
    color: '#000',
    fontSize: 22,
    textAlign: 'center',
  },
  
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
  },
  
  listContent: {
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 20,
  },
  
  productCard: {
    width: '48%', 
    backgroundColor: '#fff',
    borderRadius: 8, 
    margin: 4,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    position: 'relative',
  },
  
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  
  wishlistButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 2,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 12,
    padding: 4,
  },
  
  productImage: {
    width: '100%',
    height: 120, 
    borderRadius: 4,
    resizeMode: 'contain',
    marginBottom: 8,
    backgroundColor: '#f9f9f9', 
  },
  
  productInfo: {
    paddingHorizontal: 4,
  },
  
  productName: {
    fontSize: 13,
    color: '#212529',
    marginBottom: 6,
    height: 36, 
    lineHeight: 18,
    overflow: 'hidden',
  },
  
  priceContainer: {
    flexDirection: 'column',
    marginBottom: 4,
  },
  
  currentPrice: {
    fontSize: 15,
    fontWeight: '700',
    color: '#008000', 
    marginBottom: 2,
  },
  
  originalPrice: {
    fontSize: 11,
    color: '#9e9e9e',
    textDecorationLine: 'line-through',
  },
  
  discountTag: {
    fontSize: 11,
    fontWeight: '600',
    color: '#5aa1f2',
    backgroundColor: '#2c4cc9',
    borderRadius: 2,
    paddingHorizontal: 4,
    paddingVertical: 1,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  
  ratingText: {
    fontSize: 11,
    color: '#008000',
    marginLeft: 2,
    marginRight: 4,
  },
  
  soldText: {
    fontSize: 11,
    color: '#9e9e9e',
  },
  
  shippingTag: {
    backgroundColor: '#f5f5f5',
    borderRadius: 2,
    paddingHorizontal: 4,
    paddingVertical: 1,
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  
  shippingText: {
    fontSize: 10,
    color: '#757575',
  },
  
  addToCartButton: {
    backgroundColor: '#008000',
    borderRadius: 2,
    paddingVertical: 6,
    alignItems: 'center',
    marginTop: 8,
  },
  
  addToCartText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  
  removeButton: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 12,
    padding: 4,
  },
  
  // Lista Vazia
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
  },
  
  emptyText: {
    fontSize: 18,
    color: '#212529',
    fontWeight: '600',
    marginTop: 16,
  },
  
  emptySubtext: {
    fontSize: 14,
    color: '#9e9e9e',
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  
  keepShoppingButton: {
    marginTop: 24,
    backgroundColor: '#ee4d2d',
    borderRadius: 4,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  
  keepShoppingText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },

});