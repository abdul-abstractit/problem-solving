const { find, findIndex } = require("@laufire/utils/collection");

const operations = {
  '+': (num1, num2) => num1 + num2,
  '-': (num1, num2) => num1 - num2,
  '*': (num1, num2) => num1 * num2,
  '/': (num1, num2) => num1 / num2,
}

const action = (tokens,operator) => {
  const operatorIndex = findIndex(tokens, token => token === operator);
  const firstExpression = tokens.slice(0,operatorIndex)
  const secondExpression = tokens.slice(operatorIndex+1,tokens.length);

  return (operations[operator](evaluate(firstExpression),evaluate(secondExpression)))
}

const returnVal = (val) => val

const evaluate = (tokens) => tokens.length===1
  ?returnVal(...tokens)
  :find(tokens, token => token === '-')
    ? action(tokens,'-')
    :find(tokens, token => token === '+')
      ? action(tokens, '+')
      :find(tokens, token => token === '*')
        ? action(tokens, '*')
        : action(tokens, '/')

evaluate([2, "+", 8, "/", 3, "*", 2, "/", 4])

module.exports = evaluate;
