// Crie um app com duas telas: Cadastro e Detalhes
// Os dados do produto devem ser salvos no estado da tela de cadastro
// Após o cadastro, o app deve navegar para a tela de Detalhes, mostrando os dados
// Crie um componente ProductCard que receba os dados por props e exiba nome e preço
// Mostre abaixo do botão os dados do estado atual

import { useState } from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function ProductCard({ name, price }) { // componente que recebe os dados por props e exibe o produto.
  return (
    <View style={styles.productCard}>
      <Text style={styles.productText}>Produto: {name}</Text>
      <Text style={styles.productText}>Preço: R$ {price}</Text>
    </View>
  );
}

function Cadastro({ navigation }) {
  const [name, setName] = useState(''); // estado local para o nome do produto.
  const [price, setPrice] = useState(''); // estado local para o preço do produto.

  function handleRegister() {
    navigation.navigate('Detalhes', {
      name,
      price,
    });
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Nome do produto"
          placeholderTextColor="#aaa"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          keyboardType="decimal-pad"
          placeholder="Preço"
          placeholderTextColor="#aaa"
          value={price}
          onChangeText={setPrice}
        />

        <View style={styles.registerButton}>
          <Button title="CADASTRAR" onPress={handleRegister} />
        </View>

        <Text style={styles.stateText}>
          Estado atual: {JSON.stringify({ name, price })}
        </Text>
      </View>
    </SafeAreaView>
  );
}

function Detalhes({ route, navigation }) {
  const { name, price } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ProductCard name={name} price={price} />

        <View style={styles.backButton}>
          <Button title="VOLTAR" onPress={() => navigation.goBack()} />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Cadastro">
        <Stack.Screen name="Cadastro" component={Cadastro} options={{ title: 'Cadastro de Produto' }} />
        <Stack.Screen name="Detalhes" component={Detalhes} />
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
  input: {
    width: '90%',
    height: 42,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#222',
    paddingHorizontal: 10,
  },
  registerButton: {
    width: '70%',
    marginTop: 4,
  },
  stateText: {
    marginTop: 24,
    textAlign: 'center',
    color: '#222',
  },
  productCard: {
    minWidth: 180,
    marginBottom: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 4,
    backgroundColor: '#fafafa',
  },
  productText: {
    marginBottom: 8,
    color: '#222',
  },
  backButton: {
    width: 100,
  },
});
