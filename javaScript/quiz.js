const questions = [
  {
    question: "מה עיר הבירה של צרפת?",
    answers: [
      { text: "פריז", correct: true },
      { text: "ברלין", correct: false },
      { text: "מוסקבה", correct: false },
      { text: "ניו יורק", correct: false }
    ],
    score: 3 
  },
  {
    question: "איזה מדינה לא נמצאת באירופה?",
    answers: [
      { text: "צרפת", correct: false },
      { text: "קנדה", correct: true },
      { text: "גרמניה", correct: false },
      { text: "יוון", correct: false }
    ],
    score: 5 
  }

];

let currentQuestionIndex = 0;
let totalScore = 0;
let timer; // Variable to store the countdown timer
let answered = false;
let totalElapsedTime = 0;
let questionsAnswered = 0;

const quizContainer = document.getElementById("quiz-container");
const questionContainer = document.getElementById("question-container");
const answerButtonsContainer = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");
const timerQuestion=5;

// quiz.js
// document.addEventListener("DOMContentLoaded", function () {

  // Add your quiz-related JavaScript code here
  // ...

  // Include timer content in the quiz

  // const timerContainer = document.getElementById("timer-content");
  // const timerFrame = document.createElement("iframe");
  // timerFrame.id ="timerFrameId"
  // timerFrame.src = "timer.html";
  // timerFrame.style.width = "100%";
  // timerFrame.style.height = "200px"; // Adjust the height as needed
  // timerFrame.style.border = "2px solid black";
  // // timerFrame.style.borderColor = "black";
  // timerContainer.appendChild(timerFrame);
  // const c = document.getElementById("timerFrameId");
  // console.log("immediately after teimeframe: " + c);
// });


function startQuiz() {
  currentQuestionIndex = 0;
  totalScore = 0;
  // nextButton.classList.add("hide");
  showQuestion(questions[currentQuestionIndex]);
  //  // Start the timer for the current question (set to 5 seconds)
  //  startTimer(timerQuestion, () => {
  //   // Call the timeOut function if the timer runs out
  //   timeOut();
  // });
}

function showQuestion(question) {
  questionContainer.innerText = question.question;
  answerButtonsContainer.innerHTML = "";
  answered = false;

  question.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");

    // Create radio buttons
    const radioBtn = document.createElement("input");
    radioBtn.type = "radio";
    radioBtn.name = `question-${currentQuestionIndex}`;
    radioBtn.value = index;

    button.appendChild(radioBtn);

    button.addEventListener("click", () => selectAnswer(answer));
    answerButtonsContainer.appendChild(button);
  });

  // Display the score for the current question
  const scoreContainer = document.getElementById("score-container");
  scoreContainer.innerText = "Score for this question: " + question.score;

   // Start the timer for the current question (set to 5 seconds)
   setTimeout(() => {
    startTimer(timerQuestion, () => {
      // Call the timeOut function if the timer runs out
      timeOut();
    });
  });

}

function selectAnswer(answer) {
  if (answered) {
    return; // Do nothing if the user has already answered
  }

  const correct = answer.correct;
  //console.log(correct)
  // Play sound based on correctness
  if (correct) {
    playAudio("../sound/applause.mp3",2); // Replace with your applause sound file
    totalScore += questions[currentQuestionIndex].score;
  } else {
    playAudio("disappointed.mp3",2); // Replace with your disappointed sound file
  }

  // Update the score on the page
  document.getElementById("current-score").innerText = totalScore;

  // Disable answer buttons
  const buttons = document.querySelectorAll("#answer-buttons button");
  buttons.forEach(button => {
    button.disabled = true;
  });

  answered = true;

  // Stop the timer when an answer is selected
  stopTimer();

  // Calculate the elapsed time for the current question
  const elapsedTime = timerQuestion - document.getElementById("timer").innerText;
  totalElapsedTime += elapsedTime;
  questionsAnswered++;

  if (currentQuestionIndex < questions.length - 1) {
    // Automatically move to the next question after a brief delay (e.g., 1 seconds)
    setTimeout(() => {
      nextQuestion();
    });
  } else {
    // Show results when the last question is answered
    setTimeout(() => {
      showResult();
    });
  }
}

function playAudio(audioFile, duration) {
  const audio = new Audio(audioFile);
  audio.play();
  
  // Stop audio playback after the specified duration
  setTimeout(() => {
    audio.pause();
  }, duration * 1000); // Convert seconds to milliseconds
}

function startTimer(seconds, timeout) {
  let timeRemaining = seconds;
  document.getElementById("timer").innerText = timeRemaining;

  timer = setInterval(() => {
    if (timeRemaining <= 0) {
      clearInterval(timer);
      timeout(); // Call the timeout callback function
    } else {
      document.getElementById("timer").innerText = timeRemaining;
      timeRemaining--;
    }
  }, 1000);
}


function stopTimer() {
  clearInterval(timer);
}

function timeOut() {
  // Increment questionsAnswered when the time runs out
  questionsAnswered++;
  // Handle when the time runs out (e.g., skip to the next question)
  nextQuestion();
}

function nextQuestion() {
  stopTimer(); // Stop the timer when moving to the next question
  console.log(currentQuestionIndex);
  currentQuestionIndex++;
  showQuestion(questions[currentQuestionIndex]);
  // nextButton.classList.add("hide");
}

function showResult() {
  // Display average time and total score at the end
  const averageTime = questionsAnswered > 0 ? totalElapsedTime / questionsAnswered : 0;

 
  let resultSummary = "<strong>Total Score:</strong> " + totalScore + "<br>" +
    "<strong>Average Time:</strong> " + averageTime.toFixed(2) + " seconds" +
    "<hr>";

    
  // Display questions with X or V indicating correctness
  questions.forEach((question, index) => {
    // Get the index of the selected answer for the current question
    const selectedAnswerIndex = document.querySelector(`input[name="question-${index}"]:checked`)?.value;

    // Check if the answer is correct
    const isCorrect = selectedAnswerIndex !== undefined && question.answers[selectedAnswerIndex].correct;//הבעיה במשתנהselectedAnswerIndex שהוא לא מוכר פה

    // console.log( "!== " + selectedAnswerIndex !== undefined);
    // console.log("correct " + question.answers[selectedAnswerIndex].correct);
    
    // Add question and X or V indicating correctness
    resultSummary += `<strong>Question ${index + 1}:</strong> ${question.question} `;
    resultSummary += isCorrect ? "<span style='color: green;'>✔ Correct</span>" : "<span style='color: red;'>✘ Incorrect</span>";
    resultSummary += "<br><hr>";
  });

  // Update the content of the result popup
  document.getElementById("result-content").innerHTML= resultSummary;
  
    // Show the result popup
    document.getElementById("result-popup").style.display = "block";
}
// Function to close the result popup
function closeResultPopup() {
  document.getElementById("result-popup").style.display = "none";
}

startQuiz();
