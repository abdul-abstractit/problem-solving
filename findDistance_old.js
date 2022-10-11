const { map, reduce } = require("@laufire/utils/collection")

const maps = {
  delhi: { bhopal: 800, },
  bhopal: { delhi: 800, hyderabad: 850 },
  chennai: { hyderabad: 620 },
  hyderabad: { bhopal: 850, chennai: 620, bangalore: 570 },
  bangalore: { hyderabad: 570 },
}

const routes = {
  "Delhi-Chennai": ['delhi', 'bhopal', 'hyderabad', 'chennai'],
  "Bangalore-Delhi": ['bangalore', 'hyderabad', 'bhopal', 'delhi'],
}

const distances = map(routes, (route) => {
  const locations = route
  return reduce(locations, (acc,location) => {
    let {distance, prevLocation} = acc
    distance += (prevLocation === 'start')? 0 : maps[prevLocation][location]
    return {distance, prevLocation:location}
  }, { distance: 0, prevLocation: 'start' })
})

console.log(distances)
