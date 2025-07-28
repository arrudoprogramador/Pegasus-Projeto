import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    fontFamily: 'HelveticaNowDisplay-Medium',
  },
  
  // Lista de Produtos
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 120,
  },
  
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  
  productImage: {
    width: 90,
    height: 90,
    borderRadius: 8,
    marginRight: 16,
  },
  
  productInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  
  productName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
  },
  
  productDetails: {
    fontSize: 13,
    color: '#6c757d',
    marginBottom: 8,
  },
  
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  
  quantityButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  
  quantityText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#212529',
    paddingHorizontal: 12,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#dee2e6',
  },
  
  priceContainer: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  
  productPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#212529',
  },
  
  removeButton: {
    padding: 4,
  },
  
  // Carrinho Vazio
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
  },
  
  emptyText: {
    fontSize: 16,
    color: '#adb5bd',
    marginTop: 16,
  },
  
  // Resumo do Pedido
  summaryContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 10,
  },
  
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  
  summaryLabel: {
    fontSize: 14,
    color: '#6c757d',
  },
  
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#212529',
  },
  
  divider: {
    height: 1,
    backgroundColor: '#e9ecef',
    marginVertical: 12,
  },
  
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
  },
  
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212529',
  },
  
  checkoutButton: {
    backgroundColor: '#212529',
    borderRadius: 8,
    paddingVertical: 16,
    marginTop: 16,
    alignItems: 'center',
  },
  
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

