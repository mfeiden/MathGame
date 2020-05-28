//global variables
var answer;
var timer;
var score = 0;
var highScore = 0;
var timeRemaining = 10;

//generate questions+answers
var generateQ = function() {
  //variables
  var max = Number($('input:radio[name=max]:checked').val(), 10);
  var num1 = Math.floor(Math.random() * max) + 1;
  var num2 = Math.floor(Math.random() * max) + 1;
  var op = $('input:radio[name=ops]:checked').val();
  var opArrB = ['+', '-'];
  var opArrC = ['+', '-', 'x'];
  var operator;
  var question;
  //get operator
  switch (op) {
    case 'b':
      operator = opArrB[Math.floor(Math.random()*opArrB.length)];
      break;
    case 'c':
      operator = opArrC[Math.floor(Math.random()*opArrC.length)];
      break;
    default:
      operator = '+';
  }
  //putting it all together...
  if (operator === '-' && num1 < num2) {
    question = num2 + ' - ' + num1;
    answer = num2 - num1;
    //above precludes possibility of negative answer
  } else {
    question = num1 + ' ' + operator + ' ' + num2;
    switch (operator) {
      case '+':
        answer = num1 + num2;
        break;
      case '-':
        answer = num1 - num2;
        break;
      case 'x':
        answer = num1 * num2;
    } 
  };
  $('#Q').text(question);
};

//start game after selecting options
var startGame = function() {
  $('#score span').text(0);
  $('#timer span').text(10);
  $('#intro').addClass("d-none")
  $('#play').removeClass("d-none");
  $('#A').focus();
  generateQ();
};

//track high score
var highest = function() {
  highScore = score > highScore ? score : highScore;
  $('#high span').text(highScore);
};

//end game
var endGame = function() {
  $('#end').removeClass("d-none");
  $('#Q').text('');
  $('#A').val('');
  $('#A').blur();
  $('#timer').addClass("d-none");
  highest();
  $('#new').click(function() {
    $('#timer, #intro, #high').removeClass("d-none");
    $('#play, #end').addClass("d-none");
    $('#score').html('Current Score: <span class="text-success"></span>');
    score = 0;
    timeRemaining = 10;
  })
};

//timer
var updateTime = function (secs) {
  timeRemaining += secs;
  $('#timer span').text(timeRemaining);
  if (timeRemaining === 0) {
    clearInterval(timer);
    timer='';
    endGame();
  }
};

//compare user input to correct answer
var checkResponse = function() {
  if(Number($('#A').val()) === answer) {
    score += 1;
    $('#score span').text(score);
    updateTime(1);
    generateQ();
    $('#A').val('');
  }
};

//event listeners+handlers
$(document).ready(function() {  
  $('#start').click(startGame);
  $('#A').on('keyup', function() {
    if (!timer) {
      timer = setInterval (function() {
        updateTime(-1);
      }, 1000);
    }
  checkResponse();
  });
});
  
