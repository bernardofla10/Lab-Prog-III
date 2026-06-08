// - Crie um aplicativo que apresente uma lista de usuários
// utilizando uma FlatList
// - Cada item da lista deve conter uma imagem, nome e email,
// como no exemplo ao lado
// - As informações dos usuários podem ser estáticas e
// definidas anteriormente em uma variável

import {
  FlatList, // renderiza listas de forma eficiente.
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
// como há apenas 1 tela no app, não é necessário implementar navegação.

const users = [
  { id: '1', name: 'Ricardo Franco', email: 'ricardo.franco@ime.eb.br', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: '2', name: 'George Bluth', email: 'george.bluth@reqres.in', image: 'https://reqres.in/img/faces/1-image.jpg' },
  { id: '3', name: 'Janet Weaver', email: 'janet.weaver@reqres.in', image: 'https://reqres.in/img/faces/2-image.jpg' },
  { id: '4', name: 'Emma Wong', email: 'emma.wong@reqres.in', image: 'https://reqres.in/img/faces/3-image.jpg' },
  { id: '5', name: 'Eve Holt', email: 'eve.holt@reqres.in', image: 'https://reqres.in/img/faces/4-image.jpg' },
  { id: '6', name: 'Charles Morris', email: 'charles.morris@reqres.in', image: 'https://reqres.in/img/faces/5-image.jpg' },
];

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

// 1. Cabeçalho isolado conforme o padrão do material
function ListHeader() { // cria um componente separado para o cabeçalho da lista.
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Lista de Usuários</Text>
    </View>
  );
}

// 2. Separador isolado para substituir a margem manual
function ItemSeparator() { // cria o separador entre itens. Espaçamento fica centralizado em ItemSeparatorComponent.
  return <View style={styles.separator} />;
}

export default function App() { // componente principal do app.
  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList // cria a lista otimizada.
        data={users} // define a fonte de dados da lista.
        renderItem={({ item }) => <UserItem user={item} />} // define como cada item será renderizado
        keyExtractor={(item) => item.id} // define a chave única de cada item, ajuda o React a identificar cada linha da lista.
        ListHeaderComponent={ListHeader} // Injeção obrigatória do cabeçalho
        ItemSeparatorComponent={ItemSeparator} // Injeção obrigatória do separador
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
    height: 8, // O gerenciamento do espaço agora é controlado unicamente aqui
  },
  avatar: {
    width: 56,
    height: 56,
    marginRight: 12,
    borderRadius: 28, // Adicionado para acabamento de avatar (opcional, mas padrão em UIs mobile)
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