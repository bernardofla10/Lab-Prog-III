// Crie dois arquivos para simular o serviço de um sistema de usuários:
// - models/Usuario.ts: Declare uma interface Usuario com propriedades id, nome e email.
// - services/usuarioService.ts: Exporte uma função criarUsuario que receba um objeto 
// parcial de Usuario (com id igual a null) e retorne um objeto Usuario com um id gerado automaticamente.
// - Crie uma exceção caso o usuário passado já possua id.
// - Em um arquivo index.ts, importe e utilize a função criarUsuario, exibindo o resultado no console.

// usa models e services para executar o programa
import { Usuario } from './models/Usuario.js';
import { criarUsuario } from './services/usuarioService.js';

const usuarioEntrada: Usuario = {
    id: null,
    nome: "João da Silva",
    email: "joao.silva@dominio.com"
};

const usuarioProcessado: Usuario = criarUsuario(usuarioEntrada);

console.log(usuarioProcessado);