### 1. Propósitos e Casos de Uso do `expo-sqlite`

O material define o SQLite no ecossistema Expo como uma solução de banco de dados relacional embutida que oferece as seguintes propriedades técnicas:

* **Estruturação Local:** Organiza os dados da aplicação diretamente no armazenamento interno do dispositivo móvel utilizando a linguagem SQL padrão.
* **Leveza Operacional:** Consiste em um mecanismo nativo de baixo consumo de recursos hardware, dispensando a necessidade de um processo de servidor de banco de dados separado.
* **Resiliência Offline:** Apresenta-se como a arquitetura ideal para assegurar a execução de tarefas e a manutenção das funcionalidades do aplicativo quando não há conectividade com a internet.
* **Camada de Otimização e Cache:** Atua diretamente como um cache de dados local para informações originadas do servidor remoto, blindando o dispositivo contra chamadas repetidas e desnecessárias à API externa, o que economiza processamento e consumo de banda de rede.

---

### 2. Instalação e Restrição de Plataforma

O processo de acoplamento da biblioteca ao projeto Expo é efetuado por meio do comando executado no terminal:

```bash
$ npx expo install expo-sqlite

```

A matriz oficial de compatibilidade fornecida nos slides impõe uma restrição explícita de ambiente:

* **Plataformas Suportadas:** Dispositivos físicos Android (*Android Device*), Emuladores Android (*Android Emulator*), Dispositivos físicos iOS (*iOS Device*) e Simuladores iOS (*iOS Simulator*).
* **Plataformas Não Suportadas:** Ambiente Web (*Web*), o qual recebe uma marcação "X" de incompatibilidade direta no material.

---

### 3. Gerenciamento de Conexão com o Banco de Dados

A inicialização do arquivo físico de banco de dados utiliza chamadas assíncronas assentes na nova especificação da API do Expo. O material documenta a criação da função de abertura da seguinte forma:

```javascript
async function openDb() {
  return await SQLite.openDatabaseAsync('db_teste')
}

```

* **Comportamento do Método `openDatabaseAsync`:** Esta função é encarregada de verificar a existência prévia do arquivo identificado pela string passada por parâmetro (neste caso, `'db_teste'`). Caso o banco de dados não exista no armazenamento do app, o método realiza a criação automática do arquivo, abrindo e retornando uma Promise com a instância de conexão ativa para manipulação.

---

### 4. Execução de Instruções e Manipulação do Esquema (DDL)

Para executar comandos SQL imperativos que não retornam conjuntos de linhas (como a criação, alteração ou exclusão de tabelas), a API expõe o método assíncrono **`runAsync`**. O slide 101 detalha a criação do esquema de persistência:

```javascript
async function createTable() {
  try {
    const db = await openDb()
    await db.runAsync(`CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, phone TEXT);`)
  } catch (error) {
    console.log('Erro em createTable:', error)
  }
}

```

* **Mecânica do `runAsync`:** O método intercepta a string de comando contendo a instrução SQL estruturada e a submete diretamente à engine local do SQLite. A estrutura lógica faz uso obrigatório de blocos `try/catch` para capturar de forma segura falhas de sintaxe SQL ou violações de integridade.

---

### 5. Inserção Baseada em Parâmetros de Segurança

O material aborda o povoamento de tabelas demonstrando uma rotina de alimentação baseada em um array bidimensional de strings contendo dados fictícios (`fakeContacts`):

```javascript
async function insertFakeData() {
  const fakeContacts = [
    ['João Silva', '1111-1111'],
    ['Maria Souza', '2222-2222'], ...
  ]
  try {
    const db = await openDb()
    for (const [name, phone] of fakeContacts) {
      await db.runAsync(`INSERT INTO contacts (name, phone) VALUES (?, ?)`, [name, phone])
    }
  } catch (error) {
    console.log('Erro em insertFakeData:', error)
  }
}

```

* **Prevenção contra Vulnerabilidades:** A sintaxe adotada emprega interrogações (`?, ?`) como marcadores de posição (*placeholders*) na string SQL. Os valores reais contidos nas variáveis de iteração `[name, phone]` são repassados de forma isolada em uma matriz como o segundo argumento do método `runAsync`. Esse padrão arquitetural é mandatário para neutralizar brechas de segurança por injeção de SQL (*SQL Injection*) e garantir a sanitização correta dos dados em tempo de execução.

---

### 6. Recuperação de Registros (DML)

Para efetuar a leitura e a extração de dados tabulares persistidos, a API disponibiliza o método assíncrono **`getAllAsync`**. A função mapeada na página 103 padroniza a busca global:

```javascript
async function listAll() {
  try {
    const db = await openDb()
    const result = await db.getAllAsync(`SELECT * FROM contacts`)
    return result
  } catch (error) {
    console.log('Erro em listAll:', error)
    return []
  }
}

```

* **Comportamento do `getAllAsync`:** O método dispara a consulta e retorna uma Promise que, ao ser resolvida, entrega um array completo contendo objetos JavaScript, onde cada objeto representa uma linha recuperada da tabela, com propriedades correspondentes aos nomes das colunas mapeadas (`id`, `name`, `phone`). Se houver falha na requisição local, o bloco de captura limpa o fluxo retornando uma matriz vazia `[]`.

---

### 7. Sequência Metodológica dos Exercícios Práticos (CRUD Completo)

As páginas de 104 a 107 encerram o módulo propondo três exercícios cumulativos voltados à construção de um fluxo CRUD operacional completo com múltiplas telas:

* **Exercício 1 (Página 105 - Infraestrutura Base):** O estudante deve projetar uma interface gráfica contendo um painel de exibição de texto para listagem e uma grade de 4 botões executivos. Os botões devem invocar de forma isolada as funções do ciclo de persistência: acionar a abertura/criação do arquivo de banco de dados, disparar o comando DDL de criação da tabela de contatos, rodar o laço iterativo de inserção de registros fictícios e executar a instrução SQL de deleção/limpeza total dos dados contidos na tabela.
* **Exercício 2 (Página 106 - Tela de Cadastro e Inserção Dinâmica):** Expansão do fluxo de entrada de dados. O botão manual de dados fixos deve ser refatorado para interagir com o módulo de navegação do aplicativo. Ao ser pressionado, ele deve abrir uma nova tela de formulário equipada com dois componentes `<TextInput>` (`nome` e `telefone`) e um botão "Salvar". Ao disparar o salvamento, o app insere as strings capturadas do estado do formulário na tabela via SQLite e executa imediatamente um comando `navigation.goBack()`, forçando a tela principal a ler novamente o banco e atualizar a `FlatList` em tempo real com o novo contato inserido.
* **Exercício 3 (Página 107 - Edição, Atualização e Deleção por Item):** Finalização das operações CRUD. A lista de contatos da tela principal deve interceptar o clique individual em um card. O app deve navegar para a tela de formulário passando o objeto do contato como parâmetro de rota. A tela de destino deve carregar os campos com os dados existentes e permitir que o usuário execute: ou a atualização dos dados (disparando um comando SQL `UPDATE` via `runAsync`) ou a exclusão definitiva daquele registro específico através de um botão destacado em vermelho (disparando um comando SQL `DELETE WHERE id = ?`). Em ambos os cenários de sucesso, a tela é desempilhada retornando o foco e a atualização visual para a listagem inicial.