// Atualize o exercício anterior para inserir contatos em uma nova tela.

import { useCallback, useState } from 'react';
import {
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SQLite from 'expo-sqlite';

const Stack = createNativeStackNavigator();
const databaseName = 'contacts_db';

async function openDb() {
  return await SQLite.openDatabaseAsync(databaseName);
}

async function createTable() {
  const db = await openDb();

  await db.runAsync(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      phone TEXT
    );
  `);
}

async function insertContact(name, phone) {
  const db = await openDb();

  await db.runAsync(
    'INSERT INTO contacts (name, phone) VALUES (?, ?);',
    [name, phone]
  );
}

async function clearTable() {
  const db = await openDb();
  await db.runAsync('DELETE FROM contacts;');
}

async function listAll() {
  const db = await openDb();
  return await db.getAllAsync('SELECT * FROM contacts ORDER BY id;');
}

function ContactItem({ contact }) {
  return (
    <View style={styles.contactCard}>
      <Text style={styles.contactName}>{contact.name}</Text>
      <Text style={styles.contactPhone}>{contact.phone}</Text>
    </View>
  );
}

function MainScreen({ navigation }) {
  const [contacts, setContacts] = useState([]);
  const [message, setMessage] = useState('');

  async function refreshContacts() {
    try {
      const result = await listAll();
      setContacts(result);
    } catch (error) {
      console.log('Erro em refreshContacts:', error);
      setContacts([]);
    }
  }

  useFocusEffect(
    useCallback(() => {
      refreshContacts();
    }, [])
  );

  async function handleCreateDatabase() {
    try {
      await openDb();
      setMessage('Banco criado/aberto com sucesso.');
    } catch (error) {
      console.log('Erro em handleCreateDatabase:', error);
      setMessage('Erro ao criar/abrir banco.');
    }
  }

  async function handleCreateTable() {
    try {
      await createTable();
      await refreshContacts();
      setMessage('Tabela criada com sucesso.');
    } catch (error) {
      console.log('Erro em handleCreateTable:', error);
      setMessage('Erro ao criar tabela.');
    }
  }

  async function handleClearTable() {
    try {
      await createTable();
      await clearTable();
      await refreshContacts();
      setMessage('Tabela limpa com sucesso.');
    } catch (error) {
      console.log('Erro em handleClearTable:', error);
      setMessage('Erro ao limpar tabela.');
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Contatos:</Text>

        <FlatList
          data={contacts}
          renderItem={({ item }) => <ContactItem contact={item} />}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.listContent}
        />

        <Text style={styles.message}>{message}</Text>

        <View style={styles.buttonGrid}>
          <View style={styles.buttonCell}>
            <Button title="Criar Banco" onPress={handleCreateDatabase} />
          </View>

          <View style={styles.buttonCell}>
            <Button title="Criar Tabela" onPress={handleCreateTable} />
          </View>

          <View style={styles.buttonCell}>
            <Button title="Inserir Dados" onPress={() => navigation.navigate('Cadastro')} />
          </View>

          <View style={styles.buttonCell}>
            <Button title="Limpar Tabela" onPress={handleClearTable} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

function CreateContactScreen({ navigation }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  async function handleSave() {
    if (!name.trim()) {
      setMessage('Informe o nome do contato.');
      return;
    }

    try {
      await createTable();
      await insertContact(name.trim(), phone.trim());
      navigation.goBack();
    } catch (error) {
      console.log('Erro em handleSave:', error);
      setMessage('Erro ao salvar contato.');
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          placeholderTextColor="#777"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Telefone"
          placeholderTextColor="#777"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />

        <View style={styles.saveButton}>
          <Button title="Salvar" onPress={handleSave} />
        </View>

        <Text style={styles.message}>{message}</Text>
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Contatos">
        <Stack.Screen name="Contatos" component={MainScreen} />
        <Stack.Screen name="Cadastro" component={CreateContactScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#eef3f2',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    marginBottom: 12,
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
  },
  listContent: {
    paddingBottom: 16,
  },
  contactCard: {
    marginBottom: 12,
    padding: 14,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2,
  },
  contactName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111',
  },
  contactPhone: {
    marginTop: 2,
    fontSize: 14,
    color: '#333',
  },
  message: {
    minHeight: 22,
    marginBottom: 8,
    textAlign: 'center',
    color: '#333',
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  buttonCell: {
    width: '48%',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  input: {
    height: 44,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#222',
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  saveButton: {
    marginTop: 4,
  },
});
