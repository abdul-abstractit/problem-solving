const { map } = require("@laufire/utils/collection")

const person = [
  {
    name: 'Abdul Rahim',
    gender: 'male',
    fees: 100,
  },
  {
    name: 'Karpagam',
    gender: 'female',
    fees: 500,
  },
  {
    name: 'Ram kumar',
    gender: 'male',
    fees: 1500,
  },
  {
    name: 'Nachiyammai',
    gender: 'female',
    fees: 700,
  },
]
const getUpdatedPerson = (person) => {
  return map(person, (person) => {
    const { gender, fees } = person;
    const tenPercent = fees * 0.10;
    const chooseGender = {
      male: () => ({ ...person, additionalFees: tenPercent }),
      female: () => ({ ...person, additionalFees: 100 })
    }
    return chooseGender[gender]()
  })
}


const main = (person) => {
  console.table(getUpdatedPerson(person))
}

main(person)