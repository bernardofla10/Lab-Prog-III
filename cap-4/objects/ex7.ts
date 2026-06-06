// Crie dois tipos:
// - Sucesso (contendo um status: "ok" e dados: string[]).
// - Erro (contendo status: "erro" e mensagem: string).
// Em seguida, defina um novo tipo RespostaApi para conter as duas possibilidades anteriores.
// Crie uma função exibirResposta que receba esse tipo e exiba no console o conteúdo adequadamente.

type Sucesso = {
    status: "ok";
    dados: string[];
};

type Erro = {
    status: "erro";
    mensagem: string;
};

type RespostaApi = Sucesso | Erro;

const exibirResposta = (resposta: RespostaApi): void => {
    if (resposta.status === "ok") {
        console.log("Dados recebidos:", resposta.dados);
    } else {
        console.log("Erro na operação:", resposta.mensagem);
    }
};

// Exemplos de uso:
const respostaPositiva: RespostaApi = { status: "ok", dados: ["Item 1", "Item 2"] };
const respostaNegativa: RespostaApi = { status: "erro", mensagem: "Falha na conexão" };

exibirResposta(respostaPositiva);
exibirResposta(respostaNegativa);