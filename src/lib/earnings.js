import numeral from "numeral";

export function partialSum(arr) {
  return arr.reduce((r, a) => {
    r.push(((r.length && r[r.length - 1]) || 0) + a);
    return r;
  }, []);
}

export function salary(years, starting, raise) {
  let arr = Array(years).fill(starting);

  // Compute income each year based on raise
  for (let i = 1; i < years; i++) {
    arr[i] = arr[i - 1] * (1 + raise / 100);
  }

  return arr;
}

export function lostString(phd, swe) {
  const years = phd.length;
  const lostIncome = partialSum(swe)[years - 1] - partialSum(phd)[years - 1];

  if (lostIncome > 0) {
    return `${numeral(lostIncome).format("$0,0")} lost`;
  } else {
    return `${numeral(-lostIncome).format("$0,0")} earned`;
  }
}
