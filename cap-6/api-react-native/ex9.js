// Crie a funcionalidade de, ao clicar em um item da lista do exercício anterior, o aplicativo leve para uma nova tela
// A nova tela apresenta as informações do usuário que foi clicado na lista anterior

import { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// ex8.js: não possui navegação, era apenas uma página. busca usuários da API e mostra em uma FlatList.
// ex9.js: possui navegação para uma tela de detalhes ao clicar em um usuário. mantém a busca da API e a FlatList, mas transforma cada item em clicável, adiciona navegação e cria uma tela Details.


const Stack = createNativeStackNavigator(); // cria o navegador em pilha usado para registrar as telas Home e Details.
const apiUrl = 'https://randomuser.me/api/?results=10';

function UserItem({ user, onPress }) { // componente UserItem recebe onPress pois executa uma ação ao ser clicado.
  return (
    <Pressable style={styles.userItem} onPress={onPress}> {/* adicionado Pressable para tornar cada item da lista clicável. */}
      <Image source={{ uri: user.image }} style={styles.avatar} />
      <View style={styles.userInfo}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>
    </Pressable>
  );
}

function ListHeader() {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Lista de Usuários</Text>
    </View>
  );
}

function ItemSeparator() {
  return <View style={styles.separator} />;
}

function HomeScreen({ navigation }) { // tela de Home. recebe navigation para poder navegar para tela de Details.
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((json) => {
        const apiUsers = json.results.map((item) => ({
          id: item.login.uuid,
          name: `${item.name.first} ${item.name.last}`,
          email: item.email,
          image: item.picture.thumbnail, // imagem pequena para a lista
          largeImage: item.picture.large, // imagem grande para a tela de detalhes
        }));

        setUsers(apiUsers);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={users}
        renderItem={({ item }) => ( // antes, cada item era apenas renderizado. agora, cada item recebe uma função onPress. Ao clicar, o app navega para tela Details.
          <UserItem
            user={item}
            onPress={() => navigation.navigate('Details', { user: item })}
          />
        )}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={ListHeader}
        ItemSeparatorComponent={ItemSeparator}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

function DetailsScreen({ route }) { // cria a tela de Details. 
  const { user } = route.params; // route.params contém os dados enviados pela navegação

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.detailsContainer}>
        <Image source={{ uri: user.largeImage }} style={styles.detailsImage} />
        <Text style={styles.detailsName}>{user.name}</Text>
        <Text style={styles.detailsEmail}>{user.email}</Text>
      </View>
    </SafeAreaView>
  );
}

export default function App() { // componente principal e responsável por configurar a navegação.
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContent: {
    padding: 16,
  },
  headerContainer: {
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111',
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#c8c9ee',
    borderRadius: 4,
  },
  separator: {
    height: 8,
  },
  avatar: {
    width: 56,
    height: 56,
    marginRight: 12,
    borderRadius: 28,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    marginBottom: 4,
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
  },
  email: {
    fontSize: 14,
    color: '#111',
  },
  detailsContainer: {
    flex: 1,
    padding: 24,
  },
  detailsImage: {
    width: 160,
    height: 160,
    marginBottom: 16,
  },
  detailsName: {
    marginBottom: 6,
    fontSize: 18,
    color: '#111',
  },
  detailsEmail: {
    fontSize: 16,
    color: '#111',
  },
});
