var generateQ = function() {
  // variables
  var max = parseInt($('input:radio[name=max]:checked').val(), 10);
  var num1 = Math.floor(Math.random() * max) + 1;
  var num2 = Math.floor(Math.random() * max) + 1;
  var op = $('input:radio[name=ops]:checked').val();
  var opArrB = ['+', '-'];
  var opArrC = ['+', '-', '*'];
  var operator;
  var question;
  var answer;
  // get operator
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
  // putting it all together...
  if (operator === '-' && num1 < num2) {
    question = num2 + ' - ' + num1;
    answer = num2 - num1;
  } else {
    question = num1 + ' ' + operator + ' ' + num2;
    switch (operator) {
      case '+':
        answer = num1 + num2;
        break;
      case '-':
        answer = num1 - num2;
        break;
      case '*':
        answer = num1 * num2;
    }
  }
   
  console.log(question, answer);
}

$(document).ready(function() {
  $('#ready').click(generateQ);
});
  
