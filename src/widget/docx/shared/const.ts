export const SIZES = {
  font: {
    title: 28,
    solution: 24,
    subtitle: 20,
    numbering: 24,
    empty: 32,
  },

  family: {
    solution: 'Helvetica Neue Light Italic',
  },

  border: {
    double: 5,
    single: 15,
  },

  columns: {
    width: {
      first: 5.5,
      childColumn: (length: number) => {
        return length === 1
          ? 0
          : (100 - SIZES.columns.width.first) / (length - 1);
      },
    },

    height: {
      solution: 312,
      answer: 312,
    },
  },
} as const;

export const COLORS = {
  header: '#f8fff8',
} as const;
