export const SIZES = {
  font: {
    solution: 28,
    numbering: 20,
  },
  family: {
    solution: 'Consolas',
  },
  border: {
    single: 1,
  },
  columns: {
    width: {
      first: 10,
      childColumn: (colLength: number) => (90 / (colLength - 1)),
    },
    height: {
      solution: 600,
    },
  },
};
