// define o formato de um usuário
export interface Usuario {
    id: number | null;
    nome: string;
    email: string;
}
// export expõe o contrato para o sistema de módulos, permitindo sua importação externa.