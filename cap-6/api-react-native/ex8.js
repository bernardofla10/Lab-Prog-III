// Atualize o aplicativo da ex7.js para puxar os dados da API

import { useEffect, useState } from 'react'; // adicionado pois agora o app precisa de estado e efeito.
// useState: guarda a lista de usuários recebida da API.
// useEffect: executa o fetch uma vez quando o app abre.
import {
  FlatList, // renderiza listas de forma eficiente.
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const apiUrl = 'https://randomuser.me/api/?results=10';

// ex7.js: usuários eram estáticos. Lista users era fixa no código
// ex8.js: usuários vêm da API. Lista foi substituída pela URL da API e será carregada dinamicamente.

function UserItem({ user }) {
  return (
    <View style={styles.userItem}>
      <Image source={{ uri: user.image }} style={styles.avatar} />
      <View style={styles.userInfo}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>
    </View>
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

export default function App() {
  const [users, setUsers] = useState([]); // estado que guarda os usuários recebidos da API.

  // executar código quando o componente nasce. Sem useEffect, colocaríamos fetch direto dentro do App e ele rodaria a cada renderização, causando chamadas repetidas.
  useEffect(() => {
    fetch(apiUrl) // Faz a requisição para a API.
      .then((response) => response.json()) // Converte a resposta HTTP para JSON.
      .then((json) => { // Recebe o objeto JSON retornado pela API.
        const apiUsers = json.results.map((item) => ({ // Percorre os usuários retornados pela API e transforma cada um no formato usado pela interface.
          id: item.login.uuid,
          name: `${item.name.first} ${item.name.last}`,
          email: item.email,
          image: item.picture.thumbnail,
        }));

        setUsers(apiUsers); // Atualiza o estado users. Quando isso acontece, o React renderiza novamente a FlatList com os dados carregados.
      })
      .catch((error) => {
        console.error(error); // Captura erro de rede ou erro na requisição e mostra no console.
      });
  }, []); // array vazio: faz o useEffect executar o fetch apenas uma vez, quando o componente abre.

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={users} // mesma lógica do ex7.js, mas agora users vem do estado, não de uma lista fixa.
        renderItem={({ item }) => <UserItem user={item} />}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={ListHeader}
        ItemSeparatorComponent={ItemSeparator}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
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
});
