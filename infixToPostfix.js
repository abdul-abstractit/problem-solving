const { reduce, keys } = require("@laufire/utils/collection");
const precedence = {
  '+': 0,
  '-': 0,
  '*': 1,
  '/': 1,
}
const operators = keys(precedence)

const insertToOperators = ({ operators, operator, ...rest }) => ({ ...rest, operators: [operator, ...operators ] })

const checkInsertOnOperatorsOrResult = (context) => {
  const { operators: [target, ...rest], result, operator } = context;

  return precedence[operator] <= precedence[target]
    ? checkInsertOnOperatorsOrResult({ result: [...result, target], operators: rest, operator })
    : insertToOperators(context)
}

const handleOperator = (context) => {
  const { operators:[lastInserted] , operator } = context;
  
  return (!lastInserted || precedence[operator] > precedence[lastInserted])
    ? insertToOperators(context)
    : checkInsertOnOperatorsOrResult(context);
};

const moveOperandToResult = ({ result, operand, ...rest }) => ({ ...rest, result: [...result, operand] });

const moveToResult = ({ operators, result, token }) => ({ result: [...result, token, ...operators] })

const infixToPostfix = (tokens) =>
  reduce(
    tokens,
    (acc, token, i) => i + 1 === tokens.length
      ? moveToResult({ ...acc, token })
      : operators.includes(token)
        ? handleOperator({ ...acc, operator: token })
        : moveOperandToResult({ ...acc, operand: token }),
    { operators: [], result: [] }
  ).result;

module.exports = infixToPostfix;
