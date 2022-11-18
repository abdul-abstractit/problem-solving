const { reduce } = require("@laufire/utils/collection");
const infixToPostfix = require("./infixToPostfix");

const operations = {
  '+': (num1, num2) => num1 + num2,
  '-': (num1, num2) => num1 - num2,
  '*': (num1, num2) => num1 * num2,
  '/': (num1, num2) => num1 / num2,
}

const calculate = ({stack,input}) => {
  const second = stack.pop();
  const first = stack.pop();
  const result = operations[input](first,second)

  return {stack: [...stack,result],result}
}

const evaluate = (inputs) => {
  const standardInputs = infixToPostfix(inputs)
  return reduce(standardInputs, ({stack,result}, input) => {
    const isOperator = !!operations[input];
    return isOperator ? calculate({stack,result,input}) : { result, stack: [...stack, input] }
  }, { stack: [], result: 0 }).result
}

module.exports = evaluate;

/*
Evaluation rule of a Postfix Expression states:
While reading the expression from left to right, push the element in the stack if it is an operand. Pop the two operands from the stack, if the element is an operator and then evaluate it. Push back the result of the evaluation. Repeat it till the end of the expression.
*/

