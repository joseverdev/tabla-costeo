export default function removeZeros(num) {
  if (!num) {
    return "no hay numero";
  } else {
    const number = Number(num);
    const numberFormat = number.toFixed(2);
    const newRes = parseFloat(numberFormat);

    return newRes;
  }
}
