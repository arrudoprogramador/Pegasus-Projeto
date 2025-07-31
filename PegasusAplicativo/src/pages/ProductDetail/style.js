import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  icon: {
    width: 24,
    height: 24,
  },
  productContainer: {
    flex: 1,
    marginTop: 10,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  brand: {
    fontSize: 12,
    color: '#555',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 12,
    color: '#888',
  },
  favoriteWrapper: {
    alignItems: 'flex-end',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#00d3aa',
    borderRadius: 10,
    paddingHorizontal: 5,
    zIndex: 1,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
    marginTop: 10,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  productImage: {
    width: 220,
    height: 220,
  },
  selectors: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  selector: {
    alignItems: 'center',
  },
  selectorLabel: {
    fontSize: 12,
    marginBottom: 6,
  },
  sizeCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sizeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#111',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stars: {
    color: '#FFD700',
    fontSize: 16,
  },
  ratingText: {
    color: '#fff',
    marginLeft: 6,
  },
  price: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#00d3aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plus: {
    fontSize: 20,
    color: '#fff',
  },
});
