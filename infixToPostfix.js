const { reduce, findIndex } = require("@laufire/utils/collection");
const operators = ['+', '-', '*', '/'];
const priorities = {
  0: (operator) => operator === '+' || operator === '-',
  1: (operator) => operator === '/' || operator === '*',
}

const popOperatorFromStack = (context) => {
  const { stack, result, character } = context;
  const topOfStack = stack[stack.length - 1];
  const priority = findIndex(priorities, (priority) => priority(character));
  const topOfStackPriority = findIndex(priorities, (priority) => priority(topOfStack));

  return priority <= topOfStackPriority
    ? popOperatorFromStack({ result: [...result, topOfStack], stack: stack.slice(0, -1), character })
    : { stack: [...stack, character], result }
}

const handleOperator = (context) => {
  const { stack, result, character } = context;
  const isEmptyStack = stack.length === 0;
  const topOfStack = stack[stack.length - 1];
  const priority = findIndex(priorities, (priority) => priority(character));
  const topOfStackPriority = findIndex(priorities, (priority) => priority(topOfStack));


  return (isEmptyStack || priority > topOfStackPriority)
    ? { stack: [...stack, character], result }
    : popOperatorFromStack(context)
}


const infixToPostfix = (collection) =>
  reduce(collection, ({ stack, result }, character,i,arr) =>{
    const isLastChar = i+1 === arr.length;

    return isLastChar ? { stack, result: [...result, character, ...stack.reverse()] }
    :operators.includes(character)
      ? handleOperator({ stack, result, character })
      : { stack, result: [...result, character] }
  }
    , { stack: [], result: [] }
  ).result;

module.exports=infixToPostfix;

/* Rules

First Start scanning the expression from left to right
If the scanned character is an operand, output it, i.e. print it
Else
If the precedence of the scanned operator is higher than the precedence of the operator in the stack(or stack is empty or has'(‘), then push operator in the stack
Else, Pop all the operators, that have greater or equal precedence than the scanned operator. Once you pop them push this scanned operator. (If we see a parenthesis while popping then stop and push scanned operator in the stack)
If the scanned character is an ‘(‘, push it to the stack.
If the scanned character is an ‘)’, pop the stack and output it until a ‘(‘ is encountered, and discard both the parenthesis.
Now, we should repeat the steps 2 – 6 until the whole infix i.e. whole characters are scanned.
Print output
Do the pop and output (print) until stack is not empty

*/
