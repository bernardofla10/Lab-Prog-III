// - Defina uma interface Post com as propriedades userId, id, title e body (todas obrigatórias, do tipo number ou string conforme for apropriado).
// - Crie uma função assíncrona obterPosts que deve fazer um fetch para a API, converter a resposta em JSON e retornar um array de Post.
// - Por fim, invoque obterPosts() e exiba no console o título do primeiro post retornado.

// API Endpoint: https://jsonplaceholder.typicode.com/posts

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

const obterPosts = async (): Promise<Post[]> => { // é async pois vai usar await dentro. Promise pois a função vai devolver, no futuro, um array de Post.
    const response = await fetch('https://jsonplaceholder.typicode.com/posts'); // await para esperar a requisição inteira terminar
    const data: Post[] = await response.json(); // converte a resposta da API para json, guarda em data e data deve ser um array de Post.
    return data;
};

const executar = async (): Promise<void> => { // async pois usa await. Promise pois a função promete devolver no futuro um void (console.log).
    const posts = await obterPosts(); // await para esperar todos os posts chegarem.
    console.log(posts[0].title); // mostra o título do primeiro post.
};

executar();