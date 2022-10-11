const { reduce, map, find } = require("@laufire/utils/collection")
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

const getDistanceBetweenLocation = ({ distances, locFrom, locTo }) => (find(distances, (distance) => {
  const { from, to } = distance;
  return (from === locFrom && to === locTo) || (from === locTo && to === locFrom)
})).distance

const getRouteDistance = ({ route, distances }) => {
  const { stops } = route;
  return reduce(stops, (acc, stop) => {
    let { distance, prevStop } = acc;
    distance += (prevStop === 'start') ? 0 : getDistanceBetweenLocation({ distances, locFrom: prevStop, locTo: stop })

    return { distance, prevStop: stop }
  },
    { distance: 0, prevStop: 'start' }
  ).distance
}

const findDistance = ({routes, distances}) =>
  map(routes, (route) => ({ ...route, distance: getRouteDistance({ route, distances }) }))


const main = ({ routes, distances }) => {
  console.log(findDistance({routes, distances}))
}


main({ routes, distances })