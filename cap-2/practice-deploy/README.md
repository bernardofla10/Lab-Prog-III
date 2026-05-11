# Prática Deploy - Grupo 02

## Contexto
Antes de fazer o deploy completo do projeto da disciplina no servidor, cada grupo deverá testar um cenário mínimo de publicação de uma aplicação web. Neste exercício, o **Grupo 02** deverá subir uma página `index.html` usando Apache dentro de um container Docker para validar o fluxo básico de deploy em um servidor remoto.

## Objetivo
Fazer uma página HTML simples ficar acessível externamente pelo IP do servidor usando Docker Compose, validando a conectividade, mapeamento de portas e volumes.

---

## Passo a Passo

### 1. Acesso ao servidor
O acesso será feito via SSH. Abra o seu terminal e execute o comando abaixo:

```bash
ssh grupo02@IP_DO_SERVIDOR
```

* **Usuário:** `grupo02`
* **Senha:** *(Utilize a senha informada pelo professor)*
* **IP:** *(Utilize o IP informado pelo professor)*

### 2. Credenciais e portas do grupo

Para este exercício, o Grupo 02 está restrito às seguintes definições técnicas:

* **Range permitido:** 8011 - 8020
* **Porta do exercício:** **8011**

### 3. Estrutura esperada

No servidor, crie a pasta específica para o exercício para organizar os arquivos:

```bash
mkdir grupo-02-apache
cd grupo-02-apache
```

A estrutura final dentro desta pasta deve ser:

```text
grupo-02-apache/
├── docker-compose.yml
└── index.html
```

### 4. Arquivo index.html

Crie o arquivo `index.html` utilizando um editor de texto (ex: `nano index.html`) e insira o seguinte conteúdo:

```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <title>Teste de Deploy - Grupo 02</title>
</head>
<body>
  <h1>Deploy funcionando - Grupo 02</h1>
  <p>Esta página está rodando em um container Apache no servidor remoto.</p>
</body>
</html>
```

### 5. Arquivo docker-compose.yml

Crie o arquivo `docker-compose.yml` (ex: `nano docker-compose.yml`). Este arquivo define a imagem do Apache, o mapeamento da porta **8011** e o volume para o HTML:

```yaml
services:
  apache:
    image: httpd:latest
    ports:
      - '8011:80'
    volumes:
      - './index.html:/usr/local/apache2/htdocs/index.html'
```

### 6. Subindo o container

Dentro da pasta `grupo-02-apache`, execute os comandos abaixo para gerenciar o container:

* **Subir em segundo plano:**
```bash
docker compose up -d
```


* **Verificar se está rodando:**
```bash
docker ps
```


* **Parar o container (se necessário):**
```bash
docker compose down
```



### 7. Problema ao subir containers no primeiro acesso

Se o comando `docker compose up` falhar, pode ser necessário reiniciar o daemon do Docker rootless do usuário:

```bash
pkill -f dockerd-rootless
dockerd-rootless.sh &
```

Após isso, tente subir o container novamente.

### 8. Acessando pelo navegador

Após confirmar que o container está em execução, acesse em sua máquina local:

`http://IP_DO_SERVIDOR:8011`

---

## O que deve ser verificado

Durante o exercício, certifique-se de validar os seguintes pontos:

1. A conexão SSH foi estabelecida com sucesso.
2. O Docker e Docker Compose estão disponíveis para o usuário `grupo02`.
3. A porta utilizada é exatamente a **8011**.
4. O container subiu com o status "Up".
5. O volume está apontando corretamente para o arquivo local `index.html`.
6. O acesso externo não está sendo bloqueado por firewall local ou de rede.

## Observação sobre Docker rootless

O servidor utiliza **Docker rootless**, o que significa que o serviço roda associado ao usuário Linux sem privilégios de root, garantindo segurança e segregação entre os grupos. Por ser um ambiente compartilhado, o uso estrito da porta **8011** é obrigatório para evitar conflitos com outros grupos.

## Resultado esperado

O exercício é considerado concluído quando a página personalizada do **Grupo 02** é carregada com sucesso no navegador via IP e porta do servidor.