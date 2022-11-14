const { map, reduce } = require("@laufire/utils/collection");
const task = require("./data");


const calcSubTasksCost = (tasks) => reduce(tasks, (acc, {cost}) => acc + cost, 0);

const calculateCost = (task) => {
  const { cost, tasks: subTasks=[] } = task;
  const calculatedSubTasks = map(subTasks, calculateCost);

  return ({
    ...task,
    cost: cost + calcSubTasksCost(calculatedSubTasks),
    tasks: calculatedSubTasks
  })
}

console.log(calculateCost(task));