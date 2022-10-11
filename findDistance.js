const { filter, reduce, map } = require("@laufire/utils/collection")

const distances = [
  {
    from: 'delhi',
    to: 'bhopal',
    distance: 800
  },
  {
    from: 'bhopal',
    to: 'hyderabad',
    distance: 850
  },
  {
    from: 'chennai',
    to: 'hyderabad',
    distance: 620
  },
  {
    from: 'bangalore',
    to: 'hyderabad',
    distance: 570
  },
]

const routes = [
  {
    start: 'delhi',
    finish: 'chennai',
    stops: ['delhi', 'bhopal', 'hyderabad', 'chennai']
  },
  {
    start: 'bangalore',
    finish: 'delhi',
    stops: ['bangalore', 'hyderabad', 'bhopal', 'delhi']
  },
]

const getDistanceBetween = (locFrom, locTo, distances) => {
  const filteredObj = filter(distances, (distance) =>
    (distance.from === locFrom && distance.to === locTo) || (distance.from === locTo && distance.to === locFrom))
  return filteredObj[0].distance
}

const findDistance = (routes, distances) =>
  map(routes, (route) => {
    const distance = reduce(route.stops, (acc, stop) => {
      let { distance, prevStop } = acc;
      distance += (prevStop === 'start') ? 0 : getDistanceBetween(prevStop, stop, distances)

      return { distance, prevStop: stop }
    }, { distance: 0, prevStop: 'start' }).distance

    return { ...route, distance }
  })


console.log(findDistance(routes, distances))

