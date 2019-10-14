const objectKeysToQuery = (queryParams = {}) => {
  let queryArray = [];

  for (let q in queryParams) {
    if (queryParams[q]) {
      const cadena = String(queryParams[q]);
      if (cadena.length > 0) {
        queryArray.push(`${q}=${cadena}&`);
      }
    }
  }

  return queryArray.join('').slice(0, -1);
};

export { objectKeysToQuery };
