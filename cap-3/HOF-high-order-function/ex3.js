// Você precisa criar usernames para um sistema, convertendo os nomes dos usuários para letras
// minúsculas e substituindo espaços por underlines _.
// Escreva uma função, sem utilizar loops for, que receba um array de nomes completos e retorne um array
// com os usernames gerados.

var users = [
"Alice Johnson",
"Bob Marley",
"Charlie Brown",
"David Smith"
];

var usernames = users.map(user => user.toLowerCase().replaceAll(" ", "_"));
console.log(usernames);