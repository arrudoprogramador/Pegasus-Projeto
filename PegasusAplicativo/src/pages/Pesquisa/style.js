import { StyleSheet } from 'react-native';

export default StyleSheet.create({

searchContainer: { flexDirection: "row", alignItems: "center", padding: 10, backgroundColor: "#fff", elevation: 3 },
  productCard: { backgroundColor: "#fff", width: "48%", borderRadius: 12, padding: 8, marginBottom: 12, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 4, elevation: 3, position: "relative" },
  productImage: { width: "100%", height: 150, borderRadius: 10 },
  badgesContainer: { position: "absolute", top: 10, left: 10, flexDirection: "row", gap: 4 },
  badge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, color: "#fff", fontSize: 10, marginRight: 4 },
  productName: { fontWeight: "600", fontSize: 14, marginTop: 5 },
  productBrand: { fontSize: 12, color: "#555" },
  productDesc: { fontSize: 12, color: "#777", marginVertical: 4 },
  productPrice: { fontSize: 15, fontWeight: "bold", color: "#111" },
  productOriginalPrice: { fontSize: 12, color: "#999", textDecorationLine: "line-through" },
  stock: { fontSize: 12, color: "#333", marginTop: 4 },
  favoriteButton: { position: "absolute", top: 10, right: 10 },
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "flex-end" },
  modalContainer: { backgroundColor: "#fff", maxHeight: "80%", borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 16 },
  modalHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  modalTitle: { fontSize: 18, fontWeight: "bold" },
  label: { fontSize: 14, fontWeight: "600", marginTop: 12, marginBottom: 6 },
  modalFooter: { flexDirection: "row", justifyContent: "space-between", marginTop: 12 },
  footerButton: { flex: 1, padding: 12, borderRadius: 10, alignItems: "center", marginHorizontal: 4 }

  });
