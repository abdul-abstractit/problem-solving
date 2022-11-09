const { map,filter } = require("@laufire/utils/collection")


const isFindInEveryCollections = ({collections, target}) => {
  const occurrences = map(collections,(collection) => collection.find(element => element === target))
  return occurrences.every((occurrence)=> occurrence===target);
}

const main = () => {
  const collections = [
    [1,2,3,5,6],
    [1,3,6],
    [1,2,5,6],
  ]
  const targets = collections[0];
  console.log(filter(targets, (target) => isFindInEveryCollections({collections,target}) ))
}

main ()