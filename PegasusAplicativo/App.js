import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; 

import Home from './src/pages/Home';
import Cadastro from './src/pages/Cadastro';
import Login from './src/pages/Login';

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
              headerStyle: { backgroundColor: "#4C9BE5" },
              headerTintColor: "#4C9BE5",
              headerShown: false,
            }}
          />
        

       
          <Stack.Screen
            name="Cadastro"
            component={Cadastro}
            options={{
              title: "Cadastro",
              headerStyle: { backgroundColor: "#4C9BE5" },
              headerTintColor: "#4C9BE5",
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: "Login",
              headerStyle: { backgroundColor: "#4C9BE5" },
              headerTintColor: "#4C9BE5",
              headerShown: false,
            }}
          />
        
          </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
