export const formatDigitNumber = (target: number, curDigit: number) => {
  let _target = '';

  if (curDigit === 2) _target = target.toFixed(1);
  else _target = target.toFixed(2);

  const regex = /^0\./;
  _target = _target.replace(regex, '.');

  return _target;
};
