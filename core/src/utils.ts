/**
 * Creates an array of integers from 0 to {length} we want
 * @param {Number} length length of array you want to create
 */
export function createArray(length: number) {
  const arr = [];
  for (let i = 0; i < length; i++) {
    arr.push(i);
  }
  return arr;
}
