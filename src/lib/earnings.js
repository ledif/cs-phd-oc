import numeral from "numeral";

/**
 * Compute the partial sum of an array of numbers
 * @param {Number[]} arr The array of numbers
 */
export function partialSum(arr) {
  return arr.reduce((r, a) => {
    r.push(((r.length && r[r.length - 1]) || 0) + a);
    return r;
  }, []);
}

/**
 * Compute an array of salary for every year
 * @param {Number} years How many years to include
 * @param {Number} starting The employee's starting salary
 * @param {Number} raise Integer percentage of raise each year
 */
export function salary(years, starting, raise) {
  let arr = Array(years).fill(starting);

  // Compute income each year based on raise
  for (let i = 1; i < years; i++) {
    arr[i] = arr[i - 1] * (1 + raise / 100);
  }

  return arr;
}

/**
 * String to display how much a student lost/earned by going for a PhD
 * @param {Number[]} phd Salary for PhD student every year
 * @param {Number[]} swe Salary for software engineer every year
 */
export function lostString(phd, swe) {
  const years = phd.length;
  const lostIncome = partialSum(swe)[years - 1] - partialSum(phd)[years - 1];

  if (lostIncome > 0) {
    return `${numeral(lostIncome).format("$0,0")} lost`;
  } else {
    return `${numeral(-lostIncome).format("$0,0")} earned`;
  }
}
