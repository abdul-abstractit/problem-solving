const { map, reduce } = require("@laufire/utils/collection");

const data = {
  cost: 10,
  name: 'buildHouse',
  tasks: [
    {
      cost: 5,
      name: 'purchase material',
      tasks: [
        {
          cost: 10,
          name: 'purchase cement',
        },
        {
          cost: 15,
          name: 'purchase steel',
        },
      ],
    },
    {
      cost: 0,
      name: 'invite people',
    },
  ],
};

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

console.log(calculateCost(data));