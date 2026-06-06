// define a lógica para criar um usuário
import { Usuario } from '../models/Usuario.js'; // importa a interface Usuario.
// import está como .js pois, depois de compilado, TypeScript vira JavaScript.

export const criarUsuario = (usuario: Usuario): Usuario => {
    if (usuario.id !== null) { // verifica se um usuário já tem um id.
        throw new Error("Exceção: O usuário fornecido já possui um ID definido.");
    } // evita criar novamente um usuário que já possui id.

    const idGerado: number = Math.floor(Math.random() * 10000) + 1; // gera um número aleatório entre 1 e 10000.

    return {
        id: idGerado, 
        nome: usuario.nome,
        email: usuario.email
    };
};