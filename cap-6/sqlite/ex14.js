// Atualize o exercício anterior para editar e excluir contatos.

import { useCallback, useState } from 'react';
import {
  Button,
  FlatList,
  Pressable,
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

async function updateContact(id, name, phone) {
  const db = await openDb();

  await db.runAsync(
    'UPDATE contacts SET name = ?, phone = ? WHERE id = ?;',
    [name, phone, id]
  );
}

async function deleteContact(id) {
  const db = await openDb();
  await db.runAsync('DELETE FROM contacts WHERE id = ?;', [id]);
}

async function clearTable() {
  const db = await openDb();
  await db.runAsync('DELETE FROM contacts;');
}

async function listAll() {
  const db = await openDb();
  return await db.getAllAsync('SELECT * FROM contacts ORDER BY id;');
}

function ContactItem({ contact, onPress }) {
  return (
    <Pressable style={styles.contactCard} onPress={onPress}>
      <Text style={styles.contactName}>{contact.name}</Text>
      <Text style={styles.contactPhone}>{contact.phone}</Text>
    </Pressable>
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
          renderItem={({ item }) => (
            <ContactItem
              contact={item}
              onPress={() => navigation.navigate('Cadastro', { contact: item })}
            />
          )}
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

function ContactFormScreen({ route, navigation }) {
  const contact = route.params?.contact;
  const isEditing = Boolean(contact);
  const [name, setName] = useState(contact?.name ?? '');
  const [phone, setPhone] = useState(contact?.phone ?? '');
  const [message, setMessage] = useState('');

  async function handleSave() {
    if (!name.trim()) {
      setMessage('Informe o nome do contato.');
      return;
    }

    try {
      await createTable();

      if (isEditing) {
        await updateContact(contact.id, name.trim(), phone.trim());
      } else {
        await insertContact(name.trim(), phone.trim());
      }

      navigation.goBack();
    } catch (error) {
      console.log('Erro em handleSave:', error);
      setMessage('Erro ao salvar contato.');
    }
  }

  async function handleDelete() {
    try {
      await deleteContact(contact.id);
      navigation.goBack();
    } catch (error) {
      console.log('Erro em handleDelete:', error);
      setMessage('Erro ao excluir contato.');
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

        {isEditing && (
          <Pressable style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.deleteButtonText}>Excluir</Text>
          </Pressable>
        )}

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
        <Stack.Screen
          name="Cadastro"
          component={ContactFormScreen}
          options={({ route }) => ({
            title: route.params?.contact ? 'Editar Contato' : 'Cadastro',
          })}
        />
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
    marginTop: 8,
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
  deleteButton: {
    alignItems: 'center',
    marginTop: 12,
    padding: 12,
    borderRadius: 4,
    backgroundColor: '#f44336',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
});
