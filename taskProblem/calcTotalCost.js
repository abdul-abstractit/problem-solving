const { map, reduce } = require("@laufire/utils/collection");
const { peek } = require("@laufire/utils/debug");
const task = require("./data");

const calcSubTasksCost = (tasks) => reduce(tasks, (acc, { cost }) => acc + cost, 0);

const calculateCost = ({ cost, tasks: subTasks = [] }) =>
  ({ cost: cost + calcSubTasksCost(map(subTasks, calculateCost)) })

const main = (task) => {
  peek(calculateCost(task));
};

main(task);