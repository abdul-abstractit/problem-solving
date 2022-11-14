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

module.exports = data;