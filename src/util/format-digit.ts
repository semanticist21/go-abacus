export const formatDigitNumber = (target: number) => {
  // when digit is 2, numbers will be like 0.1, 0.2, 0.3, ...
  const is_two_digit = -10 < target && target < 10;

  let _target = '';
  if (is_two_digit) _target = target.toFixed(1);
  else _target = target.toFixed(2);

  const regex = /^0\./;
  _target = _target.replace(regex, '.');

  return _target;
};
