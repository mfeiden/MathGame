//global variables
var answer;
var timer;
var score = 0;
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

//end game
var endGame = function() {
  $('#end').removeClass("invisible");
  $('#Q').text('');
  $('#A').val('');
  $('#new').click(function() {
    $('#intro').css("display", "");
    $('#play').addClass("invisible");
    $('#end').addClass("invisible");
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

//start the game
var startGame = function() {
  $('#score span').text(0);
  $('#timer span').text(10);
  $('#intro').css("display", "none")
  $('#play').removeClass("invisible");
  $('#A').focus();
  generateQ();
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
  
