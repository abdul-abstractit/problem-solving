const { map } = require("@laufire/utils/collection")

const people = [
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
  {
    name: 'Nachiyammai',
    fees: 700,
  },
];

const genderBasedFees = {
  male: (person) => ({ ...person, additionalFees: person.fees * 0.1}),
  female: (person) => ({ ...person, additionalFees: 100 }),
  default: (person)=>({ 
    ...person, 
    additionalFees: genderBasedFees.male(person).additionalFees 
      + genderBasedFees.female(person).additionalFees, 
  }),
}

const getGenderBasedFees = (person) => genderBasedFees[person.gender||'default'](person);

const getUpdatedPeople = (people) => map(people, getGenderBasedFees)


const main = (people) => {
  console.table(getUpdatedPeople(people))
}

main(people)