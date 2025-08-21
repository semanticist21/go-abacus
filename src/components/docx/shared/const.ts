export const SIZES = {
  columns: {
    width: {
      childColumn: (length: number) => {
        return length === 1 ? 0 : (100 - SIZES.columns.width.first) / (length - 1);
      },
      first: 5.5,
    },

    height: {
      solution: 312,
      answer: 312,
    },
  },

  font: {
    numbering: 24,
    solution: 24,
    subtitle: 20,
    empty: 32,
    title: 28,
  },

  family: {
    solution: 'Helvetica Neue Light Italic',
  },

  border: {
    single: 15,
    double: 5,
  },
} as const;

export const COLORS = {
  header: '#f8fff8',
} as const;
