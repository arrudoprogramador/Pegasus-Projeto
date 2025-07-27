import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  pai:{
    displa:'flex',
    flexDirection:'column',
    gap:20
  },

  overlay: {
    width: '100%',
    paddingHorizontal: 150,
    justifyContent: 'center',
  },

  text:{
    width:"97%",
    display:'flex',
    justifyContent:'center',
    alignItems:'start',

  },

title: {
  fontSize: 37,
  color: '#FFFFFF',
  fontWeight: 'bold',
  textAlign: 'left',
  marginBottom: 8,
  textShadowColor: '#ffffff',
  textShadowOffset: { width: 0, height: 0 },
  textShadowRadius: 3, // quanto maior, mais "brilho"
},

  subtitle: {
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'start',
    marginBottom: 24,
    fontFamily: 'Inter-Regular',
    textShadowColor: '#ffffff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 1,
  },

  inputs:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  },
  inputWrapper: {
    width: '100%',
    position: 'relative',
  },
  input: {
    height: 40,
    width:"100%",
    marginBottom: 20,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: 'transparent',
    fontSize: 16,
    color: '#333333',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    fontFamily: 'Inter-Regular',
    color:"#fff",
    paddingRight: 45, 
  },

  eyeIcon: {
  position: 'absolute',
  right: 15,
  top: 10,
  height: 20,
  width: 20,
  justifyContent: 'center',
  alignItems: 'center',
},

icon: {
  width: 20,
  height: 20,
  tintColor: '#999', // opcional: muda a cor do ícone
},

subText:{
  color:"#fff",
    fontSize: 14,
  marginBottom: 10

},

linkText: {
  color: '#FFFFFF',
  textDecorationLine: 'underline',
  fontFamily: 'Poppins-SemiBold',
},

  buttons: {
    marginTop: 10,
    alignItems: 'center',
    
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
    width:"50%"
  },
  buttonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    gap: 20,
  },
  icon: {
    width: 32,
    height: 32,
    marginHorizontal: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  modalText: {
    marginBottom: 24,
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
    color: '#333333',
    fontFamily: 'Inter-Regular',
  },
  modalButton: {
    backgroundColor: '#4C9BE5',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },

  background: {
  flex: 1,
  width: '100%',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
},

imageOverlay: {
  ...StyleSheet.absoluteFillObject,
  backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  zIndex: 1,
},

overlay: {
  zIndex: 2,
  width: '100%',
  paddingHorizontal: 30,
  justifyContent: 'center',
},

});
