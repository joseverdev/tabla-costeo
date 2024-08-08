/* import { useEffect, useState } from "react";

export default function useLocalStorage(itemName, initialValue) {
  const [parsedData, setParsedData] = useState(null);

  async function getDataLS() {
    try {
      const data = await localStorage.getItem(itemName);
      if (!data) {
        await localStorage.setItem(itemName, JSON.stringify(initialValue));
      } else {
        setParsedData(await JSON.parse(data));
      }
      return parsedData;
    } catch (err) {
      console.error("hubo un error en useLocalStorage ", err);
    }
  }

  // console.log(parsedData);

  return {
    getDataLS,
  };
}
 */
