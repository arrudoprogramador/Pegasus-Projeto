import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  // Container principal
  container: {
    flex: 1,
    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
    paddingHorizontal: 24,
    paddingTop: 48,
  },

  // Header section
  header: {
    marginBottom: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // Título com efeito de letterpress
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#212529',
    fontFamily: 'SFProDisplay-Semibold',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(255,255,255,0.8)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 1,
  },

  // Card de informações - Vidro fosco
  infoContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(233, 236, 239, 0.7)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
  },

  infoLabel: {
    fontSize: 13,
    color: '#6c757d',
    marginBottom: 6,
    fontWeight: '500',
    letterSpacing: 0.3,
  },

  infoValue: {
    fontSize: 17,
    color: '#212529',
    fontWeight: '600',
    marginBottom: 20,
    fontFamily: 'SFProText-Medium',
  },

  // Botões principais - Efeito de profundidade
  actionButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
    transition: 'all 0.3s ease',
  },

  actionButtonText: {
    color: '#212529',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },

  // Modal - Design de vidro inteligente
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(33, 37, 41, 0.7)',
    justifyContent: 'center',
    padding: 24,
    backdropFilter: 'blur(8px)',
  },

  modalContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 32,
    border: '1px solid rgba(233, 236, 239, 0.8)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.1)',
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 28,
    textAlign: 'center',
    fontFamily: 'SFProDisplay-Semibold',
  },

  // Campos de entrada - Estilo premium
  inputField: {
    backgroundColor: 'rgba(248, 249, 250, 0.7)',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    color: '#212529',
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(206, 212, 218, 0.5)',
    fontFamily: 'SFProText-Regular',
  },

  inputFieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(248, 249, 250, 0.7)',
    borderRadius: 12,
    paddingHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(206, 212, 218, 0.5)',
  },

  // Botões do modal - Contraste elegante
  primaryButton: {
    backgroundColor: '#212529',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    transition: 'all 0.3s ease',
  },

  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },

  secondaryButton: {
    backgroundColor: 'transparent',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#adb5bd',
  },

  secondaryButtonText: {
    color: '#495057',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },

  // Efeitos de hover (para web)
  buttonHover: {
    transform: [{ scale: 1.02 }],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
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
