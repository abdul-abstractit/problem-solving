const evaluate = require("./evaluate");

const cases = [
  {
    input: [2, "+", 5],
    output: 7
  },
  {
    input: [5, "-", 0],
    output: 5
  },
  {
    input: [2, "*", 5],
    output: 10
  },
  {
    input: [0, "/", 5],
    output: 0
  },
  {
    input: [2, "+", 5, "+", 4],
    output: 11
  },
  {
    input: [2, "+", 5, "-", 4],
    output: 3
  },
  {
    input: [2, "*", 5, "+", 4],
    output: 14
  },
  {
    input: [2, "+", 3, "/", 3, "*", 2, "-", 5],
    output: -1
  },
  {
    input: [2, "*", 0, "/", 3, "*", 2, "/", 5],
    output: 0
  },
];

const throwError = ({ input, output }) => {
  throw (`Error: ${input} for this, expected result is ${output}`)
}
const test = (fn, cases) => {
  cases.map(({ input, output }, i) => fn(input) === output || throwError({ input, output }));
}

test(evaluate, cases)