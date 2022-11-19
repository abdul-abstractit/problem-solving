const { reduce, keys } = require("@laufire/utils/collection");
const priorities = {
  '+': 0,
  '-': 0,
  '*': 1,
  '/': 1,
}
const operators = keys(priorities)

const pushToStack = ({ stack, operator, ...rest }) => ({ ...rest, stack: [...stack, operator] })

const popAOperatorToResult = ({ stack, result, operator }) => {
  const topOfStack = stack[stack.length - 1];

  return priorities[operator] <= priorities[topOfStack]
    ? popAOperatorToResult({ result: [...result, topOfStack], stack: stack.slice(0, -1), operator })
    : pushToStack({ stack, result, operator })
}

const handleOperator = (context) => {
  const { stack, operator } = context;

  return (stack.length === 0 || priorities[operator] > priorities[stack[stack.length - 1]])
    ? pushToStack(context)
    : popAOperatorToResult(context);
};

const operandToResult = ({ result, operand, ...rest }) => ({ ...rest, result: [...result, operand] });

const moveToResult = ({ stack, result, token }) => ({ result: [...result, token, ...stack.reverse()] })

const infixToPostfix = (tokens) =>
  reduce(
    tokens,
    (acc, token, i) => i + 1 === tokens.length
      ? moveToResult({ ...acc, token })
      : operators.includes(token)
        ? handleOperator({ ...acc, operator: token })
        : operandToResult({ ...acc, operand: token }),
    { stack: [], result: [] }
  ).result;

module.exports = infixToPostfix;
