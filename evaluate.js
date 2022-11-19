const { reduce } = require("@laufire/utils/collection");
const infixToPostfix = require("./infixToPostfix");

const operations = {
  '+': (num1, num2) => num1 + num2,
  '-': (num1, num2) => num1 - num2,
  '*': (num1, num2) => num1 * num2,
  '/': (num1, num2) => num1 / num2,
}

const doOperation = ({ operands:[second,first,...rest], token }) => 
  ({ operands: [operations[token](first, second), ...rest] })

const insertToOperands = ({operands, token}) => ({ operands: [token, ...operands] })

const evaluatePostfix = ({ operands }, token) => 
  !!operations[token] ? doOperation({ operands, token }) 
  : insertToOperands({ operands, token })

const evaluate = (tokens) => parseInt(reduce(
  infixToPostfix(tokens), 
  evaluatePostfix, 
  { operands: [] }
).operands[0])


module.exports = evaluate;
