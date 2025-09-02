import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 16,
    paddingTop: 20,
  },

  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
    color: '#333',
  },

  pedidoCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  pedidoId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },

  pedidoData: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },

  pedidoValor: {
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
    marginBottom: 4,
  },

  pedidoStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  statusEntregue: {
    color: '#2e7d32',
  },

  statusCancelado: {
    color: '#c62828',
  },

  statusAndamento: {
    color: '#f9a825',
  },

  botaoDetalhes: {
    alignSelf: 'flex-start',
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },

  botaoDetalhesTexto: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
