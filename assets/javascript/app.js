// Questions and answers Array
var questions = [
  {
    question: "In Alfred Hitchcock's Strangers on a Train, what sport does Farley Granger excel in?",
    answers: [
      { answer: "Golf", value: false },
      { answer: "Tennis", value: true },
      { answer: "Baseball", value: false },
      { answer: "Basketball", value: false }
    ]
  },
  {
    question: "In Hitchcock's Frenzy, what was the murder weapon used?",
    answers: [
      { answer: "Spatula", value: false },
      { answer: "Knife", value: false },
      { answer: "Neck tie", value: true },
      { answer: "Ice pick", value: false }
    ]
  },
  {
    question: "What was the name of the character in Psycho played by Anthony Perkins?",
    answers: [
      { answer: "Norman Bates", value: true },
      { answer: "Bate Norman", value: false },
      { answer: "John Bates", value: false },
      { answer: "Bates Johnson", value: false }
    ]
  },
  {
    question: "Bodega Bay was the location for which Hitchcock movie?",
    answers: [
      { answer: "The Birds", value: true },
      { answer: "Vertigo", value: false },
      { answer: "Strangers on a Train", value: false },
      { answer: "The Trouble with Harry", value: false }
    ]
  },
  {
    question: "In which Hitchcock movie does a glass of milk figure in a key scene?",
    answers: [
      { answer: "Psycho", value: false },
      { answer: "Suspicion", value: true },
      { answer: "North by Northwest", value: false },
      { answer: "Torn Curtain", value: false }
    ]
  },
  {
    question: "What is the name of Maxim de Winter's house in the Hitchcock movie Rebecca?",
    answers: [
      { answer: "Grove Hill", value: false },
      { answer: "The Grassy Knoll", value: false },
      { answer: "Lancaster", value: false },
      { answer: "Manderley", value: true }
    ]
  },
  {
    question: "The climax to Hitchcock's 'The Man Who Knew Too Much' (1956) took place in what concert arena?",
    answers: [
      { answer: "Albert Hall", value: true },
      { answer: "Kennedy Center for Performing Arts", value: false },
      { answer: "Carnegie Hall", value: false },
      { answer: "Walt Disney Concert Hall", value: false }
    ]
  },
  {
    question: "Which Hitchcock movie has a man fall from the Statue of Liberty?",
    answers: [
      { answer: "Marnie", value: false },
      { answer: "Rear Window", value: false },
      { answer: "Saboteur", value: true },
      { answer: "Notorious", value: false }
    ]
  },
  {
    question: "What was the name of the actress who met Norman Bates in the 1998 remake of Psycho?",
    answers: [
      { answer: "Gwyneth Paltrow", value: false },
      { answer: "Julianne Moore", value: true },
      { answer: "Meryl Streep", value: false },
      { answer: "Michelle Pfeiffer", value: false }
    ]
  }
];

// Global variables
var clickState = false;
var counter = 0;
var clock;
var timer = 15;
var correctCounter = 0;
var incorrectCounter = 0;
var unansweredCounter = 0;

$(document).ready(function() {
  // Start the game when that start button is clicked
  $(".questions-page").css("visibility", "hidden");
  $(".final-page").css("display", "none");

  $(".start-btn").on("click", function(event) {
    event.preventDefault();
    startGame();
    // $(".answers").css("visibility", "visible");
  });

    $(document).on("click", ".answer", function (event) {
      // console.log(this);
      chosenAnswer = $(this).text();
      var answerCounter = questions[counter].answers;

      for (var i = 0; i < answerCounter.length; i++) {
        if (chosenAnswer === answerCounter[i].answer && answerCounter[i].value === true) {
          clearInterval(clock);
          var right = $(this).attr("class", "right-answer answer");
          rightAnswer();
        } else if (chosenAnswer === answerCounter[i].answer && answerCounter[i].value === false) {
          clearInterval(clock);
          $(this).attr("class", "wrong-answer answer");
          wrongAnswer();
        }
      }
    });

  $(".reset-button").on("click", function(event) {
    event.preventDefault();
    resetGame();
  });
});

// Start the game
function startGame() {
  $(".right").html("<p>Right answers: " + correctCounter + "</p><br>");
  $(".wrong").html("<p>Wrong answers: " + incorrectCounter + "</p><br>");

  $(".start-page").css("display", "none");
  $(".questions-page").css("display", "initial");
  $(".questions-page").css("visibility", "visible");
  $(".timer").html("<p>Time remaining: <span class='time'>15</span></p>");

  $(".question").text(questions[counter].question);

  var showingAnswers =
    "<p class='answer'>" +
    questions[counter].answers[0].answer +
    "</p><p class='answer'>" +
    questions[counter].answers[1].answer +
    "</p><p class='answer'>" +
    questions[counter].answers[2].answer +
    "</p><p class='answer'>" +
    questions[counter].answers[3].answer +
    "</p>";

  $(".answers").html(showingAnswers);

  timerHolder();
}

function rightAnswer() {
  correctCounter++;
  $(".time").html(timer);
  $(".right").html("<p>Right answers: " + correctCounter + "</p><br>");
  setTimeout(questionCounter, 2000);
}

function wrongAnswer() {
  incorrectCounter++;
  $(".time").html(timer);
  $(".wrong").html("<p>Wrong answers: " + incorrectCounter + "</p>");
  setTimeout(questionCounter, 2000);
}

function unanswered() {
  unanswered++;
  $(".questions-page").append("<p class='times-up'>Time's up!</p>");
  $(".right-answer").css("background-color", "green");
  $(".times-up")
    .delay(2000)
    .fadeOut(400);
  setTimeout(questionCounter, 2000);
}

function questionCounter() {
  if (counter < (questions.length - 1)) {
    counter++;
    startGame();
    timer = 15;
    timerHolder();
  } else {
    finishGame();
  }
}

// Timer function
function timerHolder() {
  clearInterval(clock);
  clock = setInterval(seconds, 1000);
  function seconds() {
    if (timer === 0) {
      clearInterval(clock);
      unanswered();
    } else if (timer > 0) {
      timer--;
    }
    $(".time").html(timer);
  }
}

// Finishing the game
function finishGame() {
  $(".questions-page").css("display", "none");
  $(".final-page").css("display", "initial");

  // var final = $(".final-page").append("<p>Here is your score.<p><br><br>" + 
  //   "<p>Correct Answers: " + correctCounter + "</p><br>" + "<p>Wrong Answers: " + incorrectCounter + "</p>");
  // $(final).attr("<div>");
  // $(final).attr("class", "final");
  // $(".final").append("<p><a class='btn btn-primary btn-lg reset-button' href='#'>Restart Game</a></p>");

  var final = $(".results").html("<p><h1>Here is your score.</h1></p><br><br>" + 
    "<p>Correct Answers: " + correctCounter + "</p><br>" + "<p>Wrong Answers: " + incorrectCounter + "</p>");
  
}

// Reset the game
function resetGame() {
  counter = 0;
  correctCounter = 0;
  incorrectCounter = 0;
  unansweredCounter = 0;
  timer = 15;

  $(".final-page").css("display", "none");

  event.preventDefault();
  startGame();
  timerHolder();
}