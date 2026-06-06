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

const obterPosts = async (): Promise<Post[]> => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data: Post[] = await response.json();
    return data;
};

const executar = async (): Promise<void> => {
    const posts = await obterPosts();
    console.log(posts[0].title);
};

executar();