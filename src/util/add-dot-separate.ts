export const addDotSeparate = (target: string) => {
  const regex = /\B(?=(\d{3})+(?!\d))/g;

  return target.replace(regex, ',');
};
