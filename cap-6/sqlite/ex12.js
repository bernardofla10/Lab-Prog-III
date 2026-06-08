// Implemente a interface ao lado, contendo 4 botões, com as seguintes funcionalidades
// - Criação do banco de dados SQLite
// - Criação de uma nova tabela
// - Inserção de dados “falsos”
// - Deleção dos dados da tabela

import { useState } from 'react';
import {
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as SQLite from 'expo-sqlite'; // importa a biblioteca SQLite do Expo.

const databaseName = 'contacts_db'; // define o nome do banco de dados local.

const fakeContacts = [ // lista de contatos falsos.
  ['João Silva', '1111-1111'],
  ['Maria Souza', '2222-2222'],
  ['Carlos Lima', '3333-3333'],
  ['Ana Paula', '4444-4444'],
  ['Bruno Rocha', '5555-5555'],
];

async function openDb() { // abre o banco SQLite. Se não existir, o Expo cria automaticamente
  return await SQLite.openDatabaseAsync(databaseName);
}

async function createTable() { // cria a tabela.
  const db = await openDb(); // abre o banco antes de executar SQL.

  await db.runAsync(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      phone TEXT
    );
  `); // cria a tabela 'contacts' se ela não existir.
}

async function insertFakeData() { // insere dados falsos.
  const db = await openDb(); // abre o banco. 

  for (const [name, phone] of fakeContacts) { // percorre a lista de contatos falsos.
    await db.runAsync(
      'INSERT INTO contacts (name, phone) VALUES (?, ?);',
      [name, phone]
    ); // insere um contato na tabela. os '?' são placeholders, usados para passar valores com segurança.
  }
}

async function clearTable() { // limpa a tabela.
  const db = await openDb(); // abre o banco.
  await db.runAsync('DELETE FROM contacts;'); // apaga todos os registros da tabela 'contacts'.
}

async function listAll() { // lista todos os contatos.
  const db = await openDb(); // abre o banco.
  return await db.getAllAsync('SELECT * FROM contacts ORDER BY id;'); // busca todos os contatos ordenados por 'id'.
}

function ContactItem({ contact }) { // componente que renderiza um contato da lista.
  return (
    <View style={styles.contactCard}>
      <Text style={styles.contactName}>{contact.name}</Text>
      <Text style={styles.contactPhone}>{contact.phone}</Text>
    </View>
  );
}

export default function App() { // componente principal
  const [contacts, setContacts] = useState([]); // estado da lista de contatos.
  const [message, setMessage] = useState(''); // estado da mensagem de status.

  async function refreshContacts() { // recarrega os contatos do banco.
    try {
      const result = await listAll();
      setContacts(result);
    } catch (error) {
      console.log('Erro em refreshContacts:', error);
      setContacts([]);
    }
  }

  async function handleCreateDatabase() { // função chamada pelo botão 'Criar Banco'.
    try {
      await openDb();
      setMessage('Banco criado/aberto com sucesso.');
    } catch (error) {
      console.log('Erro em handleCreateDatabase:', error);
      setMessage('Erro ao criar/abrir banco.');
    }
  }

  async function handleCreateTable() { // função chamada pelo botão 'Criar Tabela'.
    try {
      await createTable();
      await refreshContacts();
      setMessage('Tabela criada com sucesso.');
    } catch (error) {
      console.log('Erro em handleCreateTable:', error);
      setMessage('Erro ao criar tabela.');
    }
  }

  async function handleInsertFakeData() { // função chamada pelo botão 'Inserir Dados'.
    try {
      await createTable();
      await insertFakeData();
      await refreshContacts();
      setMessage('Dados falsos inseridos com sucesso.');
    } catch (error) {
      console.log('Erro em handleInsertFakeData:', error);
      setMessage('Erro ao inserir dados.');
    }
  }

  async function handleClearTable() { // função chamada pelo botão 'Limpar Tabela'.
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

        <FlatList // renderiza os contatos.
          data={contacts}
          renderItem={({ item }) => <ContactItem contact={item} />}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.listContent}
        />

        <Text style={styles.message}>{message}</Text> {/* mostra a mensagem de status. */}

        <View style={styles.buttonGrid}>
          <View style={styles.buttonCell}>
            <Button title="Criar Banco" onPress={handleCreateDatabase} />
          </View>

          <View style={styles.buttonCell}>
            <Button title="Criar Tabela" onPress={handleCreateTable} />
          </View>

          <View style={styles.buttonCell}>
            <Button title="Inserir Dados" onPress={handleInsertFakeData} />
          </View>

          <View style={styles.buttonCell}>
            <Button title="Limpar Tabela" onPress={handleClearTable} />
          </View>
        </View>
      </View>
    </SafeAreaView>
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
});
