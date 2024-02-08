

const questions = [
    {
      question: "What is the capital of France?",
      answers: [
        { text: "Paris", correct: true },
        { text: "Berlin", correct: false },
        { text: "Madrid", correct: false },
        { text: "Rome", correct: false }
      ],
      score: 3
    },
    {
      question: "Which planet is known as the Red Planet?",
      answers: [
        { text: "Earth", correct: false },
        { text: "Mars", correct: true },
        { text: "Jupiter", correct: false },
        { text: "Venus", correct: false }
      ],
      score: 3
    },
    // Add more questions as needed
  ];
  
  let currentQuestionIndex = 0;
  
  const quizContainer = document.getElementById("quiz-container");
  const questionContainer = document.getElementById("question-container");
  const answerButtonsContainer = document.getElementById("answer-buttons");
  const nextButton = document.getElementById("next-button");
  
  function startQuiz() {
    currentQuestionIndex = 0;
    totalScore = 0;  // Set the initial value to 0 or any other value you want
    nextButton.classList.add("hide");
    showQuestion(questions[currentQuestionIndex]);
  }
  
  function showQuestion(question) {
    questionContainer.innerText = question.question;
    answerButtonsContainer.innerHTML = "";
  
    question.answers.forEach(answer => {
      const button = document.createElement("button");
      button.innerText = answer.text;
      button.classList.add("btn");
      button.addEventListener("click", () => selectAnswer(answer));
      answerButtonsContainer.appendChild(button);
    });
  }
  
  let totalScore = 0;

function selectAnswer(answer) {
  const correct = answer.correct;
  if (correct) {
    totalScore += questions[currentQuestionIndex].score;
  }

  if (currentQuestionIndex < questions.length - 1) {
    nextButton.classList.remove("hide");
  } else {
    alert("Quiz completed! Your total score: " + totalScore);
  }
}

  
  function nextQuestion() {
    currentQuestionIndex++;
    showQuestion(questions[currentQuestionIndex]);
    nextButton.classList.add("hide");
  }
  
  startQuiz();
  