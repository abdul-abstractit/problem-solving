const { map } = require("@laufire/utils/collection")

const person = [
  {
    name: 'Abdul Rahim',
    gender: 'Male',
    fees: 10000,
  },
  {
    name: 'Karpagam',
    gender: 'Female',
    fees: 10000,
  },
  {
    name: 'Nithesh',
    gender: 'Male',
    fees: 10000,
  },
  {
    name: 'Nachiyammai',
    gender: 'Female',
    fees: 10000,
  },
]

const main = (person) => {
  const updatedPerson = map(person, (person) => {
    const { gender, fees } = person;
    const tenPercent = fees * 0.10;
    return (gender === 'Male')
      ? { ...person, additionalFees: tenPercent }
      : { ...person, additionalFees: 100 }
  })
  console.log(updatedPerson)
}

main(person)