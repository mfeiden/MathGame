var generateQ = function(max) {
  var num1 = Math.floor(Math.random() * max) + 1;
  var num2 = Math.floor(Math.random() * max) + 1;
  var equation = num1 + ' + ' + num2;
  var solution = num1 + num2;
  console.log(equation, solution);
}

$(document).ready(generateQ(20));