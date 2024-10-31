const questions = [
    {
        question: "1. Qual dos seguintes é um tipo de dado primitivo em JavaScript?",
        options: {
            a: "String",
            b: "Array",
            c: "Object",
            d: "Function"
        },
        answer: "a"
    },
    {
        question: "2. O que o comando 'console.log()' faz?",
        options: {
            a: "Exibe uma mensagem no console",
            b: "Cria um alerta",
            c: "Exibe uma mensagem na página",
            d: "Nada"
        },
        answer: "a"
    },
    {
        question: "3. Qual é o método correto para adicionar um item ao final de um array?",
        options: {
            a: "add()",
            b: "push()",
            c: "append()",
            d: "insert()"
        },
        answer: "b"
    },
    {
        question: "4. O que é 'hoisting' em JavaScript?",
        options: {
            a: "Movimento de funções para o topo",
            b: "Declaração de variáveis",
            c: "Uso de funções",
            d: "Manipulação do DOM"
        },
        answer: "a"
    },
    {
        question: "5. Como você cria uma função em JavaScript?",
        options: {
            a: "function myFunction()",
            b: "create myFunction()",
            c: "myFunction(){}",
            d: "func myFunction()"
        },
        answer: "a"
    },
    {
        question: "6. Qual operador é usado para comparar valores em JavaScript?",
        options: {
            a: "==",
            b: "=",
            c: "===",
            d: "!="
        },
        answer: "a"
    },
    {
        question: "7. Qual é a forma correta de declarar uma variável?",
        options: {
            a: "var myVar",
            b: "variable myVar",
            c: "myVar = variable",
            d: "let myVar"
        },
        answer: "d"
    },
    {
        question: "8. Qual método é usado para transformar uma string em um número?",
        options: {
            a: "parseInt()",
            b: "toNumber()",
            c: "Number()",
            d: "convert()"
        },
        answer: "c"
    },
    {
        question: "9. O que é um objeto em JavaScript?",
        options: {
            a: "Uma coleção de dados",
            b: "Um tipo de dado primitivo",
            c: "Uma função",
            d: "Um método"
        },
        answer: "a"
    },
    {
        question: "10. Como você pode adicionar um evento a um elemento?",
        options: {
            a: "element.addEventListener()",
            b: "addEvent(element)",
            c: "element.onEvent()",
            d: "element.addEvent()"
        },
        answer: "a"
    }
];

let currentQuestion = 0;
let userAnswers = [];

function loadQuestion() {
    if (currentQuestion < questions.length) {
        const quizContainer = document.getElementById('quiz');
        const question = questions[currentQuestion];

        quizContainer.innerHTML = `
            <h2>${question.question}</h2>
            <ul>
                ${Object.keys(question.options).map(option => `
                    <li>
                        <input type="radio" name="answer" id="${option}" value="${option}">
                        <label for="${option}">${option.toUpperCase()}: ${question.options[option]}</label>
                    </li>`).join('')}
            </ul>
        `;

        document.getElementById('nextBtn').style.display = 'inline-block';
        document.getElementById('submitBtn').style.display = 'none';
    } else {
        displayResult();
    }
}

function displayResult() {
    const resultContainer = document.getElementById('result');
    resultContainer.style.display = 'block';

    let correctAnswers = 0;
    let resultHtml = '<h2>Resultados:</h2><table>';
    resultHtml += '<tr><th>Gabarito do Usuário</th><th>Gabarito Correto</th></tr>';
    questions.forEach((question, index) => {
        const userAnswer = userAnswers[index] || 'Nenhuma resposta';
        const correctAnswer = question.answer;

        if (userAnswer === correctAnswer) {
            correctAnswers++;
            resultHtml += `<tr><td class="correct-answer">${userAnswer.toUpperCase()}</td><td class="correct-answer">${correctAnswer.toUpperCase()}</td></tr>`;
        } else {
            resultHtml += `<tr><td class="incorrect-answer">${userAnswer.toUpperCase()}</td><td class="correct-answer">${correctAnswer.toUpperCase()}</td></tr>`;
        }
    });
    resultHtml += '</table>';
    
    const percentage = (correctAnswers / questions.length) * 100;
    resultHtml += `<h3>Você acertou ${correctAnswers} de ${questions.length} perguntas.</h3><h3>Percentual de acerto: ${percentage.toFixed(2)}%</h3>`;
    resultContainer.innerHTML = resultHtml;
}

document.getElementById('nextBtn').addEventListener('click', () => {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
        userAnswers.push(selectedOption.value);
        currentQuestion++;
        loadQuestion();
    }
});

document.getElementById('submitBtn').addEventListener('click', () => {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
        userAnswers.push(selectedOption.value);
        displayResult();
    }
});

// Iniciar o quiz
loadQuestion();
