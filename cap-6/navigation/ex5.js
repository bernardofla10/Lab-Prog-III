// Crie um app com duas telas: LoginScreen e HomeScreen
// Os dados devem ser salvos no estado da tela de login
// Após o login, o app deve navegar para a HomeScreen, exibindo os dados inseridos
// Crie um componente UserInfo que receba os dados por props
// Use uma <Text> abaixo do botão de login para mostrar o estado atual

import { useState } from 'react';
import {
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; // importa o componente que envolve toda a navegação do app.
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // importa a função que cria uma navegação em pilha, ou seja, uma tela empilhada sobre a outra (mobile).

const Stack = createNativeStackNavigator(); // cria o objeto Stack para registrar as telas do app.

const logoUri = 'https://reactnative.dev/img/tiny_logo.png'; // guarda a url da imagem usada na tela de login.

function UserInfo({ username, password }) { // componente que recebe os dados por props e exibe na HomeScreen.
  return (
    <View style={styles.userInfoContainer}>
      <Text style={styles.userInfoText}>Username: {username}</Text>
      <Text style={styles.userInfoText}>Password: {password}</Text>
    </View>
  );
}

function LoginScreen({ navigation }) { // cria a tela de login.
  const [username, setUsername] = useState(''); // estado local da tela de login. Cria o estado do username. username guarda o texto digitado, setUsername atualiza esse valor.
  const [password, setPassword] = useState(''); // estado local da tela de login. Cria o estado de senha.

  // const [] é array: useState('') retorna um array com duas posições [valorAtual, funcaoAtualizadora]. 
  // Ordem importa: const username = resultado[0]; const setUsername = resultado[1]; pega valores por posição.

  function handleLogin() { // função executada quando o LOGIN é pressionado.
    navigation.navigate('HomeScreen', { // Navega para a tela HomeScreen e envia username e password como parâmetros.
      username,
      password,
    });
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image source={{ uri: logoUri }} style={styles.logo} resizeMode="contain" />

        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#aaa"
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <View style={styles.loginButton}>
          <Button title="LOGIN" onPress={handleLogin} />
        </View>

        <Text style={styles.stateText}>state: {username}, {password}</Text>
      </View>
    </SafeAreaView>
  );
}

function HomeScreen({ route, navigation }) { // cria a tela iicial após o login. Props: route contém os parâmetros recebidos e navigation permite voltar.
  const { username, password } = route.params;
  
  // const {} é um objeto: route.params é um objeto { username: 'user123', password: 'pass123' }.
  // Ordem não importa: const username = route.params.username; const password = route.params.password; pega valores por nome da propriedade.

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <UserInfo username={username} password={password} />

        <View style={styles.exitButton}>
          <Button title="SAIR" onPress={() => navigation.goBack()} /> {/* botão que volta para a tela anterior. */}
        </View>
      </View>
    </SafeAreaView>
  );
}

export default function App() { // componente principal do app.
  return (
    <NavigationContainer> {/* envolve o sistema de navegação */}
      <Stack.Navigator initialRouteName="LoginScreen"> {/* cria o navegador em pilha. a primeira tela será LoginScreen. */}
        <Stack.Screen name="LoginScreen" component={LoginScreen} /> {/* registra a tela de login. */}
        <Stack.Screen name="HomeScreen" component={HomeScreen} /> {/* registra a tela inicial. */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 24,
  },
  input: {
    width: '80%',
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#222',
    paddingHorizontal: 10,
  },
  loginButton: {
    width: '80%',
    marginTop: 8,
  },
  stateText: {
    marginTop: 16,
    color: '#222',
  },
  userInfoContainer: {
    marginBottom: 16,
    gap: 16,
  },
  userInfoText: {
    textAlign: 'center',
    color: '#222',
  },
  exitButton: {
    width: 90,
  },
});
