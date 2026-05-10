// Você é responsável por um sistema educacional e precisa processar uma lista de alunos para identificar:
//  - Filtrar os alunos aprovados (nota final maior ou igual a 7).
//  - Transformar a lista para incluir apenas nome e notaFinal dos aprovados.
//  - Calcular a média geral das notas finais dos alunos.
// Crie uma função que use funções de ordem superior para retornar:
//  - Uma lista com os alunos aprovados e suas respectivas notas.
//  - A média geral das notas finais de todos os alunos.

var students = [
  { name: "Alice", grades: [8, 9, 7] },
  { name: "Bob", grades: [5, 6, 5] },
  { name: "Charlie", grades: [9, 8, 10] }
];

function processEducationalData(studentList){
    // Calcular a nota final de cada aluno
    const studentsWithAverage = studentList.map(student => {
        const sum = student.grades.reduce((acc,grade) => acc + grade,0);
        const finalGrade = sum / student.grades.length;
        return { name: student.name, finalGrade: finalGrade};
    });

    // Filtrar aprovados (>= 7) e formatar a lista
    const approvedStudents = studentsWithAverage.filter(s => s.finalGrade >= 7);

    // Calcular a média geral de todos os alunos
    const totalGradesSum = studentsWithAverage.reduce((acc, s) => acc + s.finalGrade, 0);
    const generalAverage = totalGradesSum / studentsWithAverage.length;

    // Retornar os dados em um único JSON
    return {
        approvedStudents: approvedStudents,
        generalAverage: generalAverage
    };
}

console.log(processEducationalData(students));