const { reduce } = require("@laufire/utils/collection");
const infixToPostfix = require("./infixToPostfix");

const operations = {
  '+': (num1, num2) => num1 + num2,
  '-': (num1, num2) => num1 - num2,
  '*': (num1, num2) => num1 * num2,
  '/': (num1, num2) => num1 / num2,
}

const calculate = ({ stack, input }) => {
  const second = stack.pop();
  const first = stack.pop();
  const result = operations[input](first, second)

  return { stack: [...stack, result] }
}
const pushToStack = ({stack,input}) => ({ stack: [...stack, input] })

const evaluatePostfix = ({ stack }, input) => !!operations[input] 
  ? calculate({ stack, input }) 
  : pushToStack({ stack, input })

const evaluate = (inputs) => parseInt(reduce(
  infixToPostfix(inputs), 
  evaluatePostfix, 
  { stack: [] }
).stack[0])


module.exports = evaluate;
