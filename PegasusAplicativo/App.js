import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; 

import Home from './src/pages/Home';
import Cadastro from './src/pages/Cadastro';
import Login from './src/pages/Login';
import Perfil from './src/pages/Perfil';
import Carrinho from './src/pages/Carrinho';
import Curtidas from './src/pages/Curtidas';
import ProductDetail from './src/pages/ProductDetail';
import Pesquisa from './src/pages/Pesquisa';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}> 
      <NavigationContainer>

        <Stack.Navigator initialRouteName="Home">

          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: "Home",
              headerStyle: { backgroundColor: "#edebeb" },
              headerTintColor: "#000",
              headerShown: false,
            }}
          />
        

       
          <Stack.Screen name="Cadastro" component={Cadastro}
            options={{
              title: "Cadastro",
              headerStyle: { backgroundColor: "#edebeb" },
              headerTintColor: "#000",
            }}
          />

          <Stack.Screen name="Pesquisa" component={Pesquisa}
            options={{
              title: "Pesquisa",
              headerStyle: { backgroundColor: "#edebeb" },
              headerTintColor: "#000",
            }}
          />

          <Stack.Screen name="Carrinho" component={Carrinho}
            options={{
              title: "Carrinho",
              headerStyle: { backgroundColor: "#edebeb" },
              headerTintColor: "#000",
            }}
          />

          <Stack.Screen name="Curtidas" component={Curtidas}
            options={{
              title: "Curtidas",
              headerStyle: { backgroundColor: "#edebeb" },
              headerTintColor: "#000",
            }}
          />

          <Stack.Screen name="Perfil" component={Perfil}
            options={{
              title: "Perfil",
              headerStyle: { backgroundColor: "#edebeb" },
              headerTintColor: "#000",
            }}
          />

          <Stack.Screen name="Login" component={Login} 
              options={{
              title: "Login",
              headerStyle: { backgroundColor: "#edebeb" },
              headerTintColor: "#000",
              
            }}
          />

                    <Stack.Screen name="ProductDetail" component={ProductDetail} 
              options={{
              title: "ProductDetail",
              headerStyle: { backgroundColor: "#edebeb" },
              headerTintColor: "#000",
              
            }}
          />
        
          </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
