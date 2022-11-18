const { reduce, findIndex } = require("@laufire/utils/collection");

const operations = {
  '+': (num1, num2) => num1 + num2,
  '-': (num1, num2) => num1 - num2,
  '*': (num1, num2) => num1 * num2,
  '/': (num1, num2) => num1 / num2,
}
const calculate = (collection) => 0;

const priorities = {
  'p1': (operator) => operator === '/' || operator === '*',
  'p2': (operator) => operator === '+' || operator === '-'
}

const insertOperator = {
  'p1': ({ input, acc: { buffer, ...rest } }) => ({ ...rest, buffer: [...buffer, input] }),
  'p2': ({ input, acc: { result, ...rest } }) => ({ ...rest, result: [...result, input] })
}

const handleOperator = ({ input, acc }) =>
  insertOperator[findIndex(priorities, (priority) => priority(input))]({ input, acc })

const insertOperand = {

}

const handleOperand = ({ input, acc }) => {
  const { result, buffer, nextOperator, isLast } = acc;
  const priority = findIndex(priorities, (priority) => priority(nextOperator))
  const bufferLimit = 3;

  (buffer.length <= bufferLimit)


}

const evaluate = (inputs) => reduce(inputs, (acc, input, i, arr) => {
  const isOperator = !!operations[input];

  // what happen if the array don't have any / or * ? ===> calculate(collection)

  return (isOperator)
    ? handleOperator({ input, acc })
    : handleOperand({ input, acc: { ...acc, nextOperator: arr[i + 1], isLast: i + 1 === arr.length } })
}, {
  result: [],
  buffer: [],
  nextOperator: '',
  isLast: false,
})

module.exports = evaluate;


/*
operator -> 
/ or *  -  buffer
+ or -  -  result

no / or * then + or -  -- buffer

*/

/*
operand -> 
arr[i+1] / or * -> buffer else result

no / or * then arr[i+1] + or - -> buffer

*/

