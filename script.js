const questions = [
    { 
        question: "Which of the following numbers fits into the next sequence? 8, 10, 9, 11, 10, ...",
        answers: [
            { text: "6", correct: false},
            { text: "8", correct: false},
            { text: "11", correct: false},
            { text: "12", correct: true},
        ]
    },
    {
        question: "Which of the following numbers fits into the next sequence? 0, -2, -2, -4, -6, ...",
        answers: [
            { text: "-4", correct: false},
            { text: "-6", correct: false},
            { text: "-8", correct: false},
            { text: "-10", correct: true},
        ]
    },
    {
        question: "Which of the following numbers fits into the next sequence? 2, 4, 12, 48, ...",
        answers: [
            { text: "120", correct: false},
            { text: "144", correct: false},
            { text: "240", correct: true},
            { text: "288", correct: false},
        ]
    },
    {
        question: "Which of the following numbers fits into the next sequence? 56, 60, 30, 34, 17, ...",
        answers: [
            { text: "28", correct: false},
            { text: "32", correct: false},
            { text: "13", correct: false},
            { text: "21", correct: true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    clearAnswerButtons();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1; 
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function clearAnswerButtons(){
    nextButton.style.display = "none";
    answerButtons.innerHTML = "";
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    
    // Check if the selected button has the correct attribute
    const isCorrect = selectedBtn.dataset.correct === "true";
    
    // Add CSS class based on correctness
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true; 
    });
    nextButton.style.display = "block";
}

function showScore(){
    clearAnswerButtons();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play again";
    nextButton.style.display = "block"; 
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else{
        startQuiz();
    }
})

startQuiz();