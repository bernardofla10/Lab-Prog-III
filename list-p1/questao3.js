function buscarNomesUsuarios() {
  const url = 'https://jsonplaceholder.typicode.com/users';

  return fetch(url)
    .then((response) => response.json())
    .then((users) => {
      // Transforma o array de objetos em um array contendo apenas as strings dos nomes
      return users.map((user) => user.name);
    })
    .catch((error) => {
      console.error('Erro ao buscar os usuários:', error);
      throw error; // Propaga o erro para o escopo chamador
    });
}