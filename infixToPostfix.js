const { reduce, keys } = require("@laufire/utils/collection");
const priorities = {
  '+': 0,
  '-': 0,
  '*': 1,
  '/': 1,
}
const operators = keys(priorities)

const pushToStack = ({ stack, char, ...rest }) => ({ ...rest, stack: [...stack, char] })

const popAOperatorToResult = ({ stack, result, char }) => {
  const topOfStack = stack[stack.length - 1];

  return priorities[char] <= priorities[topOfStack]
    ? popAOperatorToResult({ result: [...result, topOfStack], stack: stack.slice(0, -1), char })
    : pushToStack({ stack, result, char })
}

const handleOperator = ({ stack, result, char }) =>
  (stack.length === 0 || priorities[char] > priorities[stack[stack.length - 1]])
    ? pushToStack({ stack, result, char })
    : popAOperatorToResult({ stack, result, char });

const operandToResult = ({ result, char, ...rest }) => ({ ...rest, result: [...result, char] });

const moveToResult = ({ stack, result, char }) => ({ result: [...result, char, ...stack.reverse()] })

const infixToPostfix = (collection) =>
  reduce(
    collection, 
    (acc, char, i) => i+1 === collection.length
      ? moveToResult({ ...acc, char })
      : operators.includes(char)
        ? handleOperator({ ...acc, char })
        : operandToResult({ ...acc, char })

    , { stack: [], result: [] }
  ).result;

module.exports = infixToPostfix;
