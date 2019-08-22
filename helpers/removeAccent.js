export const removeAccent = str => {
  const strLowerCase = str.toLowerCase();
  return strLowerCase.replace(
    /([àáâãäå])|([ç])|([èéêë])|([ìíîï])|([ñ])|([òóôõöø])|([ß])|([ùúûü])|([ÿ])|([æ])/g,
    (str, a, c, e, i, n, o, s, u, y, ae) => {
      if (a) return 'a';
      if (c) return 'c';
      if (e) return 'e';
      if (i) return 'i';
      if (n) return 'n';
      if (o) return 'o';
      if (s) return 's';
      if (u) return 'u';
      if (y) return 'y';
      if (ae) return 'ae';
    }
  );
};

export const filterAutocomplete = (item, queryText, property) => {
  return removeAccent(item[property]).indexOf(removeAccent(queryText)) > -1;
};
