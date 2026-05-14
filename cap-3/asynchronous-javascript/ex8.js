// Crie uma função assíncrona chamada fetchPostsSequentially(postIds), que recebe uma lista de IDs e
// faz requisições a API para buscar o conteúdo dos posts.
// A função deve aguardar o resultado de um post antes de buscar o próximo.

const fetchPostsSequentially = async(postIds) => { // keyword async declara que a função é assíncrona -> permite o uso de await e retorna uma Promise.
    try{
        for(const id of postIds){ // loop tradicional para garantir a sequecialidade. Diferente do forEach, loop for em uma função async respeita as pausas do await.
            // Inicia a requisição e aguarda a resposta do servidor
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/`); // await pausa a execução da função e aguarda até que a Promise do fetch() seja resolvida.
            // impede que a próxima requisição seja enviada antes da atual terminar.

            // Verifica se a resposta foi bem sucedida (status 200-299)
            if(!response.ok){
                console.error(`Erro ao buscar post ${id}: &{response.status}`);
                continue; // Pula para o próximo ID em caso de erro
            }

            // Converte o corpo da resposta para JSON e aguarda a conclusão
            const post = await response.json();

            // Exibe os dados no console antes de prosseguir
            console.log(`Conteúdo do Post ${id}: `, post);
        }
    } catch(error){
        // Controle de erro centralizado
        console.error("Erro na operação sequencial: ", error);
    }
};

// Exemplo de uso:
fetchPostsSequentially([1,2,3]);